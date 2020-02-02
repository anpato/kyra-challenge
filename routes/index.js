const Router = require('express').Router()
const VideoRouter = require('./VideoRouter')
const SubscriptionRouter = require('./SubscriptionRouter')
Router.use('/videos', VideoRouter)
Router.use('/live', SubscriptionRouter)
module.exports = Router
