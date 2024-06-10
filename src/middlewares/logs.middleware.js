const moment = require('moment')

const handleRequestLogs = (req, res, next) => {
  const time = moment().format('DD/MM/YY HH:mm:ss')
  const {method, query, params, originalUrl} = req
  const path = originalUrl.split('?')[0]
  
  const message = `
  *****
  [${time}] Se ha realizado una consulta '${method} ${path}'
  Queries: 
  ${JSON.stringify(query, null, 2)}
  Params: 
  ${JSON.stringify(params, null, 2)}
  *****
  `
  
  console.log(message)
  next()
}

module.exports = {
  handleRequestLogs
}