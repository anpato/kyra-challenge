const YoutubeRouter = require('express').Router()
const getData = require('./YoutubeEndpoints')
const pusher = require('../config/PusherConfig')
const cron = require('node-cron')

YoutubeRouter.get('/', async (req, res) => {
  try {
    const channel = pusher.subscribe('youtube')
    channel.bind('youtube', data => {
      return cron.schedule('* * * * *', (req, res) => {
        res.json({ message: 'Connected' })
        // const videoData = getData()
        // console.log(videoData)
      })
    })
  } catch (error) {
    throw error
  }
})

module.exports = YoutubeRouter
