const getScript = document.currentScript
const pageTool = getScript.dataset.tool
const lang = getScript.dataset.lang
var container = document.querySelector('.container2')
var inputbox = document.querySelector('#inputbox')
var file = document.querySelector('#file')
var box = document.querySelector('.box')
var boxContainer = document.querySelector('.container2')
const gdrive = document.querySelector('#filepicker')
const compressImageBtn = document.querySelector('#compress-img-btn')
const compressValue = document.querySelector('#compress-value')
const valueType = document.querySelector('#value-type')
const optionsBox = document.querySelector('#options-box')
let alertWarning = document.querySelector('#show-warning')
let alertBox = document.querySelector('#alert-box')
const MIME_TYPE = 'image/jpeg'
let QUALITY = 0 //0-1
var first = true
var second = false
var third = true
var forth = false
var fifth = false
let m = 0
let size = getScript.dataset.size
const getFile = (file) => {
  onFileChange(file)
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
  onFileChange(file)
}
const dropbox = document.getElementById('dropbox')
dropbox.addEventListener(
  'click',
  async (getDropBoxFile, showLoader, closeLoader) => {
    const getFile = chooseFromDropbox()
  }
)

var input
container.ondragover = function (e) {
  e.preventDefault()
}
boxContainer.ondrop = (e) => {
  e.preventDefault()
  onFileDrop(e.dataTransfer.files[0])
}

const onFileDrop = (file, flag = 0) => {
  input = file
  var extension = input.name.replace(/^.*\./, '')
  if (
    extension == 'webp' ||
    extension == 'jpg' ||
    extension == 'jpeg' ||
    extension == 'png'
  ) {
    if (flag == 0) {
      showLoader()
    }

    inputbox.style.display = 'none'
    container.style.height = '300px'
    compressImage()
  } else {
    container.style.height = '350px'
    document.querySelector('#error').style.visibility = 'visible'

    document.querySelector('#error').style.visibility = 'visible'
    document.querySelector('#error').innerHTML = 'File not supported'
  }
}
const fileOnChange = () => {
  showLoader()
  inputbox.style.display = 'none'
  input = file.files[0]
  optionsBox.style.display = 'flex'
  container.style.height = 'auto'
  document.querySelector('#fileName').innerHTML = input.name
  let blobURL = URL.createObjectURL(input)
  document.querySelector('#image-preview').src = blobURL
}
const onFileChange = (file) => {
  inputbox.style.display = 'none'
  input = file
  optionsBox.style.display = 'flex'
  container.style.height = 'auto'
  document.querySelector('#fileName').innerHTML = input.name
  let blobURL = URL.createObjectURL(file)
  document.querySelector('#image-preview').src = blobURL
}
const changeValue = () => {
  alertBox.style.display = 'none'
  let checkType = valueType.value
  switch (checkType) {
    case 'kb':
      size = compressValue.value
      break
    case 'mb':
      size = compressValue.value * 1024
      break

    default:
      break
  }
}
compressValue.addEventListener('change', changeValue)
valueType.addEventListener('change', changeValue)
compressImageBtn.addEventListener('click', () => {
  compressImage()
})
let final_blob
let countforalert = 0
let forZeroalert = false
let onValueOne = false
let pleaseWait = false

