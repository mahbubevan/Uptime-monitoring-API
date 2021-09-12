// Dependencies 
const http = require('http')
const {handleReqRes} = require('./helpers/handleReqRes')
const env = require('./helpers/env')

const data = require('./lib/data')

// App object - module scaffolding
const app = {}

//Testing File System
//@ Todo  remove later
// data.create('test','newFile',{'name':"Bangladesh",'lang':'Bangla'},(err)=>{
//   console.log(err);
// })

data.read('test','newFile',(err,data)=>{
  console.log(err,data);
})

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
