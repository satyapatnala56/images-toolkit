///drag and drop n option
const getScript = document.currentScript
const pageTool = getScript.dataset.tool
const lang = getScript.dataset.lang
let resizer = new pica()
let fileName = ''
var _URL = window.URL || window.webkitURL

//Decision variable change this to change feature
let windowURL = window.location.href
windowURL = windowURL.slice(windowURL.lastIndexOf('/')).split('-')[2]
let currentURL = windowURL[0].toUpperCase() + windowURL.slice(1)
console.log(currentURL)

if (windowURL == 'google') currentURL = 'Google Banner Ads'

function LightenDarkenColor(col, amt) {
  if (col == '9999ff') return '#8a8ae4'
  if (col == '8c44f7') return `#9b58ff`
  var num = parseInt(col, 16)
  var r = (num >> 16) + amt
  var b = ((num >> 8) & 0x00ff) + amt
  var g = (num & 0x0000ff) + amt
  var newColor = g | (b << 8) | (r << 16)
  return '#' + newColor.toString(16)
}

let UIData = {
  Facebook: {
    mainColor: '#1773ea',
    fontColor: 'white',
    description: `We've taken all 12 Facebook image sizes and made them easily accessible. Use our image resizer to resize images from stories to ads, posts, cover photos and event pages.`,
    iconURL: '/img/imageResizer-assets/facebook.svg',
  },
  Instagram: {
    mainColor: '#f00075',
    fontColor: 'white',
    description: `Our image resizer is the perfect tool for businesses and IG users, making it easier to resize images into stories, vertical horizontal and square posts, video thumbnails and more with no effort at all.`,
    iconURL: '/img/imageResizer-assets/instagram.svg',
  },
  Youtube: {
    mainColor: '#ff0000',
    fontColor: 'white',
    description: `Find the best fit for your YouTube Banner Image. Don't let your channel graphics go unnoticed.`,
    iconURL: '/img/imageResizer-assets/youtube.svg',
  },
  Linkedin: {
    mainColor: '#0a66c2',
    fontColor: 'white',
    description: `This network of professionals is a great place for any business to show off their content. Resize your photos for LinkedIn and get your profile noticed with high quality images.`,
    iconURL: '/img/imageResizer-assets/linkdin.svg',
  },
  Email: {
    mainColor: '#D44638',
    fontColor: 'white',
    description: `The perfect email header can help you get your message across before the user even reads the first sentence. Get their attention and make sure it’s sized right with our free image resizer.`,
    iconURL: '/img/imageResizer-assets/gmail.svg',
  },
  Tiktok: {
    mainColor: '#000000',
    fontColor: 'white',
    description: `TikTok video dimensions are super precise at 1080x1920 and the max file size is 287.6 MB - size it right with our easy steps above.`,
    iconURL: '/img/imageResizer-assets/tiktok.svg',
  },
  Twitter: {
    mainColor: '#1da1f2',
    fontColor: 'white',
    description: `Whether you're creating a header or profile image - the perfect image size is a must to get the best quality visual. Our image resizer has you covered for all 11 Twitter dimensions in one easy click.`,
    iconURL: '/img/imageResizer-assets/twitter.svg',
  },
  Pinterest: {
    mainColor: '#bd081c',
    fontColor: 'white',
    description: `Pins, thumbnails, board covers...use this image resizer to create an aesthetically pleasing board with all your favorite pins.`,
    iconURL: '/img/imageResizer-assets/pinterest.svg',
  },
  Snapchat: {
    mainColor: '#9999ff',
    fontColor: 'white',
    description: `Snapchat images have one universal dimension - 1080 x 1920. Use our free online collage maker to make your image more interesting before resizing it with our image resizer.`,
    iconURL: '/img/imageResizer-assets/snapchat.svg',
  },
  'Google Banner Ads': {
    mainColor: '#ea4335',
    fontColor: 'white',
    description: `When creating ads for your business, ease is the best route. All 22 dimensions for Google Display Network banners can be created here, using Promo.com’s pic resizer.`,
    iconURL: '/img/imageResizer-assets/google.svg',
  },
  Discord: {
    mainColor: '#535fee',
    fontColor: 'white',
    description: `Resize your images now for various discord uploads.`,
    iconURL: '/img/imageResizer-assets/discord.svg',
  },
  Soundcloud: {
    mainColor: '#f77b00',
    fontColor: 'white',
    description: `Resize your images now for various soundcloud uploads.`,
    iconURL: '/img/imageResizer-assets/soundcloud.svg',
  },
  Whatsapp: {
    mainColor: '#17980e',
    fontColor: 'white',
    description: `Resize your images now for various whatsapp uploads.`,
    iconURL: '/img/imageResizer-assets/whatsapp.svg',
  },
  Twitch: {
    mainColor: '#8c44f7',
    fontColor: 'white',
    description: `Resize your images now for various twitch uploads.`,
    iconURL: '/img/imageResizer-assets/twitch.svg',
  },
  Squarespace: {
    mainColor: '#8c44f7',
    fontColor: 'white',
    description: `Resize your images now for various twitch uploads.`,
    iconURL: '/img/imageResizer-assets/squarespace.svg',
  },
  Printing: {
    mainColor: '#26d0c7',
    fontColor: 'white',
    description: `Resize your images now for various printing uploads.`,
    iconURL: '/img/imageResizer-assets/printing.svg',
  },
}

