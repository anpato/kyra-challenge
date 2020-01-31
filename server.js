const express = require('express')
const Router = require('./routes')
const Database = require('./db/Database')
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

  init_middleWare() {
    this.middleWare.forEach(middleware => this.app.use(middleware))
  }
  init_routes() {
    this.app.use('/api', Router)
  }
  connectDB() {
    this.database.ConnectDB().once('open', () => {
      this.listen()
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
