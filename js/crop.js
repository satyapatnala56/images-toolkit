const getScript = document.currentScript
const pageTool = getScript.dataset.tool
const lang = getScript.dataset.lang
var container = document.querySelector('.container2')
var inputbox = document.querySelector('#inputbox')
var content = document.querySelector('#content')
var file = document.querySelector('#file')
var box = document.querySelector('.box')
var flag = 0
var input
container.ondragover = function (e) {
  e.preventDefault()
}
container.ondrop = function (e) {
  e.preventDefault()
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
    cropImage()
  } else {
    console.log('error')
    document.querySelector('.box').style.height = '350px'
    document.querySelector('#error').innerHTML = 'File format not supported'
  }
}
file.onchange = function () {
  inputbox.style.display = 'none'
  input = file.files[0]
  cropImage()
}
////drag and drop ended

//////cropping image
function cropImage() {
  ////loader

  $('#file').remove()
  var loaderbox = document.createElement('div')
  loaderbox.id = 'loader-box'
  var mainDiv = document.querySelector('#loaderDiv .col')
  mainDiv.insertBefore(loaderbox, mainDiv.childNodes[1])

  document.querySelector('#loader').innerHTML = '<p id="loadingMessage"></p>'
  document.querySelector('#loadingMessage').innerHTML =
    'Please Wait ,Loading Your file '
  var count = 0
  var ans = setInterval(function () {
    count = count + 10
    console.log(count)
    document.querySelector('#upper-loader').style.width = count + '%'
    if (count == 110) {
      document.querySelector('#upper-loader').style.display = 'none'
      document.querySelector('#loaderDiv').style.display = 'none'
      document.querySelector('#content').style.visibility = 'visible'
      document.querySelector('#loader-box').style.display = 'none'
      document.querySelector('.box').style.background = '#353535'
      document.querySelector('.container2').style.height = 'auto'
      document.querySelector('.croppr-region').style.width = 'inherit'

      clearInterval(ans)
    }
  }, 300)
  ////loader end
  var reader = new FileReader()
  reader.onload = function () {
    var img = document.querySelector('#original_image img')

    img.onload = function () {
      var croppr = new Croppr('#original_image img', {
        onCropEnd: function (value) {
          if (flag == 0) {
            window.location.href = '#cropped_img'
            flag = 1
          }
          console.log(value.x, value.y, value.width, value.height)
          var value = croppr.getValue()
          var canvas = document.createElement('canvas')
          canvas.height = value.height
          canvas.width = value.width

          var ctx = canvas.getContext('2d')
          ctx.drawImage(
            img,
            value.x,
            value.y,
            value.width,
            value.height,
            0,
            0,
            value.width,
            value.height
          )
          document.querySelector('#save_button_div').style.marginTop = '30px'
          document.querySelector('#cropped_image img').src = canvas.toDataURL()
          document.querySelector('#cropped_image').style.height = 'auto'

          document.querySelector('#save').onclick = function () {
            window.location.href = '#'
            document.querySelector('#content').style.display = 'none'
            document.querySelector('.thankyouBox').innerHTML =
              ' <div class="row"> <div class="col col-md-12 col-sm-12 col-lg-12 col-xl-12"> <img src="/trust.svg" alt="" id="thankyouImage" /> <p id="thankyouText">Thanks for your patience</p> <a class="btn" id="downloadButton">DOWNLOAD</a> </div> </div>'

            document.querySelector('#downloadButton').onclick = function () {
              canvas.toBlob(function (result_blob) {
                var result_url = window.URL.createObjectURL(result_blob)
                var a = document.createElement('a')
                a.href = result_url
                a.download = 'download'
                a.click()
                if (lang === 'en') {
                  window.location.href = `/download?tool=${pageTool}`
                } else {
                  window.location.href = `/${lang}/downlod?tool=${pageTool}`
                }
              })
            }
            document.querySelector('.container2').style.height = '300px'
            box.style.background = '#ff704d'
          }
        },
      })
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
