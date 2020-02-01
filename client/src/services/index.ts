import { Api } from '../config'

export const subscribeToFeed = async () => {
  try {
    const resp = await Api.post('/live')
    console.log(resp)
    return resp.data
  } catch (error) {
    throw error
  }
}

export const LoadMoreVideos = async (page: number) => {
  try {
    const resp = await Api.get(`/videos/?page=${page}`)
    return resp.data
  } catch (error) {
    throw error
  }
}
