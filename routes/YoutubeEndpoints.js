const Axios = require('axios')
const dotenv = require('dotenv')
dotenv.config()
const token = process.env.YOUTUBE_TOKEN
const baseUrl = `https://www.googleapis.com/youtube/v3`
const Api = Axios.create({
  baseURL: baseUrl
})

const getData = async pageToken => {
  try {
    const resp = await Api.get(
      `/search?key=${token}&channelId=UCvO6uJUVJQ6SrATfsWR5_aA&part=snippet,id&order=date&maxResults=20&pageToken=${pageToken ||
        ''}`
    )
    const data = await __ParseChannelVideos(resp.data.items)
    return { nextPageToken: resp.data.nextPageToken, data }
  } catch (error) {
    throw error
  }
}

const listVideos = async videoId => {
  try {
    const resp = await Api.get(
      `/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${token}`
    )
    return resp.data.items
  } catch (error) {}
}

const __ParseChannelVideos = channelData => {
  return channelData.map((data, index) => {
    const parsedData = {
      id: data.id.videoId,
      publishDate: data.snippet.publishedAt,
      title: data.snippet.title,
      description: data.snippet.description,
      thumbnail: data.snippet.thumbnails.default.url
    }
    return parsedData
  })
}

// const __AssignVideoToData = async channelData => {
//   const data = __ParseChannelVideos(channelData)
//   let parsedData = []
//   let ids = []
//   for (let i = 0; i < data.length; i++) {
//     const item = data[i]
//     ids.push(item.id)
//   }
//   const videos = await listVideos(ids)
//   console.log(videos)
// }

module.exports = getData