let progressBar = document.querySelector('.ProgressBar')
//UI elements rendering based on URL
let DownloadButtons = document.querySelector('.DownloadButtons')
var root = document.querySelector(':root')
root.style.setProperty('--mainUIColor', UIData[currentURL]['mainColor'])
root.style.setProperty(
  '--mainUIColorSecondary',
  LightenDarkenColor(UIData[currentURL]['mainColor'].slice(1), 10)
)

let topDiv = document.querySelector('.workspace .topDiv')
topDiv.style.background = UIData[currentURL]['mainColor']

let topDivH3 = document.querySelector('.workspace .topDiv h3')
topDivH3.innerText = currentURL
topDivH3.style.color = UIData[currentURL]['fontColor']

let topDivP = document.querySelector('.workspace .topDiv p')
topDivP.style.color = UIData[currentURL]['fontColor']
topDivP.innerText = UIData[currentURL]['description']

let topDivIcon = document.querySelector('.workspace .topDiv .socialMediaIcon')
topDivIcon.src = UIData[currentURL]['iconURL']

//

let currentData
let previews = document.querySelector('.Previews')
var imgURLrl
let landingContainer = document.querySelector('.Landing')
let workspaceContainer = document.querySelector('.workspace')
let infoContainerTopBarh4 = document.getElementById('overlayh4')
let infoContainerTopBarp = document.getElementById('overlayp')
fetch('/JS/ResizerData.json')
  .then((response) => {
    return response.json()
  })
  .then(function (data) {
    currentData = data['resizerData'][currentURL]
    console.log('------------------CURRENT DATA---------------------------')
    console.log(currentData)
  })

let OverlayImage = document.querySelector('.imgWrap img')
const gdrive = document.querySelector('#filepicker')
const getFile = (file) => {
  onFileDrop(file)
}
const showLoader = () => {
  document.querySelector('#inputbox').style.display = 'none'
  var loaderbox = document.createElement('div')
  loaderbox.id = 'loader-box'
  var mainDiv = document.querySelector('#loaderDiv .col')
  mainDiv.insertBefore(loaderbox, mainDiv.childNodes[1])
  document.querySelector('#loader').innerHTML = '<p id="loadingMessage"></p>'
  document.querySelector('#loadingMessage').innerHTML =
    'Please Wait ,Loading Your file '
}
const closeLoader = () => {}
const mimeTypes = 'image/png,image/jpg,image/jpeg,image/webp'
const filemimes = ['.png', '.webp', '.jpg', '.jpeg']
gdrive.addEventListener(
  'click',
  (getFile, mimeTypes, showLoader, closeLoader) => {
    const data = loadPicker()
  }
)
const getDropBoxFile = (file) => {
  onFileDrop(file)
}
const dropbox = document.getElementById('dropbox')
dropbox.addEventListener(
  'click',
  async (getDropBoxFile, showLoader, closeLoader) => {
    const getFile = chooseFromDropbox()
  }
)
let boxContainer = document.querySelector('#File_upload')

boxContainer.ondragover = function (e) {
  e.preventDefault()
}
boxContainer.ondrop = function (e) {
  e.preventDefault()

  onFileDrop(e.dataTransfer.files[0])
}

