// Dependencies = 
const handler = require('../../helpers/handleReqRes')
const env = require('./../../helpers/env')

const {validation} = require('./../../helpers/utilities')
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

  const tosAgremeent = typeof(requestProperties.body.tosAgremeent) === 'boolean' 
  && requestProperties.body.tosAgremeent.trim().length > 0 ? requestProperties.body.tosAgremeent :false
  
  if(firstName && lastName && phone && password && tosAgremeent){
    data.read('users')
  }else{
    callback(400,{
      error:'Validation Failed'
    })
  }
    
}

handler._users.get = (requestProperties,callback) => {}
handler._users.put = (requestProperties,callback) => {}
handler._users.delete = (requestProperties,callback) => {}


module.exports = handlers
