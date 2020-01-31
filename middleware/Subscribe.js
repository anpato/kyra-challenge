const pusher = require('../config/PusherConfig')

module.exports = async (req, res) => {
  const { videos, nextPage } = res.locals
  await pusher.trigger('subscribe', 'videos', {
    message: 'connected',
    data: { videos }
  })
}
