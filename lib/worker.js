//module scafolding 
const url = require('url')
const { parseJSON } = require('../helpers/utilities');
const dataLib = require('./data')
const worker = {}
const http = require('http')
const https = require('https')
const {sendTwilioSms} = require('./../helpers/notifications');
const envExport = require('../helpers/env');

worker.gatherAllChecks = () => {
  dataLib.list('check',(err,checks)=>{
    if (!err && checks.length > 0) {
      checks.forEach(element => {
        dataLib.read('check',element,(err,checkData)=>{
          if (!err && checkData) {
            let checkObject = {...parseJSON(checkData)}
            worker.validateCheck(checkObject)
          }else{
            console.log('Error Reading Data');
          }
        })
      });
      console.log(checks);
    }else{      
      console.log('Error');
    }
  })
}

worker.validateCheck = (data) => {
  if (data && data.id) {
    data.state = typeof data.state === 'string' && ['up','down'].indexOf(data.state) > -1 ? data.state : 'down'
    data.lastChecked = typeof data.lastChecked === 'number' && data.lastChecked > 0 ? data.lastChecked : false 
    
    worker.performCheck(data)
  }else{
    console.log('Error: Invalid Validation');
  }
}

worker.performCheck = (data) => {
  //prepare the initial check outcome 
  let checkOutCome = {
    'error':false,
    'responseCode':false
  }

  let outcomeSent = false

  //parse the hostname 
  let parsedUrl = url.parse(data.protocol+'://'+data.url,true)
  let hostName = parsedUrl.hostname 
  let path = parsedUrl.path 

  const reqDetails = {
    'protocol':data.protocol + ':',
    'hostname':hostName,
    'method':data.method.toUpperCase(),
    'path':path,
    'timeout':data.timeoutSeconds * 1000
  }

  const protocol = data.protocol === 'http' ? http : https 
  let req = protocol.request(reqDetails,(res)=>{
    checkOutCome.responseCode = res.statusCode 

    if (!outcomeSent) {
      worker.processCheckOutcome(data,checkOutCome)
      outcomeSent = true
    }
  })

  req.on('error',(e)=>{
    
    checkOutCome = {
      'error':true,
      'value':e
    }

    if (!outcomeSent) {
      worker.processCheckOutcome(data,checkOutCome)
      outcomeSent = true
    }
  })

  req.on('timeout',(e)=>{

    checkOutCome = {
      'error':true,
      'responseCode':'timeout'
    }

    if (!outcomeSent) {
      worker.processCheckOutcome(data,checkOutCome)
      outcomeSent = true
    }
  })

  req.end()
  
}

worker.processCheckOutcome = (data,outcome) =>{
  console.log(outcome);
  let state = !outcome.error && outcome.responseCode && data.successCodes.indexOf(outcome.responseCode) > -1 ? 'up' :'down'

  let alertWanted = data.lastChecked && data.state !== state ? true : false

  data.state = state 
  data.lastChecked = Date.now()

  dataLib.update('check',data.id,data,(err)=>{
    if (!err) {
      if (alertWanted) {
        worker.alertUser(data)
      }else{
        console.log('Alert Not Wanted');
      }
    }else{
      console.log('Couldn\'t update the data');
    }
  })
}

worker.alertUser = (data) => {
  let msg = `Alert your check for ${data.method.toUpperCase()} ${data.protocol}://${data.url} is currently ${data.state}`
  let toSend = data.userPhone
  sendTwilioSms(toSend,msg,(err)=>{
    if (!err) {
      console.log(`User was aleted to via SMS: ${msg}`);
    }else{
      console.log('There was problem sending sms to user:'+err);
    }
  })
}

worker.loop = () => {
  setInterval(()=>{
    worker.gatherAllChecks()
  },1000*60)
}

worker.init = () => {
  worker.gatherAllChecks() 
  worker.loop()
}

module.exports = worker
