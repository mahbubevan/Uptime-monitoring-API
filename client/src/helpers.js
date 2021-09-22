const helpers = {}

helpers.getDateTime = (stringDate) => {
  let convertedDate = new Date(stringDate)
  let date = convertedDate.toLocaleDateString()
  let time = convertedDate.toLocaleTimeString()
  date = `${time}  ${date} `
  return date
}

helpers.getSiteName = () => {
  return 'Uptime Monitoring API'
}

helpers.getLength = (param) => {
  if (typeof param === 'object' && param instanceof Array) {
    return param.length
  }

  return 0
}

helpers.tokenVerify = async () => {
  
  const x = document.cookie
  const tokenId = x.split('=')[1]
  const url = `http://127.0.0.1:3000/token/verify?id=${tokenId}`

  const responseObject = await fetch(url).then(res=>res.json())
  const isTokenValid = responseObject.isTokenValid

  return isTokenValid;
}

helpers.loggedOut = async () => {
  
    let x = document.cookie
    let tokenId = x.split('=')[1]
    const url = `http://127.0.0.1:3000/token?id=${tokenId}`
    const response = await fetch(url,{method:'DELETE'}).then(res=>res.json())

  return true;
}



export default helpers
