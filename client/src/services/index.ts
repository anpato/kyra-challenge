import { Api } from '../config'

export const SubscribeToFeed = async () => {
  try {
    const resp = await Api.get('/live')
    return resp.data
  } catch (error) {
    throw error
  }
}

export const LoadVideos = async (page: number) => {
  try {
    const resp = await Api.get(`/videos/?page=${page}`)
    return resp.data
  } catch (error) {
    throw error
  }
}

export const GetWeeklyUploadStats = async () => {
  try {
    const resp = await Api.get('/videos/uploads')
    return resp.data
  } catch (error) {
    throw error
  }
}
