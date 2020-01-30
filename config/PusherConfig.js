const Pusher = require('pusher')
const dotenv = require('dotenv')
dotenv.config()
const { PUSHER_ID, PUSHER_KEY, PUSHER_SECRET, PUSHER_CLUSTER } = process.env
const pusher = new Pusher({
  appId: PUSHER_ID,
  key: PUSHER_KEY,
  secret: PUSHER_SECRET,
  cluster: PUSHER_CLUSTER,
  useTLS: true
})

module.exports = pusher
