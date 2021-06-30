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
    extension == 'png'
  ) {
    inputbox.style.display = 'none'
    container.style.height = '300px'
    convert_webp()
  } else {
    container.style.height = '350px'
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
  /////loader starting
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
      document.querySelector('.box').style.background = 'white'
      document.querySelector('.box-border').style.background = 'none'
      document.querySelector('.box-border').style.border = 'none'
      document.querySelector('.container2').style.height = 'auto'
      window.location.href = '#'
      clearInterval(ans)
    }
  }, 600)
  function webp_to_img() {
    document.querySelector('.success_alert').style.visibility = 'hidden'
    var r = new FileReader()
    r.onload = function () {
      var img = new Image()
      img.onload = function () {
        document.querySelector('#height_value').innerHTML = img.height + 'px'
        document.querySelector('#width_value').innerHTML = img.width + 'px'
        document.querySelector('#output_img_div img').src = r.result
        document.querySelector('#preview_btn').onclick = function () {
          var height =
            document.querySelector('#height_input').value || img.height
          var width = document.querySelector('#width_input').value || img.width
          var mimetype = document.querySelector('#mimetype').value
          if (mimetype == '---') {
            mimetype = 'image/png'
          }
          converting_process('Loading preview...', 'Preview loaded', 0)
        }
        document.querySelector('#save_btn').onclick = function () {
          var height =
            document.querySelector('#height_input').value || img.height
          var width = document.querySelector('#width_input').value || img.width
          var mimetype = document.querySelector('#mimetype').value
          if (mimetype == '---') {
            mimetype = 'image/png'
          }
          converting_process('Saving image...', '', 1)
        }
        function converting_process(message1, message2, value) {
          window.location.href = '#'

          document.querySelector('.success_alert').style.visibility = 'visible'
          document.querySelector('.success_alert').style.borderColor = '#b6d4fe'
          document.querySelector('.success_alert').style.color = '#084298'
          document.querySelector('.success_alert').style.background = '#cfe2ff'
          document.querySelector('.success_alert').innerHTML = message1
          document.querySelector('#preview_btn').style.background = 'green'
          document.querySelector('#preview_btn').style.color = 'white'
          var height =
            document.querySelector('#height_input').value || img.height
          var width = document.querySelector('#width_input').value || img.width
          var mimetype = document.querySelector('#mimetype').value
          if (mimetype == '---') {
            mimetype = 'image/png'
          }
          var reader = new FileReader()
          reader.onload = function () {
            var img2 = new Image(width, height)
            img2.onload = function () {
              var canvas = document.createElement('canvas')
              var ctx = canvas.getContext('2d')
              canvas.height = img2.height
              canvas.width = img2.width
              ctx.drawImage(img2, 0, 0, width, height)
              document.querySelector('#output_img_div img').src =
                canvas.toDataURL()
              document.querySelector('#output_img_div img').onload =
                function () {
                  document.querySelector('.success_alert').style.borderColor =
                    '#badbcc'
                  document.querySelector('.success_alert').style.color =
                    '#0f5132'
                  document.querySelector('.success_alert').style.background =
                    '#d1e7dd'
                  document.querySelector('.success_alert').innerHTML = message2
                  setTimeout(function () {
                    document.querySelector('.success_alert').style.visibility =
                      'hidden'
                  }, 2000)
                  document.querySelector('#height_value').innerHTML =
                    height + 'px'
                  document.querySelector('#width_value').innerHTML =
                    width + 'px'
                  document.querySelector('#mimetype_value').innerHTML = mimetype
                  function image_saving() {
                    window.location.href = '#'
                    document.querySelector('.box').style.background = '#ffbb33'
                    document.querySelector('.box-border').style.background =
                      'rgba(0, 0, 0, 0.1)'
                    document.querySelector('.box-border').style.background =
                      '2px dashed rgba(0, 0, 0, 0.15)'

                    document.querySelector('#content').style.display = 'none'
                    document.querySelector('.thankyouBox').innerHTML =
                      ' <div class="row"> <div class="col col-md-12 col-sm-12 col-lg-12 col-xl-12"> <img src="/trust.svg" alt="" id="thankyouImage" /> <p id="thankyouText">Thanks for your patience</p> <span><a class="btn" id="downloadButton">DOWNLOAD</a></span> </div> </div>'
                    document.querySelector('.container2').style.height = '300px'
                    ///download button

                    document.querySelector('#downloadButton').onclick =
                      function () {
                        document.querySelector('.thankyouBox span').innerHTML =
                          'Downloading might take a while'
                        canvas.toBlob(function (blob) {
                          var r = new FileReader()
                          r.onload = function () {
                            var b = new Blob([r.result], {
                              type: mimetype,
                            })
                            var url = window.URL.createObjectURL(b)
                            var a = document.createElement('a')
                            a.href = url
                            a.download =
                              'download.' + mimetype.replace(/^.*\//, '')
                            a.click()
                            setTimeout(() => {
                              if (lang === 'en') {
                                window.location.href = `/download?tool=${pageTool}`
                              } else {
                                window.location.href = `/${lang}/downlod?tool=${pageTool}`
                              }
                            }, 200)
                          }
                          r.readAsArrayBuffer(blob)
                        })
                      }
                  }
                  if (value == 1) {
                    image_saving()
                  } else if (value == 0) {
                    return false
                  }
                }
            }
            img2.src = reader.result
          }
          reader.readAsDataURL(input)
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

var inputs = document.querySelectorAll('#height_input,#width_input,#mimetype')
for (let i = 0; i < inputs.length; i++) {
  inputs[i].oninput = function () {
    document.querySelector('#preview_btn').style.color = '#ffbb33'
    document.querySelector('#preview_btn').style.background = 'white'
  }
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
