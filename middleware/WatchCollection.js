const { Video } = require('../db/Schema')

module.exports = (req, res, next) => {
  const stream = Video.watch()
  stream.on('change', change => {
    // console.log(change)
    const document = change.fullDocument
    res.locals.video = document
    next()
  })
}
