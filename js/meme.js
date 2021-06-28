const getScript = document.currentScript
const pageTool = getScript.dataset.tool
const lang = getScript.dataset.lang
var container = document.querySelector('.container2')
var inputbox = document.querySelector('#inputbox')
var content = document.querySelector('#content')
var file = document.querySelector('#file')
var box = document.querySelector('.box')

var input
document.querySelector('#Inputbox').onclick = function () {
  document.querySelector('#file').click()
}
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
    memeProcessing()
  } else {
    console.log('error')
    container.style.height = '350px'
    document.querySelector('#error').innerHTML = 'File format not supported'
  }
}
file.onchange = function () {
  inputbox.style.display = 'none'
  input = file.files[0]

  memeProcessing()
}
//

function memeProcessing() {
  $('#file').remove()
  ///recieving values
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
  }, 1000)

  var reader2 = new FileReader()
  reader2.onload = function () {
    var height, width
    //canvas adding
    var img = new Image()
    img.onload = function () {
      canvas = new fabric.Canvas('final', {
        width: img.width,
        height: img.height,
        selection: true,
        allowTouchScrolling: true,
      })
      ////adding background
      fabric.Image.fromURL(
        reader2.result,
        function (meme) {
          canvas.setBackgroundImage(meme, canvas.renderAll.bind(canvas))
        },
        {
          crossOrigin: 'anonymous',
        }
      )
      ///// styling button
      var styles = document.querySelectorAll('#bold,#italic,#underline')
      var bold = '',
        italic = '',
        underline = ''
      for (let i = 0; i < styles.length; i++) {
        styles[i].onclick = function () {
          if (styles[i].style.background == 'red') {
            if (styles[i].id == 'bold') {
              bold = ''
            }
            if (styles[i].id == 'italic') {
              italic = ''
            }
            if (styles[i].id == 'underline') {
              underline = ''
            }
            styles[i].style.background = 'rgba(90, 90, 90, 0.466)'
          } else {
            if (styles[i].id == 'bold') {
              bold = 'bold'
            }
            if (styles[i].id == 'italic') {
              italic = 'italic'
            }
            if (styles[i].id == 'underline') {
              underline = 'underline'
            }
            styles[i].style.background = 'red'
          }
        }
      }
      //////
      //additional text
      document.querySelector('#textInput').onclick = function () {
        var t = document.querySelector('#memeText').value
        var color = document.querySelector('#memeTextColor').value || 'black'

        var finalOpacity = document.querySelector('#memeOpacity').value || 1
        var shadowColor = document.querySelector('#memeShadowColor').value
        var shadow = document.querySelector('#memeShadow').value
        var strokeColor = document.querySelector('#memeStrokeColor').value
        var stroke = document.querySelector('#memeStroke').value
        var fontsize = document.querySelector('#fontSize').value || 100

        var text = new fabric.Text(t, {
          top: 10,
          left: 10,
          fontSize: fontsize,
          fill: color,
          fontStyle: italic,
          fontWeight: bold,
          underline: underline,
          stroke: strokeColor,
          strokeWidth: stroke,
          shadow: 'green',
          shadowWidth: 10,

          opacity: parseFloat(finalOpacity),
        })
        canvas.add(text).setActiveObject(text)
      }
      //additional image

      document.querySelector('#file2').onchange = function () {
        document.querySelector('#generate').onclick = function () {
          document.querySelector('#generate').style.background = 'green'
        }
        const reader = new FileReader()
        reader.onload = function () {
          var image = new Image()
          image.src = reader.result
          image.onload = function () {
            fabric.Image.fromURL(
              reader.result,
              function (image) {
                image.scaleToWidth(canvas.width / 2)
                canvas.add(image).setActiveObject(image)
              },
              {
                opacity: $('#opacity').val(),
              }
            )
          }
        }
        reader.readAsDataURL(document.querySelector('#file2').files[0])
      }
      // Custom control
      fabric.Object.prototype.set({
        transparentCorners: false,
        cornerColor: 'yellow',
        borderColor: 'rgba(88,42,114)',
        cornerSize: parseInt(canvas.width) * 0.01,
        cornerStrokeColor: '#000000',
        borderScaleFactor: 2,
        padding: 4,
      })

      ///save button
      document.querySelector('#save').onclick = function () {
        window.location.href = '#'
        document.querySelector('#content').style.display = 'none'
        document.querySelector('.thankyouBox').innerHTML =
          ' <div class="row"> <div class="col col-md-12 col-sm-12 col-lg-12 col-xl-12"> <img src="/trust.svg" alt="" id="thankyouImage" /> <p id="thankyouText">Thanks for your patience</p> <a class="btn" id="downloadButton">DOWNLOAD</a> </div> </div>'
        container.style.height = '300px'
        box.style.background = '#5cd65c'
        ////download button
        document.querySelector('#downloadButton').onclick = function () {
          var result = canvas.toDataURL()
          var a = document.createElement('a')
          a.href = result
          a.download = 'Meme'
          a.click()
          setTimeout(() => {
            if (lang === 'en') {
              window.location.href = `/download?tool=${pageTool}`
            } else {
              window.location.href = `/${lang}/downlod?tool=${pageTool}`
            }
          }, 200)
        }
      }

      ////download button
    }
    img.src = reader2.result
  }
  reader2.readAsDataURL(input)
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
