

// module scafolding 
const handlers = {}

handlers.sampleHandler = (requestProperties,callback) => {
  console.log(requestProperties);
  callback(200,{
    message:'This is sample URL'
  })
}


module.exports = handlers
