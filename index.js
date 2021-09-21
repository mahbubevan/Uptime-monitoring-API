const server = require('./lib/server')
const workers = require('./lib/worker')
const tokenService = require('./lib/tokenService')

const app = {}

app.init = () => {
  server.init()
  workers.init()
  tokenService.init()
}

app.init()
