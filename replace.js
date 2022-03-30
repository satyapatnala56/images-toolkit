const fs = require('fs')
const faqFilesPath = './faqfiles'
const dataFile = './_data/feature'
let langFolders = fs.readdirSync(faqFilesPath)
langFolders.map((lang) => {
  let featureFiles = fs.readdirSync(`${faqFilesPath}/${lang}`)
  featureFiles.map((file) => {
    if (file !== 'svg-resizer.json' && file !== 'multiImage-resizer.json') {
      console.log(file)
      let fileContent = fs.readFileSync(`${faqFilesPath}/${lang}/${file}`)
      fileContent = JSON.parse(fileContent)

      let dataFileContent = fs.readFileSync(`${dataFile}/${lang}/${file}`)
      dataFileContent = JSON.parse(dataFileContent)
      dataFileContent.FAQ = fileContent.FAQ
      console.log(dataFileContent)

      fs.writeFileSync(
        `${dataFile}/${lang}/${file}`,
        JSON.stringify(dataFileContent)
      )
    }
  })
})
