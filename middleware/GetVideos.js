const FetchAllVideos = require('../routes/YoutubeEndpoints')
const { Video } = require('../db/Schema')
module.exports = async (req, res, next) => {
  const { data, nextPageToken } = await FetchAllVideos()
  const videos = []
  await data.reduce(async (promise, video) => {
    await Video.findOneAndUpdate(
      { youtube_id: video.youtube_id },
      { new: true, upsert: true },
      (err, doc) => {
        videos.push(doc)
      }
    )
  }, Promise.resolve())
  res.locals = { data: videos, nextPageToken }
  next()
}
