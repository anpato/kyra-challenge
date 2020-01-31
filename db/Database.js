const { connection, connect } = require('mongoose')

module.exports = class Database {
  constructor() {
    this.connect = connect
    this.params = {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    }
    this.connection = connection
  }

  CloseConnection() {
    console.info('Closing connection')
    this.connection.close()
  }

  ConnectDB() {
    console.info('Connecting to Database')
    this.connect('mongodb://localhost:27017/kyra', this.params)
    this.connection.once('open', () => {
      console.info('Connected to database')
    })
    return this.connection
  }

  async DropDB() {
    await this.ConnectDB().once('open', async () => {
      await this.connection.db.dropDatabase()
      console.info('Database Dropped')
      this.CloseConnection()
    })
  }
}
