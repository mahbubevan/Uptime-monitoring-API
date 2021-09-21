const helpers = {}

helpers.getDateTime = (stringDate) => {
  let convertedDate = new Date(stringDate)
  let date = convertedDate.toLocaleDateString()
  let time = convertedDate.toLocaleTimeString()
  date = `${time}  ${date} `
  return date
}

export default helpers
