import Axios from 'axios'

export const Api = Axios.create({
  baseURL: `http://localhost:3001/api`,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
})
