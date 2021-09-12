//module scaffolding 
const env = {}

env.development = {
  port:3000,
  envName:'development',
  acceptedMethods:['get','post','put','delete']
}

env.production = {
  port:5000,
  envName:'production',
  acceptedMethods:['get','post','put','delete']
}

const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV : 'development'

const envExport = 
  typeof env[currentEnvironment] === 'object'
    ? env[currentEnvironment]
    : env.development

module.exports = envExport
