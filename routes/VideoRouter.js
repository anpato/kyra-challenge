const VideoRouter = require('express').Router()
const { Video } = require('../db/Schema')

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

module.exports = VideoRouter
