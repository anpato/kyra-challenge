const express = require('express')
const Router = require('./routes')
const Database = require('./db/Database')
const GetVideos = require('./middleware/GetVideos')
const cron = require('node-cron')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config()
class Server {
  constructor(port, middleWare, baseroute) {
    this.app = express()
    this.port = port
    this.middleWare = middleWare
    this.baseroute = baseroute
    this.database = new Database()
  }
  get() {
    if (process.env.NODE_ENV === 'production') {
      return this.app.get('*', (req, res) =>
        res.sendFile(path.join(__dirname, '/client/build', 'index.html'))
      )
    } else {
      this.app.get(this.baseroute, (req, res) => res.json({ msg: 'Kyra' }))
    }
  }

  listen() {
    this.app.listen(this.port, () =>
      console.info(`Server Started on port: ${this.port}`)
    )
  }

  async startCron() {
    cron.schedule('*/30 * * * *', async () => {
      await GetVideos()
    })
  }

  init_middleWare() {
    this.middleWare.forEach(middleware => this.app.use(middleware))
  }
  init_routes() {
    this.app.use('/api', Router)
  }

  setupClientJoin() {
    this.app.use(express.static(path.join(__dirname, '/client/build')))
  }

  connectDB() {
    this.database.ConnectDB().once('open', () => {
      this.listen()
      this.startCron()
    })
  }
  initialize() {
    this.app.disable('x-powered-by')
    this.setupClientJoin()
    this.init_middleWare()
    this.init_routes()

    this.get()
    this.connectDB()
  }
}

module.exports = Server
