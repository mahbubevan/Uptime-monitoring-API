const https = require('https') 
const {twilio} = require('../helpers/env')
const queryString = require('querystring')

// module scafolding  
const notifications = {}

// send sms to user using twilio api 

notifications.sendTwilioSms = (phone,msg,callback) => {
  // input validation 
  let userPhone = typeof phone === 'string'  && phone.trim().length() === 11 ? phone : false 
  let userMsg = typeof msg === 'string' && msg.trim().length() > 0 && msg.trim().length() <= 1600
      ? msg.trim() :false

  if (userPhone && userMsg) {
    const payload = {
      From: twilio.from,
      To: `+88${userPhone}`,
      Body: userMsg
    }

    //stringify the payload 
    const stringPayload = queryString.stringify(payload)

    // configure the request 
    const reqDetails = {
      hostname:'api.twilio.com',
      method:'POST',
      path:`2010-04-01/Accounts/${twilio.accountSid}/Messages.json`,
      auth:`${twilio.accountSid}:${twilio.authToken}`,
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    }

    // instance of req object 
    const req = https.request(reqDetails,(res)=>{
      const status = res.statusCode 

      if (status === 200 || status === 201) {
        callback(false)
      }else{
        callback(`Status code returned was ${status}`)
      }
    })

    req.on('error',(e)=>{
      callback(e)
    })

    req.write(stringPayload)
    req.end()

  }else{
    callback('Invalid Parameters')
  }

}

module.exports = notifications
