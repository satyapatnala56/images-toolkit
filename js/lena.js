const getScript = document.currentScript
const pageTool = getScript.dataset.tool
const lang = getScript.dataset.lang
var container = document.querySelector('.container2')
var inputbox = document.querySelector('#inputbox')
var content = document.querySelector('#content')
var file = document.querySelector('#file')
var box = document.querySelector('.box')
var filter_container = []

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
    sFilter()
  } else {
    console.log('error')
    document.querySelector('.box').style.height = '350px'
    document.querySelector('#error').innerHTML = 'File format not supported'
  }
}
file.onchange = function () {
  inputbox.style.display = 'none'
  input = file.files[0]
  sFilter()
}
////drag and drop ended

var setFilter = document.getElementById('setfilter')
var file = document.getElementById('file')
//filter loading

///set filter button

function sFilter() {
  $('#file').remove()
  ///////loader
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

      clearInterval(ans)
    }
  }, 500)

  ///////loader end
  var reader = new FileReader()
  reader.onload = function () {
    ////filter choosing
    document.querySelector('#rightDiv .resultBox div img').src = reader.result
    var img = new Image()
    img.onload = function () {
      var filter_buttons = document.querySelectorAll('.filter_buttons')
      for (let i = 0; i < filter_buttons.length; i++) {
        filter_container.push(filter_buttons[i])
        filter_buttons[i].onclick = function () {
          console.log(filter_container[i].id)

          for (let j = 0; j < filter_container.length; j++) {
            if (j == i) {
              filter_container[j].style.background = 'green'
              filter_container[j].style.color = 'white'
            } else {
              filter_container[j].style.background = 'white'
              filter_container[j].style.color = 'black'
            }
          }

          var canvas = document.createElement('canvas')
          canvas.height = img.height
          canvas.width = img.width

          ///filte roperaiton code
          LenaJS.filterImage(canvas, LenaJS[filter_buttons[i].id], img)
          var url = canvas.toDataURL()

          document.querySelector('#rightDiv #outputDiv div img').src = url
          ///saving button
          document.querySelector('#save').onclick = function () {
            document.querySelector('#content').style.display = 'none'
            window.location.href = '#'
            document.querySelector('.thankyouBox').innerHTML =
              ' <div class="row"> <div class="col col-md-12 col-sm-12 col-lg-12 col-xl-12"> <img src="/trust.svg" alt="" id="thankyouImage" /> <p id="thankyouText">Thanks for your patience</p> <a class="btn" id="downloadButton">DOWNLOAD</a> </div> </div>'
            container.style.height = '300px'
            box.style.background = '#00b8e6'
            ////download button
            var downloadButton = document.getElementById('downloadButton')
            downloadButton.onclick = function () {
              var a = document.createElement('a')
              a.href = url
              a.download = 'download'
              a.click()
              if (lang === 'en') {
                window.location.href = `/download?tool=${pageTool}`
              } else {
                window.location.href = `/${lang}/download?tool=${pageTool}`
              }
            }
          }
        }
      }
    }
    img.src = reader.result
  }
  reader.readAsDataURL(input)
}

document.querySelector('.container2').onclick = function () {
  document.querySelector('#file').click()
}
