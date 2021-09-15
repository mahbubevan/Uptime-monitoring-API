// Dependencies = 
const handler = require('../../helpers/handleReqRes')
const env = require('./../../helpers/env')

const {hash} = require('./../../helpers/utilities')
const {parseJSON} = require('./../../helpers/utilities')
const data = require('../../lib/data')

// module scafolding 
const handlers = {}

handlers.userHandler = (requestProperties,callback) => {
  const acceptedMethods = env.acceptedMethods
  if (acceptedMethods.indexOf(requestProperties.method)>-1) {
      handler._users[requestProperties.method](requestProperties,callback)
  }else{
    callback(405)
  }
}

handler._users = {} 
handler._users.post = (requestProperties,callback) => {
  const firstName = typeof(requestProperties.body.firstName) === 'string' 
  && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName :false

  const lastName = typeof(requestProperties.body.lastName) === 'string' 
  && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName :false

  const phone = typeof(requestProperties.body.phone) === 'string' 
  && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone :false

  const password = typeof(requestProperties.body.password) === 'string' 
  && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password :false

  const tosAgreement = typeof(requestProperties.body.tosAgreement) === 'boolean' ? requestProperties.body.tosAgreement :false
  
  if(firstName && lastName && phone && password && tosAgreement){
    data.read('users',phone,(err,res)=>{
      
      if (err) {
        const userObject = {
          firstName,lastName,phone, 
          password:hash(password),
          tosAgreement
        }

        data.create('users',phone,userObject,(err)=>{
          if (!err) {
            callback(200,{
              message:'User created successfully'
            })
          }else{
            callback(500,{
              error:'Couldn\'t create user'
            })
          }
        })
      }else{
        callback(409,{
          msg:"User Already Resigtered"
        })
      }
    })
  }else{
    callback(400,{
      error:'Validation Failed'
    })
  }
    
}

handler._users.get = (requestProperties,callback) => {
  const phone = typeof(requestProperties.queryStringObject.phone) === 'string' 
  && requestProperties.queryStringObject.phone.trim().length === 11 ? requestProperties.queryStringObject.phone :false

  if (phone) {
    data.read("users",phone,(err,result)=>{
      const user = {...parseJSON(result)}
      delete user.password
      if (!err && user) {
        callback(200,{
          data:user
        })
      }else{
        callback(404,{
          error:"User Not Found"
        })
      }
    })
  }else{
    callback(404,{
      error:"User Not Found"
    })
  }
}

handler._users.put = (requestProperties,callback) => {
  const phone = typeof(requestProperties.body.phone) === 'string' 
  && requestProperties.body.phone.trim().length === 11 
  ? requestProperties.body.phone 
  :false

  const firstName = typeof(requestProperties.body.firstName) === 'string' 
  && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName :false

  const lastName = typeof(requestProperties.body.lastName) === 'string' 
  && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName :false

  const password = typeof(requestProperties.body.password) === 'string' 
  && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password :false

  if (phone) {
    if (firstName || lastName || password) {
      data.read('users',phone,(err,res)=>{
        let userData = {...parseJSON(res)}
        if(!err && userData){
          if (firstName) {
            userData.firstName = firstName
          }

          if (lastName) {
            userData.lastName = lastName
          }

          if (password) {
            userData.password = hash(password)
          }

          data.update('users',phone,userData,(err)=>{
            if(!err) {
              delete userData.password
              callback(200,{
                message:'User Updated Sucessfully',
                data:userData
              })
            }else{
              callback(500,{
                error:'Couldn\'t updated'
              })
            }
          })
        }else{
          callback(404,{
            error:"User Not Found"
          })
        }
      })
    }
  }else{
    callback(400,{
      error:'Invalid Phone Number'
    })
  }

}
handler._users.delete = (requestProperties,callback) => {
  const phone = typeof(requestProperties.queryStringObject.phone) === 'string' 
  && requestProperties.queryStringObject.phone.trim().length === 11 
  ? requestProperties.queryStringObject.phone 
  :false

  if (phone) {
    data.read('users',phone,(err,res)=>{
      if (!err && res) {
        data.delete('users',phone,(err)=>{
          if (!err) {
            callback(200,{
              message:'User Deleted Sucessfully'
            })
          }else{
            callback(500,{
              error:'Couldn\'t Delete'
            })
          }
        })
      }else{
        callback(500,{
          error:'Couldn\'t Find The User'
        })
      }
    })
  }else{
    callback(401,{
      error:"Invalid Number"
    })
  }
}


module.exports = handlers
