const FetchAllVideos = require('../routes/YoutubeEndpoints')
const { Video } = require('../db/Schema')

module.exports = async () => {
  const { data, nextPageToken } = await FetchAllVideos()

  await Video.insertMany(data, {
    ordered: false,
    runVaildators: true,
    context: 'query'
  })
}
