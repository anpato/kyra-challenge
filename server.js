const express = require('express')
const Router = require('./routes')
const cors = require('cors')
class Server {
  constructor(port, middleWare, baseroute) {
    this.app = express()
    this.port = port
    this.middleWare = middleWare
    this.baseroute = baseroute
  }
  get() {
    this.app.get(this.baseroute, (req, res) => res.json({ msg: 'Portfolio' }))
  }

  listen() {
    this.app.listen(this.port, () =>
      console.info(`Server Started on  port:${this.port}`)
    )
  }

  init_middleWare() {
    // this.middleWare.forEach(middleware => this.app.use(middleware))
    this.app.use(cors())
  }
  init_routes() {
    this.app.use('/api', Router)
  }
  initialize() {
    this.app.disable('x-powered-by')
    this.init_middleWare()
    this.init_routes()
    this.listen()
  }
}

module.exports = Server
