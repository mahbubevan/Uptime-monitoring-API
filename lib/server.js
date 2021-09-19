// Dependencies 
const http = require('http')
const {handleReqRes} = require('./../helpers/handleReqRes')
const env = require('./../helpers/env')

// App object - module scaffolding
const server = {}

// create server 
server.createServer = () => {
    const createServerVar = http.createServer(server.handleReqRes);
    createServerVar.listen(env.port,()=>{
        console.log(`Server Started At Port ${env.port}`);
    })
}

// handle request and response 
server.handleReqRes = handleReqRes


// Start THe Server
server.init = () => {
  server.createServer()
}


module.exports = server
