const getScript = document.currentScript
const pageTool = getScript.dataset.tool
const lang = getScript.dataset.lang
var container = document.querySelector('.container2')
var inputbox = document.querySelector('#inputbox')
var content = document.querySelector('#content')
var file = document.querySelector('#file')
var box = document.querySelector('.box')

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
    extension == 'png'
  ) {
    inputbox.style.display = 'none'
    setAscii()
  } else {
    console.log('error')
    document.querySelector('.container2').style.height = '350px'
    document.querySelector('#error').innerHTML = 'File format not supported'
  }
}
file.onchange = function () {
  inputbox.style.display = 'none'
  input = file.files[0]
  setAscii()
}
function setAscii() {
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
      document.querySelector('#loader-box').style.display = 'none'
      document.querySelector('#content').style.visibility = 'visible'

      clearInterval(ans)
    }
  }, 1000)
  ////loader end
  setTimeout(function () {
    var reader = new FileReader()
    reader.readAsDataURL(input)
    reader.onload = function () {
      let ele = new imgToAscii(reader.result, 0.3)
      ele.display()
      var pre = document.querySelector('pre')
      document.querySelector('#demo').appendChild(pre)
      var observer = new MutationObserver(function (hello) {
        html2canvas(pre, {
          onrendered: function (canvas) {
            var url = canvas.toDataURL()
            var image = new Image()
            image.src = url
            image.onload = function () {
              var canvas = document.createElement('canvas')
              var ctx = canvas.getContext('2d')
              canvas.width = image.width
              canvas.height = image.height
              ctx.fillStyle = 'white'
              ctx.fillRect(0, 0, canvas.width, canvas.height)
              ctx.drawImage(image, 0, 0)
              var url2 = canvas.toDataURL()
              document.getElementById('demo').style.display = 'none'
              document.getElementById('downloadButton').onclick = function () {
                var a = document.createElement('a')
                a.href = url2
                a.download = 'downlaod'
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
      })
      observer.observe(pre, {
        childList: true,
      })
    }
  }, 10000)
}
document.querySelector('.container2').onclick = function () {
  document.querySelector('#file').click()
}
