import { Api } from '../config'

export const getData = async () => {
  try {
    const resp = await Api.get('/live')
    console.log(resp)
  } catch (error) {
    throw error
  }
}
