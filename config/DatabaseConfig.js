const dotenv = require('dotenv')
dotenv.config()
const { DATABASE_URI } = process.env

module.exports = () => {
  return {
    connectionString: DATABASE_URI,
    name: 'Kyra'
  }
}
