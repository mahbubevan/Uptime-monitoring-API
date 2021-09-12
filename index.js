// Dependencies 
const http = require('http')
const {handleReqRes} = require('./helpers/handleReqRes')
const env = require('./helpers/env')

const data = require('./lib/data')

// App object - module scaffolding
const app = {}

//Testing File System

// data.create('test','newFile',{'name':"Evan",'age':27},(err,result)=>{
//   console.log(err,result);
// })
// data.read('test','newFile',(err,data)=>{
//   console.log(err,data);
// })

// data.update('test','newFile',{'name':'Safa','age':7},(err)=>{
//   console.log(err);
// })

// data.delete('test','newFile',(err,res)=>{
//   console.log(err,res);
// })

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
