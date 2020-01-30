const Server = require('./server')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()
const middleWare = [cors()]

const App = new Server(process.env.PORT || 3001, middleWare, '/')

App.initialize()
