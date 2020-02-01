const pusher = require('../config/PusherConfig')

module.exports = async (req, res) => {
  const { video, uploads } = res.locals
  await pusher.trigger('subscribe', 'videos', {
    message: 'connected',
    data: { video, uploads }
  })
}
