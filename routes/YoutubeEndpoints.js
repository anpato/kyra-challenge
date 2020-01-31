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
    const ids = await pullIds(resp.data.items)
    return { nextPage: resp.data.nextPageToken, data: resp.data.items }
  } catch (error) {
    throw error
  }
}

const listVideos = async videoIds => {
  try {
    const resp = await Api.get(
      `/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${token}`
    )
    return resp.data.items
  } catch (error) {
    throw error
  }
}

const pullIds = data => {
  return data.map(data => data.id.videoId)
}

const __ParseChannelVideos = channelData => {
  return channelData.map((data, index) => {
    const parsedData = {
      id: data.id.videoId,
      publishDate: data.snippet.publishedAt,
      title: data.snippet.title,
      description: data.snippet.description,
      thumbnail: data.snippet.thumbnails.default.url
      // stats: data.statistics
    }
    return parsedData
  })
}

const FetchAllVideos = async () => {
  try {
    const { data, nextPage } = await getData()
    // const videos = await listVideos(ids)
    const videos = __ParseChannelVideos(data)
    return { nextPageToken: nextPage, videos }
  } catch (error) {
    throw error
  }
}

module.exports = FetchAllVideos
