const getScript = document.currentScript
const pageTool = getScript.dataset.tool
const lang = getScript.dataset.lang
var container = document.querySelector('.container2')
var inputbox = document.querySelector('#inputbox')
var content = document.querySelector('#content')
var file = document.querySelector('#file')
var boxContainer = document.querySelector('.container2')
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
boxContainer.ondrop = (e) => {
  e.preventDefault()
  showLoader()
  onFileDrop(e.dataTransfer.files[0])
}
var input
container.ondragover = function (e) {
  e.preventDefault()
}
const onFileDrop = (file) => {
  input = file
  input = e.dataTransfer.files[0]
  var extension = input.name.replace(/^.*\./, '')
  if (
    extension == 'webp' ||
    extension == 'jpg' ||
    extension == 'jpeg' ||
    extension == 'png' ||
    extension == 'svg'
  ) {
    inputbox.style.display = 'none'
    image_to_pixel_art()
  } else {
    console.log('error')
    document.querySelector('.container2').style.height = '350px'
    document.querySelector('#error').innerHTML = 'File format not supported'
  }
}
const fileOnChange = () => {
  showLoader()
  input = file.files[0]
  image_to_pixel_art()
}
////drag and drop ended
function image_to_pixel_art() {
  $('#file').remove()
  var count = 0
  var ans = setInterval(function () {
    count = count + 10
    console.log(count)
    document.querySelector('#upper-loader').style.width = count + '%'
    if (count == 110) {
      document.querySelector('.container2').style.height = 'auto'
      document.querySelector('#upper-loader').style.display = 'none'
      document.querySelector('#loaderDiv').style.display = 'none'
      document.querySelector('#loader-box').style.display = 'none'
      document.querySelector('#content').style.visibility = 'visible'
      document.querySelector('.box').style.background = '#353535'

      clearInterval(ans)
    }
  }, 300)
  ////loader end
  var reader = new FileReader()
  reader.onload = function () {
    var img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = function () {
      document.querySelector('#original_image img').src = img.src
      var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d')
      var w,
        h,
        sample_size = 7
      w = img.width
      h = img.height
      canvas.height = img.height
      canvas.width = img.width
      ctx.drawImage(img, 0, 0)

      var pt = ctx.getImageData(0, 0, w, h).data
      for (let y = 0; y < h; y += sample_size) {
        for (let x = 0; x < w; x += sample_size) {
          let p = (x + y * w) * 4
          ctx.fillStyle =
            'rgba(' +
            pt[p] +
            ',' +
            pt[p + 1] +
            ',' +
            pt[p + 2] +
            ',' +
            pt[p + 3] +
            ')'
          ctx.fillRect(x, y, sample_size, sample_size)
        }
      }

      var url = canvas.toDataURL()
      document.querySelector('#pixelated_image img').src = url
      document.querySelector('#pixelated_image').style.height = 'auto'

      document.querySelector('#save').onclick = function () {
        document.querySelector('.box').style.background = '#cc66ff'

        window.location.href = '#'
        document.querySelector('#content').style.display = 'none'
        document.querySelector('.thankyouBox').innerHTML =
          ' <div class="row"> <div class="col col-md-12 col-sm-12 col-lg-12 col-xl-12"> <img src="/trust.svg" alt="" id="thankyouImage" /> <p id="thankyouText">Thanks for your patience</p> <a class="btn" id="downloadButton">DOWNLOAD</a> </div> </div>'
        document.querySelector('.container2').style.height = '300px'
        document.querySelector('#downloadButton').onclick = function () {
          var a = document.createElement('a')
          a.href = url
          a.download = 'download'
          document.body.appendChild(a)
          a.click()
          if (lang === 'en') {
            window.location.href = `/download?tool=${pageTool}`
          } else {
            window.location.href = `/${lang}/download?tool=${pageTool}`
          }
        }
      }
    }
    img.src = reader.result
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