function onFileDrop(file) {
  document.querySelector('.alert').style.display = 'none'
  document.querySelector('.flex-container').style.display = 'none'
  var extension = file.name.replace(/^.*\./, '')
  if (
    extension == 'webp' ||
    extension == 'jpg' ||
    extension == 'jpeg' ||
    extension == 'png'
  ) {
    inputbox.style.display = 'none'
    showLoader()

    handleInput(file)
  } else {
    console.log('error')
    document.querySelector('.Container').style.height = '350px'
    document.querySelector('#error').style.color = 'red'
    document.querySelector('#error').style.background = 'none'
    document.querySelector('#error').style.visibility = 'visible'

    document.querySelector('#error').innerHTML = 'File format not supported'
  }
}
let handleInput = (file) => {
  fileName = file.name
  document.querySelector('.alert').style.display = 'none'
  document.querySelector('.flex-container').style.display = 'none'
  DownloadButtons.style.display = 'flex'
  imgURLrl = _URL.createObjectURL(file)
  OverlayImage.src = imgURLrl
  OverlayImage.onload = () => {
    showPreviews()
  }
}

let overlay = document.querySelector('.overlay')
let previousCropper = null
let canvases = {}
let hideOverlay = () => {
  overlay.style.display = 'none'
  document.body.style.overflow = 'scroll'
}

//final canvas images are in canvases
let downloadCurrentSizeButton = document.querySelector('.downloadCurrentSize')
let showCropper = (e) => {
  let key = e.target.id
  infoContainerTopBarh4.innerText = currentURL + ' ' + key
  infoContainerTopBarp.innerHTML = `Width   : ${currentData[key][0]} pixels<br>Height   : ${currentData[key][1]} pixels`
  overlay.style.display = 'flex'
  overlay.style.top = window.scrollY + 'px'
  document.body.style.overflow = 'hidden'
  downloadCurrentSizeButton.dataset['currentKey'] = key

  let options = {
    cropBoxResizable: false,
    minCropBoxWidth: 140,
    minCropBoxHeight: 140,
    aspectRatio: currentData[key][0] / currentData[key][1],
    background: false,
    responsive: true,
    cropend: () => {
      canvases[key] = previousCropper.getCroppedCanvas()
    },
  }
  if (previousCropper) {
    previousCropper.destroy()
    previousCropper = new Cropper(OverlayImage, options)
    // console.log(previousCropper.getCroppedCanvas() )
  } else {
    previousCropper = new Cropper(OverlayImage, options)
    // console.log(previousCropper.getCroppedCanvas() )
  }
}

let checkedBoxes = {}

let handleCheckboxChange = (e) => {
  console.log(e.target.dataset['forImage'])
  console.log(e.target.checked)
  if (e.target.checked == true) {
    checkedBoxes[e.target.dataset['forImage']] = e.target.checked
  } else {
    checkedBoxes = {}
  }
}

let downloadCurrentSize = (e) => {
  let key = e.dataset['currentKey']
  let canvas = previousCropper.getCroppedCanvas()
  let url = canvas.toDataURL('image/png', 1)
  let img = new Image()

  let canvasTemp = document.createElement('canvas')
  canvasTemp.width = currentData[key][0]
  canvasTemp.height = currentData[key][1]
  img.onload = async () => {
    await resizer.resize(img, canvasTemp, { quality: 3 }).then(async () => {
      await resizer.toBlob(canvasTemp).then(async (blob) => {
        saveAs(blob, `${currentURL + key}.png`)
      })
    })
  }
  img.src = url
}

let showPreviews = () => {
  landingContainer.style.display = 'none'

  for (let size in currentData) {
    let image = new Image()
    image.src = imgURLrl
    image.style.width = 300 + 'px'
    image.style.height =
      (300 * currentData[size][1]) / currentData[size][0] + 'px'
    let div = document.createElement('div')
    div.className = 'ImageWrap'
    let h4 = document.createElement('h4')
    h4.innerText = currentURL + ' ' + size
    let sizeOverlay = document.createElement('p')
    sizeOverlay.innerText = `${currentData[size][0]}x${currentData[size][1]}`
    div.appendChild(h4)
    div.appendChild(sizeOverlay)
    image.style.objectFit = 'cover'
    image.className = 'imagePreview'
    div.appendChild(image)
    let editButton = document.createElement('button')
    editButton.className = 'editButton'
    editButton.innerText = 'edit'
    editButton.addEventListener('click', (e) => showCropper(e))
    let checkBox = document.createElement('input')
    checkBox.type = 'checkbox'
    checkBox.className = 'checkBox'
    checkBox.dataset['forImage'] = size
    checkBox.addEventListener('change', handleCheckboxChange)
    editButton.id = size
    div.appendChild(editButton)
    div.appendChild(checkBox)
    previews.appendChild(div)

    // console.log(image.width,image.height)
    // console.log(size)
  }
  workspaceContainer.style.display = 'inherit'
}

