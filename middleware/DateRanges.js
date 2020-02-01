const moment = require('moment')
const CreateWeekRanges = require('../helpers/CreateWeekRanges')

module.exports = (req, res, next) => {
  const today = moment().startOf('week')
  const maxRange = moment().subtract(18, 'months')
  const weeks = CreateWeekRanges(maxRange, today)
  res.locals = { weekRanges: weeks, ...res.locals }
  next()
}
