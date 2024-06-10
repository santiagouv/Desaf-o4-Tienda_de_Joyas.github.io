const router = require('express').Router()
const joyasRoutes = require('./joyas/joyas.router')

router.use('/joyas', joyasRoutes)

module.exports = router