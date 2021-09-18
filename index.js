// Dependencies 
const http = require('http')
const {handleReqRes} = require('./helpers/handleReqRes')
const env = require('./helpers/env')

// App object - module scaffolding
const app = {}

// create server 
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(env.port,()=>{
        console.log(`Server Started At Port ${env.port}`);
    })
}

// handle request and response 
app.handleReqRes = handleReqRes


// Start THe Server
app.createServer()