let triggerDownload = () => {
  document.querySelector('.alert').style.display = 'block'
  document.querySelector('.flex-container').style.display = 'block'
  progressBar.style.display = 'none'
  document.querySelector('.Landing .Container h3').innerText =
    'thanks for your patience'
  document.querySelector('.Landing .Container .ProgressInfo img').src =
    '/img/imageResizer-assets/cheers.svg'
  zip.generateAsync({ type: 'blob' }).then(function (content) {
    saveAs(content, `${fileName}-safeimagekit.zip`)
    if (lang === 'en') {
      window.location.href = `/download?tool=${pageTool}`
    } else {
      window.location.href = `/${lang}/download?tool=${pageTool}`
    }
  })
}

let handleDownload = (e) => {
  window.scrollTo(0, 0)

  let id = e.id
  let progress = 0
  var zip = new JSZip()
  var ZipFiles = zip.folder(`${fileName}-safeimagekit`)
  total = 0
  if (id == 'download-all') {
    DownloadButtons.style.display = 'none'

    total = Object.keys(currentData).length
    for (let key in currentData) {
      if (key in canvases) {
        let canvas = canvases[key]
        let url = canvas.toDataURL('image/png', 1)
        let img = new Image()
        let canvasTemp = document.createElement('canvas')
        canvasTemp.width = currentData[key][0]
        canvasTemp.height = currentData[key][1]
        img.onload = async () => {
          await resizer
            .resize(img, canvasTemp, { quality: 3 })
            .then(async () => {
              await resizer.toBlob(canvasTemp).then(async (blob) => {
                progress += 1
                await ZipFiles.file(
                  `${currentURL + key}-safeimagekit.png`,
                  blob
                )
                progressBar.style.width = (progress / total) * 100 + '%'
                if (progress >= total) triggerDownload()
              })
            })
        }
        img.src = url
      } else {
        let img = new Image()
        let canvasTemp = document.createElement('canvas')
        canvasTemp.width = currentData[key][0]
        canvasTemp.height = currentData[key][1]
        img.onload = async () => {
          await resizer
            .resize(img, canvasTemp, { quality: 3 })
            .then(async () => {
              await resizer.toBlob(canvasTemp).then(async (blob) => {
                progress += 1
                await ZipFiles.file(
                  `${currentURL + key}-safeimagekit.png`,
                  blob
                )
                progressBar.style.width = (progress / total) * 100 + '%'
                if (progress >= total) triggerDownload()
              })
            })
        }
        img.src = imgURLrl
      }
    }
  } else {
    var err_msg = document.querySelector('.error_msg')

    total = Object.keys(checkedBoxes).length
    if (total == 0) {
      err_msg.style.visibility = 'visible'
    } else if (total === 1) {
      err_msg.style.visibility = 'hidden'

      DownloadButtons.style.display = 'none'

      for (let key in checkedBoxes) {
        if (checkedBoxes[key]) {
          if (key in canvases) {
            let canvas = canvases[key]
            let url = canvas.toDataURL('image/png', 1)
            let img = new Image()
            let canvasTemp = document.createElement('canvas')
            canvasTemp.width = currentData[key][0]
            canvasTemp.height = currentData[key][1]
            img.onload = async () => {
              await resizer
                .resize(img, canvasTemp, { quality: 3 })
                .then(async () => {
                  await resizer.toBlob(canvasTemp).then(async (blob) => {
                    progress += 1
                    progressBar.style.width = (progress / total) * 100 + '%'
                    if (progress >= total) {
                      document.querySelector('.alert').style.display = 'block'
                      document.querySelector('.flex-container').style.display =
                        'block'
                      progressBar.style.display = 'none'
                      document.querySelector(
                        '.Landing .Container h3'
                      ).innerText = 'thanks for your patience'
                      document.querySelector(
                        '.Landing .Container .ProgressInfo img'
                      ).src = '/img/imageResizer-assets/cheers.svg'
                      const url = window.URL.createObjectURL(blob)
                      const a = document.createElement('a')
                      a.style.display = 'none'
                      a.href = url
                      // the filename you want
                      a.download = `${currentURL + key}-safeimagekit.png`
                      document.body.appendChild(a)
                      a.click()
                      window.URL.revokeObjectURL(url)
                      if (lang === 'en') {
                        window.location.href = `/download?tool=${pageTool}`
                      } else {
                        window.location.href = `/${lang}/download?tool=${pageTool}`
                      }
                      if (lang === 'en') {
                        window.location.href = `/download?tool=${pageTool}`
                      } else {
                        window.location.href = `/${lang}/download?tool=${pageTool}`
                      }
                    }
                  })
                })
            }
            img.src = url
          } else {
            let img = new Image()
            let canvasTemp = document.createElement('canvas')
            canvasTemp.width = currentData[key][0]
            canvasTemp.height = currentData[key][1]
            img.onload = async () => {
              await resizer
                .resize(img, canvasTemp, { quality: 3 })
                .then(async () => {
                  await resizer.toBlob(canvasTemp).then(async (blob) => {
                    progress += 1
                    progressBar.style.width = (progress / total) * 100 + '%'
                    if (progress >= total) {
                      const url = window.URL.createObjectURL(blob)
                      const a = document.createElement('a')
                      a.style.display = 'none'
                      a.href = url
                      a.download = `${currentURL + key}-safeimagekit.png`
                      document.body.appendChild(a)
                      a.click()
                      window.URL.revokeObjectURL(url)
                      if (lang === 'en') {
                        window.location.href = `/download?tool=${pageTool}`
                      } else {
                        window.location.href = `/${lang}/download?tool=${pageTool}`
                      }
                    }
                  })
                })
            }
            img.src = imgURLrl
          }
        }
      }
      workspaceContainer.style.display = 'none'
      landingContainer.style.display = 'flex'
      document
        .querySelector('.Landing .Container')
        .classList.add('ContainerOnloading')
    } else {
      err_msg.style.visibility = 'hidden'

      DownloadButtons.style.display = 'none'

      for (let key in checkedBoxes) {
        if (checkedBoxes[key]) {
          if (key in canvases) {
            let canvas = canvases[key]
            let url = canvas.toDataURL('image/png', 1)
            let img = new Image()
            let canvasTemp = document.createElement('canvas')
            canvasTemp.width = currentData[key][0]
            canvasTemp.height = currentData[key][1]
            img.onload = async () => {
              await resizer
                .resize(img, canvasTemp, { quality: 3 })
                .then(async () => {
                  await resizer.toBlob(canvasTemp).then(async (blob) => {
                    progress += 1
                    await ZipFiles.file(
                      `${currentURL + key}-safeimagekit.png`,
                      blob
                    )
                    progressBar.style.width = (progress / total) * 100 + '%'
                    if (progress >= total) triggerDownload()
                  })
                })
            }
            img.src = url
          } else {
            let img = new Image()
            let canvasTemp = document.createElement('canvas')
            canvasTemp.width = currentData[key][0]
            canvasTemp.height = currentData[key][1]
            img.onload = async () => {
              await resizer
                .resize(img, canvasTemp, { quality: 3 })
                .then(async () => {
                  await resizer.toBlob(canvasTemp).then(async (blob) => {
                    progress += 1
                    await ZipFiles.file(
                      `${currentURL + key}-safeimagekit.png`,
                      blob
                    )
                    progressBar.style.width = (progress / total) * 100 + '%'
                    if (progress >= total) triggerDownload()
                  })
                })
            }
            img.src = imgURLrl
          }
        }
      }
      workspaceContainer.style.display = 'none'
      landingContainer.style.display = 'flex'
      document
        .querySelector('.Landing .Container')
        .classList.add('ContainerOnloading')
    }
  }

  // Object.keys(obj).length
}

document.querySelector('#Inputbox').onclick = function () {
  document.querySelector('#file').click()
}

const showDropDown = document.querySelector('.file-pick-dropdown')
const icon = document.querySelector('.arrow-sign')
const dropDown = document.querySelector('.file-picker-dropdown')
showDropDown.addEventListener('click', () => {
  addScripts()
  if (dropDown.style.display !== 'none') {
    dropDown.style.display = 'none'
    icon.classList.remove('fa-angle-up')
    icon.classList.add('fa-angle-down')
  } else {
    dropDown.style.display = 'block'
    icon.classList.remove('fa-angle-down')
    icon.classList.add('fa-angle-up')
  }
})
