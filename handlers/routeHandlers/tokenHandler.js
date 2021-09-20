// Dependencies

const env = require('./../../helpers/env')
const data = require('./../../lib/data')
const {hash, parseJSON, createRandomString} = require('./../../helpers/utilities')

// module scafolding 
const handlers = {}

handlers.tokenHandler = (requestProperties,callback) => {
    const acceptedMethods = env.acceptedMethods
  if (acceptedMethods.indexOf(requestProperties.method)>-1) {
      handler._token[requestProperties.method](requestProperties,callback)
  }else{
    callback(405)
  }
}

let handler = {}
handler._token = {}

handler._token.post = (requestProperties,callback) => {
    const phone = typeof(requestProperties.body.phone) === 'string' 
  && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone :false

  const password = typeof(requestProperties.body.password) === 'string' 
  && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password :false

  if (phone && password) {
      data.read('users',phone,(err,res)=>{
        const userData = {... parseJSON(res)}
        let hashedPassword = hash(password)
        if (hashedPassword === userData.password) {
            let tokenId = createRandomString(env.tokenLength)
            let expires = env.tokenExpire
            let tokenObject = {
                phone,
                expires,
                'id':tokenId
            }

            data.create('token',tokenId,tokenObject,(err)=>{
                if (!err) {
                    callback(200,tokenObject)
                }else{
                    callback(500,{
                        error:'Couldn\'t create token'
                    })
                }
            })
        }else{
            callback(404,{
                error:'User Not Found'
            })
        }
      })
  }else{
      callback(400,{
          error:'Invalid Request'
      })
  }
}

handler._token.get = (requestProperties,callback) => {
    const tokenId = typeof requestProperties.queryStringObject.id === 'string'
    && requestProperties.queryStringObject.id.trim().length === env.tokenLength
    ? requestProperties.queryStringObject.id : false 

    if (tokenId) {
        data.read('token',tokenId,(err,res)=>{
            const tokenObject = {...parseJSON(res)}
            if(!err) {
                callback(200,tokenObject)
            }else{
                callback(403,{
                    message:'Unauthorized User'
                })
            }
        })
    }else{
        callback(404,{
            message:'Invalid Token'
        })
    }
}

handler._token.put = (requestProperties,callback) => {
    const id = typeof requestProperties.body.id === 'string'
    && requestProperties.body.id.trim().length === env.tokenLength
    ? requestProperties.body.id :false 
    
    const isExtend = typeof requestProperties.body.isExtend === 'boolean'
    && requestProperties.body.isExtend === true ? true :false 
    
    if (id && isExtend) {
        data.read('token',id,(err,res)=>{
            if(!err && res){
                let tokenData = {...parseJSON(res)}
                if (tokenData.expires > Date.now()) {
                     tokenData.expires = env.tokenExpire
                     data.update('token',id,tokenData,(err)=>{
                         if(!err){
                             callback(200,{
                                 message:'Token Expire Time Updated',
                                 data:tokenData
                             })
                         }else{
                             callback(500,{
                                 error:'Token couldn\'t updated'
                             })
                         }
                     })
                }else{
                    callback(400,{
                        error:'Token has been expired'
                    })
                }
            }else{
                callback(404,{
                    error:'Invalid Token'
                })
            }
        })
    }else{
        callback(404,{
            error:'Invalid Request'
        })
    }
}

handler._token.delete = (requestProperties,callback) => {
    const id = typeof requestProperties.queryStringObject.id === 'string'
    && requestProperties.queryStringObject.id.trim().length === env.tokenLength
    ? requestProperties.queryStringObject.id :false

    if (id) {
        data.read('token',id,(err,res)=>{
            if (!err) {
                data.delete('token',id,(err)=>{
                    if(!err){
                        callback(200,{
                            message:'Token Deleted'
                        })
                    }else{
                        callback(500,{
                            error:'Token couldn\'t Deleted'
                        })
                    }
                })
            }else{
                callback(404,{
                    error:'Invalid Token'
                })
            }
        })
    }else{
        callback(400,{
            'error':'Invalid Request'
        })
    }
}

handlers.verifyToken = (id,phone,callback) => {
    data.read('token',id,(err,res)=>{
        if(!err && res){
            let tokenData = {...parseJSON(res)}

            if (tokenData.phone === phone && tokenData.expires > Date.now()) {
                callback(true)
            }else{
                callback(false)
            }
        }else{
            callback(false)
        }
    })
}

module.exports = handlers
