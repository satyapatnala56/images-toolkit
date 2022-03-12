const getScript = document.currentScript
const pageTool = getScript.dataset.tool
const lang = getScript.dataset.lang
const gdrive = document.querySelector('#filepicker')
const inputBox = document.querySelector('#Inputbox')
const fileDropBox = document.querySelector('.custom-box')
const cropBoxPanel = document.getElementById('crop-box-panel')
const downloadButton = document.querySelector('#download-button')
let mediaCrop = document.querySelectorAll('.media-crop')
let shapes = document.querySelectorAll('.shape')
let imgData = ''
let cropper = ''
let croppedImageWidth = ''
let croppedImageHeight = ''
const showLoader = () => {
  showLoading()
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
  handleFile(file)
}
const getFile = (file) => {
  handleFile(file)
}
const fileOnChange = () => {
  handleFile(file.files[0])
}
const dropbox = document.getElementById('dropbox')
dropbox.addEventListener(
  'click',
  async (getDropBoxFile, showLoader, closeLoader) => {
    const getFile = chooseFromDropbox()
  }
)
inputBox.onclick = function () {
  document.querySelector('#file').click()
}
fileDropBox.addEventListener('dragover', (e) => {
  e.preventDefault()
})
fileDropBox.addEventListener('drop', (e) => {
  e.preventDefault()
  handleFile(e.dataTransfer.files[0])
})
let shapesData = [
  {
    name: '1',
    value: '/img/shapes-transparent/1.png',
  },
  {
    name: '2',
    value: '/img/shapes-transparent/2.png',
  },
  {
    name: '3',
    value: '/img/shapes-transparent/3.png',
  },
  {
    name: '4',
    value: '/img/shapes-transparent/4.png',
  },
  {
    name: '5',
    value: '/img/shapes-transparent/5.png',
  },
  {
    name: '6',
    value: '/img/shapes-transparent/6.png',
  },
  {
    name: '7',
    value: '/img/shapes-transparent/7.png',
  },
  {
    name: '8',
    value: '/img/shapes-transparent/8.png',
  },
  {
    name: '9',
    value: '/img/shapes-transparent/9.png',
  },
  {
    name: '10',
    value: '/img/shapes-transparent/10.png',
  },
  {
    name: '11',
    value: '/img/shapes-transparent/11.png',
  },
  {
    name: '12',
    value: '/img/shapes-transparent/12.png',
  },
  {
    name: '13',
    value: '/img/shapes-transparent/13.png',
  },
  {
    name: '14',
    value: '/img/shapes-transparent/14.png',
  },
  {
    name: '15',
    value: '/img/shapes-transparent/15.png',
  },
]
Array.from(shapes).map((item) => {
  item.addEventListener('click', (e) => {
    let shapeData = shapesData.find((item) => item.name === e.currentTarget.id)
    Array.from(shapes).map((item) => {
      item.style.border = 'none'
    })
    e.currentTarget.style.border = '2px solid #444'
    let appendData = `<img src="${shapeData.value}">`
    document.querySelector('.cropper-center').innerHTML = appendData
    imgData = shapeData.value
  })
})
const updateImage = () => {}
let inputFile = ''
const handleFile = (file) => {
  document.querySelector('#file-loader').style.display = 'flex'
  document.querySelector('.file-input').style.display = 'none'
  inputFile = file
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target.result) {
        let image = new Image()
        image.onload = () => {
          croppedImageWidth = image.width
          croppedImageHeight = image.height
          let img = document.createElement('img')
          img.id = 'image'
          img.src = e.target.result
          cropBoxPanel.appendChild(img)
          cropper = new Cropper(img, {
            ready() {
              downloadButton.addEventListener('click', handleDownload)
              this.cropper.crop()
            },
            crop(event) {
              document.querySelector('#crop-height').value = Math.round(
                event.detail.height
              )
              document.querySelector('#crop-width').value = Math.round(
                event.detail.width
              )
            },
          })
        }
        image.src = e.target.result
      }
    }
    reader.readAsDataURL(file)
  }
  stopLoading()
  document.querySelector('.split-img-box').style.display = 'block'
}
const showLoading = () => {
  document.querySelector('#file-loader').style.display = 'flex'
  document.querySelector('.file-input').style.display = 'none'
}
const stopLoading = () => {
  fileDropBox.style.display = 'none'
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
const handleDownload = () => {
  document.getElementById('saving-data').style.display = 'block'
  cropBoxPanel.style.display = 'none'
  let imgCanvas = cropper.getCroppedCanvas({
    width: croppedImageWidth,
    height: croppedImageHeight,
  })
  let img = new Image()
  img.onload = () => {
    let img2 = new Image()
    img2.onload = () => {
      let canvas = document.createElement('canvas')
      canvas.width = croppedImageWidth
      canvas.height = croppedImageHeight
      let ctx = canvas.getContext('2d')
      img.height = croppedImageHeight
      img.width = croppedImageWidth
      ctx.drawImage(img, 0, 0, croppedImageWidth, croppedImageHeight)
      ctx.globalCompositeOperation = 'xor'
      ctx.drawImage(img2, 0, 0, croppedImageWidth, croppedImageHeight)
      document.body.appendChild(canvas)
      let a = document.createElement('a')
      a.href = canvas.toDataURL()
      a.download = 'Safeimagekit.png'
      a.click()
    }
    img2.src = imgCanvas.toDataURL()
  }
  img.src = imgData
}
