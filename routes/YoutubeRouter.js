const YoutubeRouter = require('express').Router()
const GetVideos = require('../middleware/GetVideos')
const Subscribe = require('../middleware/Subscribe')
const cron = require('node-cron')
const { Video } = require('../db/Schema')
const query = require('../queries/index')

YoutubeRouter.post(
  '/',
  // GetVideos,
  async (req, res, next) => {
    try {
      const { nextPageToken } = res.locals
      const videos = await Video.find().limit(5)
      console.log(videos.length)
      res.locals = {
        // nextPage: nextPageToken,
        videos
      }
      next()
    } catch (error) {
      throw error
    }
  },
  Subscribe
)

module.exports = YoutubeRouter
