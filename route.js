// Dependencies 
const {sampleHandler} = require('./handlers/routeHandlers/sampleHandler')
const {userHandler} = require('./handlers/routeHandlers/userHandler')
const {tokenHandler} = require('./handlers/routeHandlers/tokenHandler')
const {checkHandler} = require('./handlers/routeHandlers/checkHandler')

const routes = {
  sample: sampleHandler,
  user:userHandler,
  token:tokenHandler,
  check:checkHandler,
  'check/update':checkHandler
}

module.exports = routes
