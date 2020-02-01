const FetchAllVideos = require('../routes/YoutubeEndpoints')
const { Video } = require('../db/Schema')
module.exports = async (req, res, next) => {
  const { data, nextPageToken } = await FetchAllVideos()

  const videos = Video.create(data, {
    ordered: false,
    runVaildators: true,
    context: 'query'
  })
  if (arguments.length) {
    res.locals = { data: videos, nextPageToken }
    next()
  }
}
