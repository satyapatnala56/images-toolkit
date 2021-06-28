///drag and drop n option
const getScript = document.currentScript
const pageTool = getScript.dataset.tool
const lang = getScript.dataset.lang
var container = document.querySelector('.container2')
var inputbox = document.querySelector('#inputbox')
var content = document.querySelector('#content')
var file = document.querySelector('#file')
var box = document.querySelector('.box')
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
    splitImage()
  } else {
    console.log('error')
    document.querySelector('.container2').style.height = '350px'
    document.querySelector('#error').innerHTML = 'File format not supported'
  }
}
const fileOnChange = () => {
  showLoader()
  input = file.files[0]
  splitImage()
}

function splitImage() {
  var count = 0
  var ans = setInterval(function () {
    count = count + 10
    document.querySelector('#upper-loader').style.width = count + '%'
    if (count == 110) {
      document.querySelector('#upper-loader').style.display = 'none'
      document.querySelector('#loaderDiv').style.display = 'none'
      document.querySelector('#content').style.visibility = 'visible'
      document.querySelector('#loader-box').style.display = 'none'
      document.querySelector('.box').style.background = '#353535'
      document.querySelector('.container2').style.height = 'auto'

      clearInterval(ans)
    }
  }, 1000)

  ////
  var reader = new FileReader()

  reader.onload = function (evt) {
    var image = new Image()
    image.onload = function () {
      $('#file').remove()

      var numRowsToCut = 2
      var numColsToCut = 3

      var imagePieces = []
      var c = document.createElement('canvas')
      var ctx = c.getContext('2d')
      c.width = image.width
      c.height = image.height
      ctx.drawImage(image, 0, 0)

      document.querySelector('#splitList').appendChild(c)

      document.querySelector('#submit').onclick = function () {
        document.querySelector('#splitDiv span').innerHTML =
          '<br><a id="downloadAll" class="btn btn-danger splitBtn">Save All</a>'
        // document.querySelector(".splitDimensions").style.display = "none";

        var rows = document.querySelector('#ROWS').value || 2
        var cols = document.querySelector('#COLS').value || 2

        ////err message

        numRowsToCut = rows
        numColsToCut = cols

        for (var x = 0; x < numRowsToCut; ++x) {
          for (var y = 0; y < numColsToCut; ++y) {
            var canvas = document.createElement('canvas')
            var context = canvas.getContext('2d')
            canvas.width = image.width / rows
            canvas.height = image.height / cols
            context.drawImage(
              image,
              x * canvas.width,
              y * canvas.height,
              canvas.width,
              canvas.height,
              0,
              0,
              canvas.width,
              canvas.height
            )
            imagePieces.push(canvas.toDataURL())
          }
        }
        $('#splitList canvas').remove()
        $('#process').remove()
        var ol = document.createElement('ol')
        document.querySelector('#splitList').appendChild(ol)

        document.querySelector('#splitList').style.height = '250px'
        document.querySelector('#splitList').style.border = '3px solid white'

        document.querySelector('#splitList').style.marginTop = '50px'

        document.querySelector('#splitList ol').style.marginTop = '30px'

        for (let i = 0; i < imagePieces.length; i++) {
          var img = document.createElement('img')
          img.src = imagePieces[i]
          img.id = i
          img.style.margin = '10px'
          var li = document.createElement('li')
          li.innerHTML =
            '<a href=' +
            imagePieces[i] +
            ' download=' +
            i +
            1 +
            '>Section' +
            (i + 1) +
            '.png' +
            '</a>'
          document.querySelector('#splitList ol').appendChild(li)
        }

        document.querySelector('#downloadAll').onclick = function () {
          for (let i = 0; i < imagePieces.length; i++) {
            var a = document.createElement('a')
            a.href = imagePieces[i]
            a.download = i + 1 + '.png'
            a.click()
            if (lang === 'en') {
              window.location.href = `/download?tool=${pageTool}`
            } else {
              window.location.href = `/${lang}/download?tool=${pageTool}`
            }
          }
        }
      }
      console.log(reader.result)
      /////
    }
    image.src = evt.target.result
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
