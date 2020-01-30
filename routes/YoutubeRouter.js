const YoutubeRouter = require('express').Router()
const getData = require('./YoutubeEndpoints')
const pusher = require('../config/PusherConfig')
const cron = require('node-cron')

YoutubeRouter.post('/', async (req, res) => {
  try {
    getData().then(videos =>
      pusher.trigger('subscribe', 'new-videos', {
        message: 'connected',
        data: videos
      })
    )
  } catch (error) {
    throw error
  }
})

module.exports = YoutubeRouter
