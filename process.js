const glob = require('glob')
const fs = require('fs')

glob('./data/**/*.json', undefined, (error, files) => {
  const data = []
  const dates = {}

  files.forEach(file => {
    data.push(require(file).Response)
  })

  data.forEach(month => {
    Object.entries(month).forEach(([type, details]) => {
      (details.daily || []).forEach(day => {
        const period = day.period
        dates[period] = dates[period] || {}
        dates[period][type] = (dates[period][type] || 0) + day.values.secondsPlayed.basic.value
      })
    })
  })

  fs.writeFileSync('./data.json', JSON.stringify(dates, undefined, 2))
})
