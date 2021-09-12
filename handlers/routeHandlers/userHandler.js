// Dependencies = 
const handler = require('../../helpers/handleReqRes')
const env = require('./../../helpers/env')

const {validation} = require('./../../helpers/utilities')
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
    let dummyName = "Mahbub"
    let dummyName2 = "Alam"
    const validate = validation({
        firstName:["string|min:4|max:6",dummyName],
        lastName:["string|max:3",dummyName2]
    })
    console.log(validate);
}
handler._users.get = (requestProperties,callback) => {}
handler._users.put = (requestProperties,callback) => {}
handler._users.delete = (requestProperties,callback) => {}


module.exports = handlers
