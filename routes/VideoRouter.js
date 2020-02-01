const VideoRouter = require('express').Router()
const { Video } = require('../db/Schema')
const DateRanges = require('../middleware/DateRanges')
const CountUploads = require('../middleware/CountUploads')

VideoRouter.get('/', async (req, res) => {
  try {
    const perPage = 10,
      page = Math.max(0, parseInt(req.query.page))
    await Video.find({}, null, { sort: '-publishDate' })
      .limit(perPage)
      .skip(perPage * page)
      .exec((err, data) => {
        if (err) throw err
        Video.countDocuments().exec((err, count) => {
          if (err) throw err
          res.send({ data, page, pages: Math.floor(count / perPage) })
        })
      })
  } catch (error) {
    throw error
  }
})

VideoRouter.get('/uploads', DateRanges, CountUploads, async (req, res) => {
  try {
    res.send(res.locals.uploads)
  } catch (error) {
    throw error
  }
})

module.exports = VideoRouter
