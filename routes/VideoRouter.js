const VideoRouter = require('express').Router()
const { Video } = require('../db/Schema')
const ChartRanges = require('../middleware/DateRanges')

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
VideoRouter.get('/uploads', ChartRanges, async (req, res) => {
  try {
    const { dateRanges, weekRanges } = res.locals
    let resp = []
    weekRanges.forEach(async week => {
      const video = await Video.find({
        publishDate: {
          $gte: week.start,
          $lt: week.end
        }
      }).countDocuments((err, count) => {
        console.log({ ...week, uploads: count })
      })
    })

    const videos = await Video.find({
      publishDate: {
        $gte: dateRanges.startDate,
        $lt: dateRanges.currentDate
      }
    }).select(['_id', 'title, publishDate'])
    res.send(videos)
  } catch (error) {
    throw error
  }
})

module.exports = VideoRouter
