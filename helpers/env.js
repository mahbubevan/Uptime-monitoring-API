//module scaffolding 
const env = {}

env.development = {
  port:3000,
  envName:'development',
  acceptedMethods:['get','post','put','delete'],
  secretKey:"devSecret",
  tokenExpire: Date.now() + 60 * 60 * 1000,
  tokenLength:20,
  maxCheck:5,
  twilio:{
    from:'+14695303134',
    accountSid:'AC4986e94addbde77f6b83793a2ea4beba',
    authToken:'1a20db5b32ac5a4586447a8e906b5540'
  }
}

env.production = {
  port:5000,
  envName:'production',
  acceptedMethods:['get','post','put','delete'],
  secretKey:"productionSecret",
  tokenExpire: Date.now() + 60 * 60 * 1000,
  tokenLength:20,
  maxCheck:5,
  twilio:{
    from:'+14695303134',
    accountSid:'AC4986e94addbde77f6b83793a2ea4beba',
    authToken:'1a20db5b32ac5a4586447a8e906b5540'
  }
}

const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV : 'development'

const envExport = 
  typeof env[currentEnvironment] === 'object'
    ? env[currentEnvironment]
    : env.development

module.exports = envExport
