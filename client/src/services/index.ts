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
