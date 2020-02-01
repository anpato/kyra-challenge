const Router = require('express').Router()
const YoutubeRouter = require('./YoutubeRouter')
const VideoRouter = require('./VideoRouter')
Router.use('/live', YoutubeRouter)
Router.use('/videos', VideoRouter)
module.exports = Router
