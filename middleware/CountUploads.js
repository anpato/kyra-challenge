const { Video } = require('../db/Schema')
const ParseDateToString = require('../helpers/ParseDateToString')
module.exports = async (req, res, next) => {
  const { weekRanges } = res.locals
  try {
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
      }).countDocuments((err, count) =>
        uploads['data'].push(
          Object.values({
            dates: ParseDateToString([week.start, week.end]),
            uploads: count
          })
        )
      )
      return promise
    }, Promise.resolve())
    res.locals = { uploads, ...res.locals }
    next()
  } catch (error) {
    throw error
  }
}
