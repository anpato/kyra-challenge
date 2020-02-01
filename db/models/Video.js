const Schema = require('mongoose').Schema
var uniqueValidator = require('mongoose-unique-validator')
const Video = new Schema(
  {
    youtube_id: {
      type: String,
      unique: true,
      index: true
    },
    publishDate: String,
    title: String,
    description: String,
    thumbnail: String,
    stats: {
      viewCount: String,
      likeCount: String,
      dislikeCount: String,
      favoriteCount: String,
      commentCount: String
    }
  },
  { timestamps: true }
)
Video.plugin(uniqueValidator)

module.exports = Video
