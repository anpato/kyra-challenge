module.exports = dates => {
  let tmpDates = []
  dates.forEach(date => {
    tmpDates.push(date.toLocaleString().split(',')[0])
  })
  return tmpDates.join('-')
}
