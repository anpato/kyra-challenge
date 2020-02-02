const FetchAllVideos = require('../routes/YoutubeEndpoints')
const { Video } = require('../db/Schema')

module.exports = async () => {
  const { data, nextPageToken, totalResults } = await FetchAllVideos()
  console.log(res.locals)
  await Video.insertMany(data, {
    ordered: false,
    runValidators: true,
    context: 'query'
  })
}
