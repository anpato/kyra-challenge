const moment = require('moment')
const CreateWeekRanges = require('../helpers/CreateWeekRanges')

module.exports = (req, res, next) => {
  const today = moment().startOf('week')
  const maxRange = moment().subtract(18, 'months')

  const weeks = CreateWeekRanges(maxRange, today)
  res.locals = {
    dateRanges: {
      currentDate: today._d,
      startDate: maxRange._d
    },
    weekRanges: weeks
  }
  next()
}