const compressImage = () => {
  $('#file').remove()
  var reader = new FileReader()
  reader.onload = function () {
    const file = input
    const blobURL = URL.createObjectURL(file)
    const img = new Image()
    img.src = blobURL

    img.onerror = () => {
      URL.revokeObjectURL(this.src)
    }

    img.onload = () => {
      URL.revokeObjectURL(this.src)
      const [newWidth, newHeight] = calculateSize(img)
      const canvas = document.createElement('canvas')
      canvas.width = newWidth
      canvas.height = newHeight
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, newWidth, newHeight)
      callback(QUALITY)

      function callback(QUALITY) {
        canvas.toBlob(
          (blob) => {
            displayInfo('Original file', file)
            displayInfo('Compressed file', blob)
            getQualityFactor(blob)
            final_blob = parseInt(blob.size) / 1024

            if (fifth == true) {
              if (forZeroalert == true) {
                console.log(size)
                alertBox.style.display = 'block'
                alertWarning.innerHTML =
                  "Sorry, we can't compress this image to " + `${size}` + 'kb'
                first = true
                second = false
                third = true
                forth = false
                fifth = false
                m = 0
                final_blob
                countforalert = 0
                forZeroalert = false
                onValueOne = false
                pleaseWait = false
                QUALITY = 0
              } else {
                optionsBox.style.display = 'none'
                document.querySelector('#upper-loader').style.display = 'none'
                document.querySelector('#loaderDiv').style.display = 'none'
                document.querySelector('#loader-box').style.display = 'none'
                document.querySelector('.container2').style.background = 'white'
                document.querySelector('.container2').style.height = 'auto'
                document.querySelector('.container2').style.background = 'none'
                document.querySelector('.box').style.background = '#41B8FE'
                document.querySelector('.thankyouBox').style.display = 'block'
                document.querySelector('.thankyouBox').innerHTML =
                  '<div class="row"> <div class="col col-md-12 col-sm-12 col-lg-12 col-xl-12"> <img src="/trust.svg" alt="" id="thankyouImage" /> <p id="thankyouText">Thanks for your patience</p><p id = "newFileSize">New file size : </p><p id = "zeroAlert"></p><a class="btn" id="downloadButton">DOWNLOAD</a> </div> </div>'
                if (
                  Math.round((final_blob + Number.EPSILON) * 100) / 100 >
                  1024
                ) {
                  let temp =
                    Math.round((final_blob + Number.EPSILON) * 100) / 100 / 1024
                  temp = Math.round((temp + Number.EPSILON) * 100) / 100
                  document.querySelector('#newFileSize').innerHTML =
                    'New file size: ' + temp + 'mb'
                } else {
                  document.querySelector('#newFileSize').innerHTML =
                    'New file size: ' +
                    Math.round((final_blob + Number.EPSILON) * 100) / 100 +
                    'kb'
                }

                if (
                  Math.round((final_blob + Number.EPSILON) * 100) / 100 >
                    size &&
                  countforalert == 2
                ) {
                }
                document.getElementById('downloadButton').onclick =
                  function () {
                    var reader2 = new FileReader()
                    reader2.onload = function () {
                      var url = window.URL.createObjectURL(blob)
                      var a = document.createElement('a')
                      a.href = url
                      a.download = 'compressed-img' + input.name
                      document.body.appendChild(a)
                      a.click()
                      if (lang === 'en') {
                        window.location.href = `/download?tool=${pageTool}`
                      } else {
                        window.location.href = `/${lang}/download?tool=${pageTool}`
                      }
                    }
                    reader2.readAsDataURL(blob)
                  }
              }
            }
          },
          MIME_TYPE,
          QUALITY
        )
      }

      const getQualityFactor = (blob) => {
        if (m == 0 && blob.size / 1024 > size) {
          first = false
          third = false
          fifth = true
          forZeroalert = true
        }
        if (m <= 1) {
          if (first == true) {
            if (blob.size / 1024 < size) {
              m = m + 0.1
              m = Math.round((m + Number.EPSILON) * 100) / 100
              callback(m)
            } else {
              m = m - 0.1
              first = false
            }
          }
          if (second == true) {
            if (blob.size / 1024 < size) {
              m = m + 0.01
              m = Math.round((m + Number.EPSILON) * 100) / 100
              callback(m)
            } else {
              m = m - 0.01
              second = false
              third = false
              m = Math.round((m + Number.EPSILON) * 100) / 100
              fifth = true
              callback(m)
              forth = true
            }
          }
          if (third == true) {
            if (second == false && first == false) {
              second = true
              m = Math.round((m + Number.EPSILON) * 100) / 100
              callback(m)
            }
          }
          if (forth == true) {
            countforalert++
          }
          if (m == 1 && blob.size / 1024 < size) {
            alertBox.style.display = 'block'
            alertWarning.innerHTML = 'Sorry, choose different image'
            onValueOne = true
            first = true
            second = false
            third = true
            forth = false
            fifth = false
            m = 0
            final_blob
            countforalert = 0
            forZeroalert = false
            onValueOne = false
            pleaseWait = false
            QUALITY = 0
          }
        }
      }
    }
  }
  reader.readAsDataURL(input)
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

const calculateSize = (img, maxWidth, maxHeight) => {
  let width = img.width
  let height = img.height
  if (width > height) {
    if (width > maxWidth) {
      height = Math.round((height * maxWidth) / width)
      width = maxWidth
    }
  } else {
    if (height > maxHeight) {
      width = Math.round((width * maxHeight) / height)
      height = maxHeight
    }
  }
  return [width, height]
}

const displayInfo = (label, input) => {
  const p = document.createElement('p')
  p.innerText = `${label} - ${readableBytes(file.size)}`
}

const readableBytes = (bytes) => {
  const i = Math.floor(Math.log(bytes) / Math.log(1024)),
    sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i]
}
