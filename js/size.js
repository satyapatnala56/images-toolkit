$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
const getScript = document.currentScript
const pageTool = getScript.dataset.tool
const lang = getScript.dataset.lang
var container = document.querySelector('.container2')
var inputbox = document.querySelector('#inputbox')
var content = document.querySelector('#content')
var file = document.querySelector('#file')
var box = document.querySelector('.box')
var rotate = document.querySelector('#rotate_input') || 0
var rotate_value_range = document.querySelector('#rotate_value_range') || 0
let dimensionsDiv = document.querySelector('#dimensions_div')
const perc = document.querySelector('#perc')
let type = 'stretch'
let imageOriginalHeight = null
let imageOriginalWidth = null
let fixedImageHeight = null
let fixedImageWidth = null
let aspectRatio = null
let image = null
let imageDataUrl = null
let lockedAspectRadio = true
let imageHeightDiffValue = 0
let imageWidthDiffValue = 0
var file_name = ''
let color = document.querySelector('#color')
let fixedTab = document.querySelector('#fixed-tab')
let strechyTab = document.querySelector('#strechy-tab')
const imageHeightInputBox = document.querySelector('#img_height')
const imageWidthInputBox = document.querySelector('#img_width')
let strechRangeInput = document.querySelector('#strech-range')
let aspectRadioElement = document.querySelector('#aspect-radio')
let url = null
color.addEventListener('input', () => {
  drawFixedImage(imageHeightDiffValue, imageWidthDiffValue, 0, 0)
})
strechRangeInput.addEventListener('change', (e) => {
  perc.innerHTML = `${e.target.value}%`
  let imageHeight = Math.round(
    (imageOriginalHeight * Number(e.target.value)) / 100
  )
  let imageWidth = Math.round(
    (imageOriginalWidth * Number(e.target.value)) / 100
  )
  imageWidthInputBox.value = imageWidth
  imageHeightInputBox.value = imageHeight
  renderResizedImage(imageHeight, imageWidth)
})
fixedTab.addEventListener('click', () => {
  type = 'fixed'
  dimensionsDiv.style.display = 'none'
  aspectRadioElement.dataset.originalTitle = 'Lock aspect'
  lockedAspectRadio = false
  aspectRadioElement.className = 'fas fa-unlock'
})
strechyTab.addEventListener('click', () => {
  type = 'stretch'
  dimensionsDiv.style.display = 'block'
})
let changeConfig = document.getElementsByClassName('change-config')
Array.from(changeConfig).map((i) => {
  i.addEventListener('change', (e) => {
    if (e.target.value < 0) {
      e.target.id = 'img_height' ? (e.target.value = 1) : (e.target.value = 1)
    }
    if (type === 'stretch') {
      if (lockedAspectRadio) {
        if (e.target.id === 'img_height') {
          imageWidthInputBox.value = Math.round(
            imageHeightInputBox.value * aspectRatio
          )
          renderResizedImage(
            imageHeightInputBox.value,
            Math.round(imageHeightInputBox.value * aspectRatio)
          )
        } else {
          imageHeightInputBox.value = Math.round(
            imageWidthInputBox.value / aspectRatio
          )
          renderResizedImage(
            Math.round(imageWidthInputBox.value / aspectRatio),
            imageWidthInputBox.value
          )
        }
      } else {
        renderResizedImage(imageHeightInputBox.value, imageWidthInputBox.value)
      }
    } else {
      if (lockedAspectRadio) {
        if (e.target.id === 'img_height') {
          imageWidthInputBox.value = Math.round(
            imageHeightInputBox.value * aspectRatio
          )
        } else {
          imageHeightInputBox.value = Math.round(
            imageWidthInputBox.value / aspectRatio
          )
        }
        fixedImageHeight = imageHeightInputBox.value
        fixedImageWidth = imageWidthInputBox.value
        drawFixedImage(
          0,
          0,
          imageHeightInputBox.value,
          imageWidthInputBox.value
        )
      } else {
        let imageHeightInputBoxValue = Number(imageHeightInputBox.value)
        let imageWidthInputBoxValue = Number(imageWidthInputBox.value)
        let findAspectWidth = Math.round(
          Number(imageWidthInputBox.value) * aspectRatio
        )
        let findAspectHeight = Math.round(
          Number(imageWidthInputBox.value) / aspectRatio
        )
        if ((e.id = 'img_height')) {
          if (findAspectHeight <= imageHeightInputBoxValue) {
            drawFixedImage(
              Math.round(
                (imageHeightInputBoxValue -
                  Math.round(Number(imageWidthInputBoxValue) / aspectRatio)) /
                  2
              ),
              0,
              imageHeightInputBoxValue,
              imageWidthInputBoxValue
            )
            fixedImageWidth = imageWidthInputBoxValue
            fixedImageHeight = Math.round(
              Number(imageWidthInputBoxValue) / aspectRatio
            )
          }
          if (findAspectHeight > imageHeightInputBoxValue) {
            drawFixedImage(
              0,
              Math.round(
                (imageWidthInputBoxValue -
                  Number(imageHeightInputBoxValue) * aspectRatio) /
                  2
              ),
              imageHeightInputBoxValue,
              Number(imageHeightInputBoxValue) * aspectRatio
            )
            fixedImageHeight = imageHeightInputBoxValue
            fixedImageWidth = Number(imageHeightInputBoxValue) * aspectRatio
          }
        } else {
          if (findAspectWidth <= imageWidthInputBoxValue) {
            drawFixedImage(
              0,
              Math.round(
                (imageHeightInputBoxValue -
                  Math.round(Number(imageWidthInputBoxValue) * aspectRatio)) /
                  2
              ),
              imageHeightInputBoxValue,
              imageWidthInputBoxValue
            )
            fixedImageWidth = Math.round(
              Number(imageWidthInputBoxValue) * aspectRatio
            )
            fixedImageHeight = imageWidthInputBoxValue
          }
          if (findAspectWidth > imageWidthInputBoxValue) {
            drawFixedImage(
              0,
              Math.round(
                (imageHeightInputBoxValue -
                  Number(imageWidthInputBoxValue) / aspectRatio) /
                  2
              ),
              imageHeightInputBoxValue,
              Number(imageHeightInputBoxValue) * aspectRatio
            )
            fixedImageHeight = Number(imageHeightInputBoxValue) / aspectRatio
            fixedImageWidth = imageWidthInputBoxValue
          }
        }
      }
    }
  })
})
aspectRadioElement.addEventListener('click', (e) => {
  lockedAspectRadio = lockedAspectRadio ? false : true
  lockedAspectRadio
    ? (e.target.dataset.originalTitle = 'Unlock aspect')
    : (e.target.dataset.originalTitle = 'Lock aspect')
  e.target.className =
    e.target.className === 'fas fa-lock' ? 'fas fa-unlock' : 'fas fa-lock'
})
const renderResizedImage = (height, width) => {
  image.onload = function () {
    let canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')
    canvas.height = height
    canvas.width = width
    ctx.drawImage(image, 0, 0, width, height)
    document.querySelector('#output_div_inner img').src = canvas.toDataURL()
    url = canvas.toDataURL()
  }
  image.src = imageDataUrl
}
const drawFixedImage = (heightDiff, WidthDiff, imageHeight, imageWidth) => {
  image.onload = function () {
    image.height = fixedImageHeight
    image.width = fixedImageWidth
    imageHeightDiffValue = heightDiff
    imageWidthDiffValue = WidthDiff
    let canvas = document.createElement('canvas')
    canvas.width = Number(imageWidthInputBox.value)
    canvas.height = Number(imageHeightInputBox.value)
    let ctx = canvas.getContext('2d')
    ctx.fillStyle = color.value
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(image, WidthDiff, heightDiff, image.width, image.height)
    document.querySelector('#output_div_inner img').src = canvas.toDataURL()
    url = canvas.toDataURL()
  }
  image.src = imageDataUrl
}
var input
container.ondragover = function (e) {
  e.preventDefault()
}
var boxContainer = document.querySelector('.container2')
const gdrive = document.querySelector('#filepicker')
const getFile = (file) => {
  onFileDrop(file, 1)
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
  onFileDrop(file, 1)
}
const dropbox = document.getElementById('dropbox')
dropbox.addEventListener(
  'click',
  async (getDropBoxFile, showLoader, closeLoader) => {
    const getFile = chooseFromDropbox()
  }
)
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
    convert_webp()
  } else {
    container.style.height = '350px'
    document.querySelector('#error').style.visibility = 'visible'

    document.querySelector('#error').style.visibility = 'visible'
    document.querySelector('#error').innerHTML = 'File not supported'
  }
}
const fileOnChange = () => {
  showLoader()

  input = file.files[0]
  container.style.height = '300px'
  convert_webp()
}
function convert_webp() {
  document.querySelector('.success_alert').style.visibility = 'hidden'
  $('#file').remove()
  setTimeout(function () {
    webp_to_img()
  }, 6000)
  var count = 0
  var ans = setInterval(function () {
    count = count + 10
    document.querySelector('#upper-loader').style.width = count + '%'
    if (count == 110) {
      document.querySelector('#upper-loader').style.display = 'none'
      document.querySelector('#loaderDiv').style.display = 'none'
      document.querySelector('#content').style.visibility = 'visible'
      document.querySelector('#loader-box').style.display = 'none'
      document.querySelector('.container2').style.height = 'auto'
      document.querySelector('#footer_div').style.paddingTop = '30px'
      document.querySelector('.container2').style.background = '#fff'
      document.querySelector('.box').style.borderRadius = '20px'
      document.querySelector('.container2').style.borderRadius = '25px'
      document.querySelector('.box').style.background = '#ffffff'
      document.querySelector('.box-border').style.background = '#ffffff'
      document.querySelector('.box-border').style.border = 'none'
      window.location.href = '#'
      clearInterval(ans)
    }
  }, 600)
  function webp_to_img() {
    document.querySelector('.success_alert').style.visibility = 'hidden'
    var r = new FileReader()
    r.onload = function () {
      var img = new Image()
      image = img

      img.onload = function () {
        imageOriginalHeight = img.height
        imageOriginalWidth = img.width
        imageHeightInputBox.value = imageOriginalHeight
        imageWidthInputBox.value = imageOriginalWidth
        fixedImageHeight = imageOriginalHeight
        fixedImageWidth = imageOriginalWidth
        aspectRatio = imageOriginalWidth / imageOriginalHeight
        document.querySelector('#output_div_inner img').src = r.result
        var dimension_btn = document.querySelectorAll('.dimension_btn')
        for (let m = 0; m < dimension_btn.length; m++) {
          dimension_btn[m].onclick = function () {
            var button_id = dimension_btn[m].id
            var button_arr = button_id.split('X')
            var button_width = button_arr[0]
            var button_height = button_arr[1]

            document.querySelector('#resize_height input').value = button_height
            document.querySelector('#resize_width input').value = button_width

            initial_conversion('Loading preview...', 'Preview loaded', 0)
          }
        }

        document.querySelector('#save').onclick = function () {
          image_saving()
        }
        function initial_conversion(message1, message2, value) {
          file_name = input.name.match(/^.*\./)
          var height =
            document.querySelector('#resize_height input').value || img.height
          var quality =
            document.querySelector('#resize_quality select').value || 1
          var width =
            document.querySelector('#resize_width input').value || img.width

          var mimetype = document.querySelector('#save_as select').value
          new Compressor(input, {
            quality: parseInt(quality),
            success(final_blob) {
              var final_url = window.URL.createObjectURL(final_blob)
              var image = new Image(width, height)
              image.onload = function () {
                var naturalheight = image.height
                var naturalwidth = image.width

                converting_process(
                  message1,
                  message2,
                  value,
                  image,
                  height,
                  width,
                  mimetype,
                  quality,
                  file_name,
                  naturalwidth,
                  naturalheight
                )
              }
              image.src = final_url
            },
          })
        }

        function converting_process(
          message1,
          message2,
          value,
          image,
          height,
          width,
          mimetype,
          quality,
          file_name,
          naturalwidth,
          naturalheight
        ) {
          window.location.href = '#'

          document.querySelector('.success_alert').style.visibility = 'visible'
          document.querySelector('.success_alert').style.borderColor = '#b6d4fe'
          document.querySelector('.success_alert').style.color = '#084298'
          document.querySelector('.success_alert').style.background = '#cfe2ff'
          document.querySelector('.success_alert').innerHTML = message1

          var canvas = document.createElement('canvas')
          var ctx = canvas.getContext('2d')
          canvas.height = naturalheight
          canvas.width = naturalwidth
          ctx.drawImage(image, 0, 0, width, height)
          document.querySelector('#output_div_inner img').src =
            canvas.toDataURL()
          url = canvas.toDataURL()
          document.querySelector('#output_div_inner img').onload = function () {
            document.querySelector('.success_alert').style.borderColor =
              '#badbcc'
            document.querySelector('.success_alert').style.color = '#0f5132'
            document.querySelector('.success_alert').style.background =
              '#d1e7dd'
            document.querySelector('.success_alert').innerHTML = message2
            if (message2 == '') {
              document.querySelector('.success_alert').style.visibility =
                'hidden'
            } else {
              setTimeout(function () {
                document.querySelector('.success_alert').style.visibility =
                  'hidden'
              }, 2000)
            }
          }
        }
      }
      img.src = r.result
      imageDataUrl = r.result
    }
    r.readAsDataURL(input)
  }
}
document.querySelector('#Inputbox').onclick = function () {
  document.querySelector('#file').click()
}

var inputs = document.querySelectorAll('#height_input,#width_input,#mimetype')

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
function image_saving() {
  let fileExtension = document.querySelector('.custom-select').value
  var a = document.createElement('a')
  a.href = url
  a.download = 'Safeimagekit-' + file_name + fileExtension
  a.click()
  setTimeout(() => {
    if (lang === 'en') {
      window.location.href = `/download?tool=${pageTool}`
    } else {
      window.location.href = `/${lang}/download?tool=${pageTool}`
    }
  }, 200)
}
