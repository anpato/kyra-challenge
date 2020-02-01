import { Api } from '../config'

export const subscribeToFeed = async () => {
  try {
    const resp = await Api.get('/live')
    console.log(resp)
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
