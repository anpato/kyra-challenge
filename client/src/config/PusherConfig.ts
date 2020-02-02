import Pusher from 'pusher-js'

const {
  REACT_APP_PUSHER_ID,
  REACT_APP_PUSHER_KEY,
  REACT_APP_PUSHER_SECRET,
  REACT_APP_PUSHER_CLUSTER
} = process.env

export const pusher = new Pusher(REACT_APP_PUSHER_KEY, {
  appId: REACT_APP_PUSHER_ID,
  secret: REACT_APP_PUSHER_SECRET,
  cluster: REACT_APP_PUSHER_CLUSTER,
  useTLS: true
})
