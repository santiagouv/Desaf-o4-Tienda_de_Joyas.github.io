const joyasRouter = require('express').Router()
const { getJoyasController, getJoyasByFilterController } = require('../../controllers/joyas.controller')
const {handleRequestLogs} = require('../../middlewares/logs.middleware')
// const checkPostID = require('../../middlewares/checkPost')

joyasRouter.get('/', handleRequestLogs, getJoyasController)
joyasRouter.get('/filtros', handleRequestLogs, getJoyasByFilterController)

module.exports = joyasRouter