

// module scafolding 
const handlers = {}

handlers.notFoundHandler = (requestProperties,callback) => {
  console.log("Not Found");
  callback(404,{
    message:"NOT FOUND"
  })
}


module.exports = handlers
