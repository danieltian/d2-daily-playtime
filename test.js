const fetch = require('node-fetch')
const fs = require('fs')

function getDays(month, year = 2017) {
  var firstDate = new Date(year, month, 1);
  var lastDate = new Date(year, month + 1, 0);
  var firstDay = firstDate.toISOString().substring(0, 10);
  var lastDay = lastDate.toISOString().substring(0, 10);

  return { firstDay, lastDay }
}

for (let i = 0; i <= 11; i++) {
  let url = "https://www.bungie.net/Platform//Destiny2/3/Account/4611686018473709750/Character/2305843009322050766/Stats/?periodType=1"
  const days = getDays(i)
  url += `&daystart=${days.firstDay}&dayend=${days.lastDay}`

  fetch(url, {
    headers: {'x-api-key': 'f4eca03107bf4026adf99e05a3d1f8c5'}
  }).then(res => res.json())
    .then(json => fs.writeFileSync(`data/${days.firstDay} to ${days.lastDay}.json`, JSON.stringify(json, undefined, 2)))
}
