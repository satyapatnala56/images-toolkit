const fs = require('fs')
const axios = require('axios')
const data = fs.readFileSync('./_data/rating/rating.json', {
  encoding: 'utf8',
  flag: 'r',
})

const parseData = JSON.parse(data)

const generateFile = (data) => {
  data.map((item) => {
    axios({
      method: 'post',
      url: `https://ratingapi-main.netlify.app/.netlify/functions/api/v1/feature/create`,
      data: {
        website: item.website,
        feature: item.feature,
      },
    })
  })
}
generateFile(parseData)
