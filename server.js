const express = require('express')
const Router = require('./routes')
const Database = require('./db/Database')
const GetVideos = require('./middleware/GetVideos')
const cron = require('node-cron')
class Server {
  constructor(port, middleWare, baseroute) {
    this.app = express()
    this.port = port
    this.middleWare = middleWare
    this.baseroute = baseroute
    this.database = new Database()
  }
  get() {
    this.app.get(this.baseroute, (req, res) => res.json({ msg: 'Kyra' }))
  }

  listen() {
    this.app.listen(this.port, () =>
      console.info(`Server Started on port: ${this.port}`)
    )
  }

  startCron() {
    cron.schedule('*/30 * * * *', async () => {
      console.log('firing')
      // await GetVideos()
    })
  }

  init_middleWare() {
    this.middleWare.forEach(middleware => this.app.use(middleware))
  }
  init_routes() {
    this.app.use('/api', Router)
  }
  connectDB() {
    this.database.ConnectDB().once('open', () => {
      this.listen()
      this.startCron()
    })
  }
  initialize() {
    this.app.disable('x-powered-by')
    this.init_middleWare()
    this.init_routes()
    this.connectDB()
  }
}

module.exports = Server
