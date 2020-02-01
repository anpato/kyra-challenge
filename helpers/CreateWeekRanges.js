const moment = require('moment')

module.exports = (maxRange, today) => {
  let startDay = maxRange
  let endDay = moment(maxRange).add(7, 'days')

  let weeks = []
  while (startDay._d <= today._d) {
    weeks.push({ start: startDay._d, end: endDay._d })
    startDay = endDay
    endDay = moment(startDay).add(7, 'days')
  }
  return weeks
}
