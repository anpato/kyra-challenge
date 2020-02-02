const { Video } = require('../db/Schema')

module.exports = (req, res, next) => {
  const stream = Video.watch()
  console.log(Object.keys(res.locals))
  stream.on('change', change => {
    const document = change.fullDocument
    res.locals.video = document
    next()
  })
}
