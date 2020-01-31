const Schema = require('mongoose').Schema

module.exports = new Schema(
  {
    youtube_id: String,
    publishDate: String,
    title: String,
    description: String,
    thumbnail: String
  },
  { timestamps: true }
)
