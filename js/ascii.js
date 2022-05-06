const getScript = document.currentScript
const pageTool = getScript.dataset.tool
const lang = getScript.dataset.lang
var file_name
var container = document.querySelector('.container2')
var inputbox = document.querySelector('#inputbox')
var content = document.querySelector('#content')
var file = document.querySelector('#file')
var box = document.querySelector('.box')
var boxContainer = document.querySelector('.container2')
const gdrive = document.querySelector('#filepicker')

document.getElementById('Showloader').style.display = 'none'
document.getElementById('modalContainer').style.display = 'none'

let preview_width

var mq = window.matchMedia('(max-width: 900px)')
if (mq.matches) {
  preview_width = 300
} else {
  preview_width = 800
}

// let input;

let org_height
let org_width
let new_height

const getFile = (file) => {
  onFileDrop(file, 0)
}
const showLoader = () => {
  document.querySelector('#inputbox').style.display = 'none'
  // var loaderbox = document.createElement("div");
  // loaderbox.id = "loader-box";
  // var mainDiv = document.querySelector("#loaderDiv .col");
  // mainDiv.insertBefore(loaderbox, mainDiv.childNodes[1]);
  document.getElementById('Showloader').style.display = 'flex'
  // document.querySelector("#loader").innerHTML = '<p id="loadingMessage"></p>';
  // document.querySelector("#loadingMessage").innerHTML =
  //   "Please Wait ,Loading Your file ";
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
  onFileDrop(file, 0)
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
var input
container.ondragover = function (e) {
  e.preventDefault()
}
const element = document.getElementById('image-compare')

const viewer = new ImageCompare(element).mount()

const onFileDrop = (file, flag = 1) => {
  input = file
  var extension = input.name.replace(/^.*\./, '')
  if (
    extension == 'webp' ||
    extension == 'jpg' ||
    extension == 'jpeg' ||
    extension == 'png'
  ) {
    if (flag == 0) {
    }
    if (flag == 1) {
      showLoader()
    }
    file_name = input.name
    inputbox.style.display = 'none'
    setAscii()

    const blobURL = URL.createObjectURL(input)
    const img = new Image()
    img.src = blobURL
    img.onload = function () {
      URL.revokeObjectURL(this.src)
      org_height = img.height
      org_width = img.width

      new_height = (preview_width * org_height) / org_width
    }
  } else {
    console.log('error')
    document.querySelector('#error').style.visibility = 'visible'

    document.querySelector('#error').innerHTML = 'File format not supported'
  }
}
const fileOnChange = () => {
  showLoader()

  inputbox.style.display = 'none'
  input = file.files[0]
  file_name = input.name

  setAscii()

  console.log(input)
  // setAscii();
  const blobURL = URL.createObjectURL(input)
  const img = new Image()
  img.src = blobURL
  img.onload = function () {
    URL.revokeObjectURL(this.src)
    org_height = img.height
    org_width = img.width
    new_height = (preview_width * org_height) / org_width
    document.getElementById('fontLoader').style.display = `none`
  }
}

let font_ = 0

const font1 = () => {
  font_ = 0
  setAscii()
  fontFlag = true
}
const font2 = () => {
  font_ = 1
  setAscii()
  document.getElementById('fontLoader').style.display = `flex`
  fontFlag = true
}
const font3 = () => {
  font_ = 2
  setAscii()
  fontFlag = true
}

const next = () => {
  var a = document.createElement('a')
  a.href = url2
  a.download = 'Safeimagekit-' + file_name
  document.body.appendChild(a)
  a.click()
  if (lang === 'en') {
    window.location.href = `/download?tool=${pageTool}`
  } else {
    window.location.href = `/${lang}/download?tool=${tool}`
  }
}

const changeWidth = (val) => {
  let temp = parseInt(val)
  document.getElementById('bottom').style.width = `${temp}%`
}

var url2

let fontFlag = false

function setAscii() {
  var reader = new FileReader()
  reader.readAsDataURL(input)
  reader.onload = function () {
    document.getElementById('preview').src = reader.result
    let ele = new imgToAscii(reader.result, 0.3, `${font_}`)
    ele.display()
    var pre = document.querySelector('pre')
    var observer = new MutationObserver(function (hello) {
      hello.forEach(function (hello) {
        html2canvas(pre, {
          onrendered: function (canvas) {
            var url = canvas.toDataURL()
            var image = new Image()
            image.src = url
            document.getElementById('art').src = url
            document.getElementById('actualArt').appendChild(pre)
            image.onload = function () {
              var canvas = document.createElement('canvas')
              var ctx = canvas.getContext('2d')
              canvas.width = image.width
              canvas.height = image.height
              ctx.fillStyle = 'white'
              ctx.fillRect(0, 0, canvas.width, canvas.height)
              ctx.drawImage(image, 0, 0)
              url2 = canvas.toDataURL()
              if (fontFlag == true) {
                document.getElementById('fontLoader').style.display = `none`
              }
              document.querySelector('.container2').style.height = 'auto'
              document.querySelector('.workspace-area').style.display = 'block'
              document.getElementById('Showloader').style.display = 'none'
              document.getElementById('modalContainer').style.display = 'block'
              document.querySelector('#content').style.display = 'none'
              document.querySelector('#upper-loader').style.display = 'none'
              document.querySelector('.box-border').style.display = 'none'
              document.querySelector('.box').style.background = 'white'
              document.getElementById('demo').style.display = 'none'
              document.getElementById('downloadButton').onclick = function () {
                var a = document.createElement('a')
                a.href = url2
                a.download = 'Safeimagekit-' + file_name
                document.body.appendChild(a)
                a.click()
                if (lang === 'en') {
                  window.location.href = `/download?tool=${pageTool}`
                } else {
                  window.location.href = `/${lang}/download?tool=${tool}`
                }
              }
            }
          },
        })
        // }
      })
    })

    observer.observe(pre, {
      childList: true,
      characterData: this,
    })
  }
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
