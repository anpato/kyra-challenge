import Axios from 'axios'

export const Api = Axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://kyra-challenge.herokuapp.com/api'
      : `http://localhost:3001/api`,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
})
