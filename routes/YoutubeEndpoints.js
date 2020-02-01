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
      `/search?key=${token}&channelId=UCvO6uJUVJQ6SrATfsWR5_aA&part=snippet,id&order=date&maxResults=50&pageToken=${pageToken ||
        ''}`
    )
    // console.log(resp.data)
    const ids = await pullIds(resp.data.items)
    return {
      nextPage: resp.data.nextPageToken,
      ids,
      totalResults: resp.data.pageInfo.totalResults
    }
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
      youtube_id: data.id,
      publishDate: data.snippet.publishedAt,
      title: data.snippet.title,
      description: data.snippet.description,
      thumbnail: data.snippet.thumbnails.default.url,
      stats: data.statistics
    }
    return parsedData
  })
}

const FetchAllVideos = async token => {
  try {
    const { ids, nextPage, totalResults } = await getData(token)
    const data = await listVideos(ids)
    const videos = __ParseChannelVideos(data)
    return { nextPageToken: nextPage, data: videos, totalResults }
  } catch (error) {
    throw error
  }
}

module.exports = FetchAllVideos
