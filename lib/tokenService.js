//Dependencies
const { parseJSON } = require('../helpers/utilities');
const dataLib = require('./data')

//Module scafolding
const token = {}

token.getAllToken = () => {
  dataLib.collection('token',(err,tokens)=>{
    tokens.map((val,i)=>{
      token.checkValidity(parseJSON(val.toString()))
    })
  })
}

token.checkValidity = (token) => {
  if (token.expires < Date.now()) {
    dataLib.delete('token',token.id,(err)=>{
      if(!err){
        console.log('Expired Token Deleted');
      }else{
        console.log('Couldn\'t Deleted');
      }
    })
  }  
}

token.loop = () => {
  setInterval(()=>{
    token.getAllToken()
  },1000*60)
}

token.init = ()=>{
  token.getAllToken()
  token.loop()
}

module.exports = token
