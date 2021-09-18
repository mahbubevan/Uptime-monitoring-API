// Dependencies 
const { parseJSON, createRandomString } = require('../../helpers/utilities')
const env = require('./../../helpers/env')
const data = require('./../../lib/data')
const {verifyToken} = require('./tokenHandler')

// Module Scaffolding 
const handlers = {}

handlers.checkHandler = (requestProperties,callback) => {
const acceptedMethods = env.acceptedMethods
  if (acceptedMethods.indexOf(requestProperties.method)>-1) {
      handler._check[requestProperties.method](requestProperties,callback)
  }else{
    callback(405)
  }
}

let handler = {}
handler._check = {}

// Create Check
handler._check.post = (requestProperties,callback) => {
  //validate inputs 
  let protocol = typeof requestProperties.body.protocol === 'string'
    && ['http','https'].indexOf(requestProperties.body.protocol) > -1 
    ? requestProperties.body.protocol :false 
  
    let url = typeof requestProperties.body.url === 'string' 
      && requestProperties.body.url.trim().length > 0 
      ? requestProperties.body.url :false 

    let method = typeof requestProperties.body.method === 'string' 
    && ['get','post','put','delete'].indexOf(requestProperties.body.method) > -1 
    ? requestProperties.body.method :false 

    let successCodes = typeof requestProperties.body.successCodes === 'object'
    && requestProperties.body.successCodes instanceof Array 
    ? requestProperties.body.successCodes 
    :false

    let timeoutSeconds = typeof requestProperties.body.timeoutSeconds === 'number' 
      && requestProperties.body.timeoutSeconds % 1 === 0
      && requestProperties.body.timeoutSeconds >= 1
      && requestProperties.body.timeoutSeconds <= 5
      ? requestProperties.body.timeoutSeconds :false

    if (protocol && url && method && timeoutSeconds) {
      let token = typeof requestProperties.headerObject.bearer === 'string'
          ? requestProperties.headerObject.bearer :false 

      data.read('token',token,(err,res)=>{
        if (!err && res) {
          let userPhone = parseJSON(res).phone 
          data.read('users',userPhone,(err,userData)=>{
            if (!err && userData) {
              verifyToken(token,userPhone,(res)=>{
                if (res) {
                  let userObject = parseJSON(userData)
                  let userChecks = typeof userObject.checks === 'object'
                  && userObject.checks instanceof Array 
                  ? userObject.checks : []
                  
                  if (userChecks < env.maxCheck) {
                    let checkId = createRandomString(20)
                    let checkObject = {
                      id:checkId,
                      userPhone,
                      protocol,
                      url,
                      method,
                      successCodes,
                      timeoutSeconds
                    }

                    data.create('check',checkId,checkObject,(err)=>{
                      if (!err) {
                        userObject.checks = userChecks
                        userObject.checks.push(checkId)

                        data.update('users',userPhone,userObject,(err)=>{
                          if (!err) {
                            callback(200,{
                              check:checkObject,
                              user:userObject
                            })
                          }else{
                            callback(500,{
                              error:"Problem"
                            })
                          }
                        })
                      }else{
                        callback(500,{
                          error:'Couldn\'t Store The Data'
                        })
                      }
                    })
                  }else{
                    callback(401,{
                      error:'User already reached max limit'
                    })
                  }

                }else{
                  callback(403,{
                    error:'Authentication Problem'
                  })
                }
              })
            }else{
              callback(403,{
                error:'Authentication Problem'
              })
            }
          })
        }else{
          callback(403,{
            error:'Authentication Problem'
          })
        }
      })

    }else{
      callback(400,{
        error:'Validation Failed'
      })
    }
}



handler._check.get = (requestProperties,callback) => {
  console.log("Hello");
  callback(200,{
    msg:"Good"
  })
}
handler._check.put = (requestProperties,callback) => {}
handler._check.delete = (requestProperties,callback) => {}


module.exports = handlers
