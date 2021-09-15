//Dependencies 
const crypto = require('crypto')
const env = require('../helpers/env')
// scaffolding
const utilities = {}

// parse JSON string to Object 
utilities.parseJSON = (jsonString) => {
    let output = {}
    try {
        output = JSON.parse(jsonString)
    } catch (error) {
        output = {}
    }

    return output
}

// Password Hasing 
utilities.hash = (string) => {
  if (typeof(string) === 'string' && string.length > 0) {
    let hash = crypto.createHmac('sha256',env.secretKey)
                      .update(string).digest('hex')

    return hash
  }
}

// validation 
utilities.validation = (obj) => {
    for (const [key, value] of Object.entries(obj)) {
        let val = new String(value).split(",")[1]
        let rules = new String(value).split(",")[0].split("|")
        console.log(key,val,rules);
        
      }
}

module.exports = utilities
