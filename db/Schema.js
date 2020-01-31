const model = require('mongoose').model
const VideoModel = require('./models/Video')

const Video = model('videos', VideoModel)

module.exports = {
  Video
}
