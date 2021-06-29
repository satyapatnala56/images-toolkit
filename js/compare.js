var container = document.querySelector('.container2')
var inputbox = document.querySelector('#inputbox')
var content = document.querySelector('#content')
var file = document.querySelector('#file')
var box = document.querySelector('.box')
var input
var boxContainer = document.querySelector('.container2')
const gdrive = document.querySelector('#filepicker')
const getFile = (file) => {
  const firstInput = document.querySelector('#file')
  const secondInput = document.querySelector('#file2')
  if (firstInput.files.length === 0) {
    firstInput.files = [file]
  } else {
    secondInput.files = [file]
  }
  // onFileDrop(file)
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
const closeLoader = () => {
  document.querySelector('#loader-box').style.display = 'none'
  document.querySelector('#inputbox').style.display = 'block'
}
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
  onFileDrop(e.dataTransfer.files[0])
}
/////drag and drop event
container.ondragover = function (e) {
  e.preventDefault()
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
    $('.container2 #file').remove()

    imgComparison()
  } else {
    document.querySelector('.box').style.height = '350px'
    document.querySelector('#error').innerHTML = 'File format not supported'
  }
}

////input button event
const fileOnChange = () => {
  $('.container2 #file').remove()
  input = file.files[0]
  imgComparison()
}

function imgComparison() {
  document.querySelector('#inputbox').style.display = 'none'
  document.querySelector('#secondInput').style.visibility = 'visible'
  var reader = new FileReader()
  reader.onload = function () {
    var r1 = reader.result
    var file2 = document.querySelector('#file2')
    file2.onchange = function () {
      //////
      document.querySelector('#secondInput').style.display = 'none'

      var loaderbox = document.createElement('div')
      loaderbox.id = 'loader-box'
      var mainDiv = document.querySelector('#loaderDiv .col')
      mainDiv.insertBefore(loaderbox, mainDiv.childNodes[1])

      document.querySelector('#loader').innerHTML =
        '<p id="loadingMessage"></p>'
      document.querySelector('#loadingMessage').innerHTML =
        'Please Wait ,Loading Your file '
      var count = 0
      var ans = setInterval(function () {
        count = count + 20
        console.log(count)
        document.querySelector('#upper-loader').style.width = count + '%'
        if (count >= 110) {
          document.querySelector('#upper-loader').style.display = 'none'
          document.querySelector('#loaderDiv').style.display = 'none'
          document.querySelector('#loader-box').style.display = 'none'
          document.querySelector('#content').style.visibility = 'visible'
          document.querySelector('.box').style.height = 'auto'
          document.querySelector('.container2').style.height = 'auto'

          document.querySelector('.box').style.background = '#353535'

          clearInterval(ans)
        }
      }, 1000)

      var reader2 = new FileReader()
      reader2.onload = function () {
        var r2 = reader2.result
        //////fade effect
        document.querySelector('#fade').onclick = function () {
          document.querySelector('#msg').innerHTML =
            'Fade effect based comparison'

          document.querySelector('#cResult').innerHTML =
            ' <div class="pictureDisplay" style="width: 90%;margin-top:134px"> <div id="back" style="margin-top:px"> <img src="' +
            r2 +
            '" alt="" style="height: auto; width: 100%; max-height: 500px; opacity: 0.6" /> </div> </div>; '
          document.querySelector('#back').style.backgroundImage =
            "url('" + r1 + "')"
        }

        //////pixel comparison effect
        document.querySelector('#pixel').onclick = function () {
          document.querySelector('#msg').innerHTML = 'Pixel based comparison'
          document.querySelector('#cResult').innerHTML = "<img id='pt'>"
          ////////////////////////////////
          var img = new Image()
          img.onload = function () {
            var img2 = new Image()
            img2.onload = function () {
              diff = imagediff.diff(img, img2)
              canvas = imagediff.createCanvas(diff.width, diff.height)
              context = canvas.getContext('2d')
              context.putImageData(diff, 0, 0)
              var url = canvas.toDataURL()
              var img3 = document.querySelector('#pt')
              img3.onload = function () {
                img3.style.width = '90%'
                //   // var a = document.createElement("a");
                //   // a.href = url;
                //   // a.download = "download";
                //   // a.click();
              }
              img3.src = url
            }
            img2.src = reader2.result
          }
          img.src = reader.result
        }
        document.querySelector('#info').onclick = function () {
          document.querySelector('#msg').innerHTML = 'Info based comparison'

          var img = new Image()
          img.onload = function () {
            var img2 = new Image()
            img2.onload = function () {
              document.querySelector('#cResult').innerHTML =
                ' <div style="width: 100%; height: 500px"> <div class="tableDiv"> <table id="table1" class="table"> <tr> <th>Property</th> <th>Value</th> </tr> <tr> <td>Name</td> <td>' +
                input.name +
                '</td> </tr> <tr> <td>Size</td> <td>' +
                parseInt(file.size) / 1000 +
                'kb</td> </tr> <tr> <td>Type</td> <td>' +
                file.type +
                '</td> </tr> <tr> <td>Height</td> <td>' +
                img.height +
                'px' +
                '</td> </tr> <tr> <td>Width</td> <td>' +
                img.width +
                'px' +
                '</td> </tr> </table> </div> ' +
                '<div class="tableDiv"> <table id="table1" class="table"> <tr> <th>Property</th> <th>Value</th> </tr> <tr> <td>Name</td> <td>' +
                file2.files[0].name +
                '</td> </tr> <tr> <td>Size</td> <td>' +
                parseInt(file2.files[0].size) / 1000 +
                'kb</td> </tr> <tr> <td>Type</td> <td>' +
                file2.files[0].type +
                '</td> </tr> <tr> <td>Height</td> <td>' +
                img2.height +
                'px</td> </tr> <tr> <td>Width</td> <td>' +
                img2.width +
                'px</td> </tr> </table> </div></div>'
            }
            img2.src = reader2.result
          }
          img.src = reader.result
        }

        document.querySelector('#pixel').click()
        document.querySelector('#slider').onclick = function () {}
      }
      reader2.readAsDataURL(file2.files[0])
    }
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
const seocndOption = document.querySelector('#secondOption')
const secondOptionArrow = document.querySelector('#secondOptionArrow')
const secondOptionDropdown = document.querySelector('#secondOptionDropdown')
seocndOption.addEventListener('click', () => {
  addScripts()

  if (secondOptionDropdown.style.display !== 'none') {
    secondOptionDropdown.style.display = 'none'
    secondOptionArrow.classList.remove('fa-angle-up')
    secondOptionArrow.classList.add('fa-angle-down')
  } else {
    secondOptionDropdown.style.display = 'block'
    secondOptionArrow.classList.remove('fa-angle-down')
    secondOptionArrow.classList.add('fa-angle-up')
  }
})
