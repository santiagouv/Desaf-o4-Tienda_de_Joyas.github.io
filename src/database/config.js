require('dotenv').config()
const {Pool} = require('pg')
const { PG_HOST, PG_DATABASE, PG_USER, PG_PASSWORD, PG_PORT} = process.env

const database = new Pool({
  host: PG_HOST,
  database: PG_DATABASE,
  user: PG_USER,
  password: PG_PASSWORD,
  port: PG_PORT,
  allowExitOnIdle: true
})

module.exports = database