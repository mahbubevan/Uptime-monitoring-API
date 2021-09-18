// Dependencies 
const env = require('./../../helpers/env')

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

handler._check.post = (requestProperties,callback) => {}
handler._check.get = (requestProperties,callback) => {
  
}
handler._check.put = (requestProperties,callback) => {}
handler._check.delete = (requestProperties,callback) => {}


module.exports = handlers