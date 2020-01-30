const Pusher = require('pusher-js')
const dotenv = require('dotenv')
dotenv.config()
const { PUSHER_ID, PUSHER_KEY, PUSHER_SECRET, PUSHER_CLUSTER } = process.env

module.exports = new Pusher({
  appId: PUSHER_ID,
  key: PUSHER_KEY,
  secret: PUSHER_SECRET,
  cluster: PUSHER_CLUSTER,
  encrypted: true
})
