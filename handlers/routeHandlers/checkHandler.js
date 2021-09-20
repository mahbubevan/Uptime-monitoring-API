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

    let timeoutSeconds = typeof parseInt(requestProperties.body.timeoutSeconds) === 'number' 
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
                  let userObject = {...parseJSON(userData)}
                  let userChecks = typeof userObject.checks === 'object'
                  && userObject.checks instanceof Array 
                  ? userObject.checks : []
                  
                  if (userChecks.length < env.maxCheck) {
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
        message:'Validation Failed'
      })
    }
}

handler._check.get = (requestProperties,callback) => {
    const id = typeof requestProperties.queryStringObject.id === 'string' 
            && requestProperties.queryStringObject.id.length === 20
            ? requestProperties.queryStringObject.id : false 
    
    if (id) {
      data.read('check',id,(err,res)=>{
        if(err){
          callback(404,{
            error:'Not Found'
          })
        }else{
          let token = typeof requestProperties.headerObject.bearer === 'string'
          ? requestProperties.headerObject.bearer :false
          let checkObject = {... parseJSON(res)}
          let phone = checkObject.userPhone
          verifyToken(token,phone,(tokenIsValid)=>{
            if(!tokenIsValid){
              callback(403,{
                error:'Unauthorized'
              })
            }else{
              callback(200,checkObject)
            }
          })
        }
      })
    }else{
      data.list('check',(err,checks)=>{
        console.log(checks);
        if (!err && checks.length > 0) {
          let dataArr = []
          let checkObject
          let checkText = ''
          // checks.forEach(element => {
          //   data.read('check',element,(err,checkData)=>{
          //     checkObject = {...parseJSON(checkData)}
          //     dataObject.element = checkObject
          //   })
          // });
          for (let index = 0; index < checks.length; index++) {
            const element = checks[index];
            data.read('check',element,(err,checkData)=>{
              checkText += checkData
              checkObject = {...parseJSON(checkData)}
            })
          }
          console.log(dataArr,checkText);
          
          callback(200,{
            message:dataArr
          })
        }else{      
          callback(404,{
            message:'Not Found'
          })
        }
      })
    }
}

handler._check.put = (requestProperties,callback) => {
  const id = typeof requestProperties.body.id === 'string' 
            ? requestProperties.body.id : false
  
            console.log(id);
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
  
    if (!id) {
      callback(400,{
        error:'Id is required'
      })
    }
    else{
      if (protocol || url || method || successCodes || timeoutSeconds) {
        data.read('check',id,(err,checkData)=>{
          if (err && !checkData) {
            callback(500,{
              error:'Couldn\'t find the data'
            })
          }else{
            let checkObject = {...parseJSON(checkData)}
            let token = typeof requestProperties.headerObject.bearer === 'string'
            ? requestProperties.headerObject.bearer :false

            verifyToken(token,checkObject.userPhone,(tokenIsValid)=>{
              if (!tokenIsValid) {
                callback(403,{
                  error:'Unauthorized Token'
                })
              }else{
                if (protocol) {
                  checkObject.protocol = protocol
                }

                if (url) {
                  checkObject.url = url 
                }
                
                if (method) {
                  checkObject.method = method
                }

                if (successCodes) {
                  checkObject.successCodes = successCodes
                }

                if (timeoutSeconds) {
                  checkObject.timeoutSeconds = timeoutSeconds
                }

                data.update('check',id,checkObject,(err)=>{
                  if (err) {
                    callback(500,{
                      error:'Couldn\'t Updated'
                    })
                  }else{
                    callback(200,{
                      msg:'Updated Successfully',
                      data:checkObject
                    })
                  }
                })
                
              }
            })

          }
        })
      }else{
        callback(400,{
          error:"No filed to update"
        })
      }
    }
}


handler._check.delete = (requestProperties,callback) => {
  const id = typeof requestProperties.queryStringObject.id === 'string' 
            ? requestProperties.queryStringObject.id : false
  
  if (!id) {
    callback(400,{
      error:'Id Required'
    })
  }else{
    data.read('check',id,(err,checkData)=>{
      if (err && !checkData) {
        callback(400,{
          error:'Couldn\'t Find The Data'
        })
      }else{
        let phone = parseJSON(checkData).userPhone 
        let token = typeof requestProperties.headerObject.bearer === 'string'
        ? requestProperties.headerObject.bearer :false 

        verifyToken(token,phone,(isValidToken)=>{
          if (!isValidToken) {
            callback(403,{
              error:'Unauthorized Action'
            })
          }else{
            data.delete('check',id,(err)=>{
              if (err) {
                callback(500,{
                  error:'Server Side Problem'
                })
              }else{
                data.read('users',phone,(err,userData)=>{
                  if (err) {
                    callback(500,{error:'Couldn\'t Find The Data'})
                  }else{
                    let userObject = parseJSON(userData)
                    let userChecks =  typeof userObject.checks === 'object' 
                    && userObject.checks instanceof Array 
                    ? userObject.checks 
                    : []

                    let checkPos = userChecks.indexOf(id)
                    if (checkPos > -1) {
                      userChecks.splice(checkPos,1)
                      userObject.checks = userChecks
                      data.update('users',phone,userObject,(err)=>{
                        if (err) {
                          callback(500,{error:'Server Error'})
                        }else{
                          callback(200,{
                            msg:'Updated Successfully',
                            data:userObject
                          })
                        }
                      })
                    }else{
                      callback(400,{
                        error:'The check id is not available'
                      })
                    }
                  }
                })
              }
            })
          }
        })

      }
    })
  }
}


module.exports = handlers
