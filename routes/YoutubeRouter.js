const YoutubeRouter = require('express').Router()
const Subscribe = require('../middleware/Subscribe')
const WatchCollection = require('../middleware/WatchCollection')

YoutubeRouter.get('/', WatchCollection, Subscribe)

module.exports = YoutubeRouter
