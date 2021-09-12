// Dependencies 
const { StringDecoder } = require('string_decoder')
const url = require('url')
const routes = require('../route')
const {notFoundHandler} = require('../handlers/routeHandlers/notFoundHandler')

// module scaffolding 
const handler = {}

handler.handleReqRes = (req,res) => {
  //req handling 
  // get the url and parse it 
  const parsedUrl = url.parse(req.url,true)
  const path = parsedUrl.pathname
  const trimmedPath = path.replace(/^\/+|\/+$/g,'')
  const method = req.method.toLowerCase()
  const queryStringObject = parsedUrl.query 
  const headerObject = req.headers

  const requestProperties = {
    parsedUrl,
    path,
    trimmedPath,
    method,queryStringObject,
    headerObject
  }
  
  const decoder = new StringDecoder('utf-8')
  let realData = ''

  const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler
  req.on('data',(buffer)=>{
      realData += decoder.write(buffer)
  })

  req.on('end',()=>{
      realData += decoder.end()

      chosenHandler(requestProperties,(statusCode,payload)=>{
        statusCode = typeof(statusCode) === 'number' ? statusCode : 500 
        payload = typeof(payload) === 'object' ? payload : {}
    
        const payloadString = JSON.stringify(payload)
    
        res.writeHead(statusCode)
        res.end(payloadString)
      })
    
      res.end()
  })
}

module.exports = handler
