const YoutubeRouter = require('express').Router()
const GetVideos = require('../middleware/GetVideos')
const Subscribe = require('../middleware/Subscribe')
const cron = require('node-cron')
const { Video } = require('../db/Schema')
const query = require('../queries/index')
const WatchCollection = require('../middleware/WatchCollection')
YoutubeRouter.post(
  '/',

  GetVideos,
  // WatchCollection,
  async (req, res, next) => {
    try {
      const { nextPageToken } = res.locals
      const videos = await Video.find({}, null, { sort: '-publishDate' }).limit(
        5
      )
      res.locals = {
        // nextPage: nextPageToken,
        videos
      }
      next()
    } catch (error) {
      return
    }
  },
  Subscribe
)

module.exports = YoutubeRouter
