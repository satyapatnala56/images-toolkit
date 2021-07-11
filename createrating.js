const fs = require('fs')
const axios = require('axios')
const nodegit = require('nodegit')
const path = require('path')
fs.rmdirSync('./_data/files', { recursive: true })
const url = 'https://github.com/Appscms-com/file-type-data.git',
  local = './_data/files',
  cloneOpts = {}
nodegit
  .Clone(url, local, cloneOpts)
  .then(function (repo) {
    console.log('Cloned ' + path.basename(url) + ' to ' + repo.workdir())
    fs.rmdirSync('./_data/files/.git', { recursive: true })
  })
  .catch(function (err) {
    console.log(err)
  })
const data = fs.readFileSync('./_data/rating/rating.json', {
  encoding: 'utf8',
  flag: 'r',
})
const parseData = JSON.parse(data)
const ratingJson = []
const generateFile = (data) => {
  data.tools.map((item) => {
    axios
      .get(
        `https://ratingapi-main.netlify.app/.netlify/functions/api/v1/${item.name}/rating`
      )
      .then((response) => {
        const item = {
          name: response.data.feature,
          rating: response.data.rating,
          votes: response.data.votes,
        }
        ratingJson.push(item)
        fs.writeFileSync(
          './_data/rating/rating.json',
          `{"tools":${JSON.stringify(ratingJson)}}`
        )
      })
      .catch((error) => {
        console.log(error.message)
      })
  })
}
generateFile(parseData)
