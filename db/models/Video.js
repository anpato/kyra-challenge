const Schema = require('mongoose').Schema

module.exports = new Schema(
  {
    youtube_id: String,
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
