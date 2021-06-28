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
var input
container.ondragover = function (e) {
  e.preventDefault()
}
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
const onFileDrop = (file) => {
  input = file
  var extension = input.name.replace(/^.*\./, '')
  if (
    extension == 'webp' ||
    extension == 'jpg' ||
    extension == 'jpeg' ||
    extension == 'png' ||
    extension == 'svg'
  ) {
    inputbox.style.display = 'none'
    rotateImg()
  } else {
    console.log('error')
    container.style.height = '350px'
    document.querySelector('#error').innerHTML = 'File format not supported'
  }
}
const fileOnChange = () => {
  showLoader()
  input = file.files[0]
  rotateImg()
}
function rotateImg() {
  /////loader starting

  $('#file').remove()
  setTimeout(function () {
    rotating_process()
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
      document.querySelector('.box').style.background = 'white'
      document.querySelector('.box-border').style.background = 'none'
      document.querySelector('.box-border').style.border = 'none'
      document.querySelector('.container2').style.height = 'auto'
      window.location.href = '#'
      clearInterval(ans)
    }
  }, 600)

  function rotating_process() {
    var r = new FileReader()
    r.onload = function () {
      document.querySelector('#result_img_div img').src = r.result
      var img = new Image()
      img.onload = function () {
        var rotate_buttons = document.querySelectorAll('.rotate_buttons')
        for (let i = 0; i < rotate_buttons.length; i++) {
          rotate_buttons[i].onclick = function () {
            document.querySelector('#rotate_button_input').value =
              rotate_buttons[i].id
            document.querySelector('#angle_range_span').innerHTML = ''
          }
        }
        document.querySelector('#rotate_value_range').oninput = function () {
          document.querySelector('#angle_range_span').innerHTML =
            '(' + document.querySelector('#rotate_value_range').value + '°)'
        }

        var rotate_options = document.querySelectorAll(
          '#rotate_value_range,#rotate_input,#rotate_button_input'
        )
        for (let m = 0; m < rotate_options.length; m++) {
          rotate_options[m].onchange = function () {
            console.log(
              document.querySelector('#rotate_button_input').value + 'done'
            )

            console.log(rotate_options[m].id)
            document.querySelector('#preview_btn').onclick = function () {
              var rotate_value = rotate_options[m].value
              console.log(rotate_value)
              if (rotate_value == '') {
                rotate_value = 0
              }
              Rotate(img, rotate_value + 'deg')
            }
          }
        }
        document.querySelector('#save_btn').onclick = function () {
          document.querySelector('.box').style.background = '#a29bfe'
          document.querySelector('.box-border').style.background =
            'rgba(0, 0, 0, 0.1)'
          document.querySelector('.box-border').style.background =
            '2px dashed rgba(0, 0, 0, 0.15)'

          window.location.href = '#'
          document.querySelector('#content').style.display = 'none'
          document.querySelector('.thankyouBox').innerHTML =
            ' <div class="row"> <div class="col col-md-12 col-sm-12 col-lg-12 col-xl-12"> <img src="/trust.svg" alt="" id="thankyouImage" /> <p id="thankyouText">Thanks for your patience</p> <a class="btn" id="downloadButton">DOWNLOAD</a> </div> </div>'
          document.querySelector('.container2').style.height = '300px'
          ///download button
          document.querySelector('#downloadButton').onclick = function () {
            document.querySelector('canvas').toBlob(function (result_blob) {
              var result_url = window.URL.createObjectURL(result_blob)
              var a = document.createElement('a')
              a.href = result_url
              a.download = 'download'
              a.click()
              if (lang === 'en') {
                window.location.href = `/download?tool=${pageTool}`
              } else {
                window.location.href = `/${lang}/download?tool=${pageTool}`
              }
            })
          }
        }
      }
      img.src = r.result
    }
    r.readAsDataURL(input)
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
