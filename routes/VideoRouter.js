const VideoRouter = require('express').Router()
const { Video } = require('../db/Schema')
const DateRanges = require('../middleware/DateRanges')

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

VideoRouter.get('/uploads', DateRanges, async (req, res) => {
  try {
    const { weekRanges } = res.locals
    let uploads = {
      labels: ['Dates', 'Uploads'],
      data: []
    }
    await weekRanges.reduce(async (promise, week) => {
      await Video.find({
        publishDate: {
          $gte: week.start,
          $lt: week.end
        }
      }).countDocuments((err, count) => {
        let start = week.start.toLocaleString().split(',')[0]
        let end = week.end.toLocaleString().split(',')[0]

        uploads['data'].push(
          Object.values({ dates: `${start}-${end}`, uploads: count })
        )
      })
      return promise
    }, Promise.resolve())
    res.send(uploads)
  } catch (error) {
    throw error
  }
})

module.exports = VideoRouter
