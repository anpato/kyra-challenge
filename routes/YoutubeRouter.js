const YoutubeRouter = require('express').Router()
const Subscribe = require('../middleware/Subscribe')
const WatchCollection = require('../middleware/WatchCollection')
const DateRanges = require('../middleware/DateRanges')
const CountUploads = require('../middleware/CountUploads')
YoutubeRouter.get('/', WatchCollection, DateRanges, CountUploads, Subscribe)

module.exports = YoutubeRouter
