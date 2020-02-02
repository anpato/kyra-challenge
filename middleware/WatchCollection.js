const { Video } = require('../db/Schema')

module.exports = (req, res, next) => {
  const stream = Video.watch()
  stream.on('change', change => {
    let uploads = []
    const document = change.fullDocument
    uploads.push(document)
    res.locals.video = uploads
    next()
  })
}
