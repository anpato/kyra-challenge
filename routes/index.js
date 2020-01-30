const Router = require('express').Router()
const YoutubeRouter = require('./YoutubeRouter')

Router.use('/live', YoutubeRouter)

module.exports = Router
