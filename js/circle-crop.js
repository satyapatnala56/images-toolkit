const getScript = document.currentScript
const pageTool = getScript.dataset.tool
const lang = getScript.dataset.lang
const gdrive = document.querySelector('#filepicker')
const inputBox = document.querySelector('#Inputbox')
const fileDropBox = document.querySelector('.custom-box')
const cropBoxPanel = document.getElementById('crop-box-panel')
const downloadButton = document.querySelector('#download-button')
let mediaCrop = document.querySelectorAll('.media-crop')
let mediaDimensions = document.querySelector('#media-dimensions')
let cropType = document.querySelector('#file').dataset.type
let cropper = ''
let croppedImageWidth = ''
let fileType = ''
let croppedImageHeight = ''
const cropInputHeight = document.querySelector('#crop-height')
const cropInputWidth = document.querySelector('#crop-width')
let shapes = document.querySelectorAll('.shape')
let imgData = ''
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
let inputFile = ''
const handleFile = (file) => {
  fileType = file.type.split('/')[1]
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
            aspectRadio: 1 / 1,
            ready() {
              cropper.setAspectRatio(1)
              if (cropType === 'circle') {
                let appendData = `<img src="/img/shapes-transparent/6.png">`
                document.querySelector('.cropper-center').innerHTML = appendData
                imgData = '/img/shapes-transparent/6.png'
              }
              downloadButton.addEventListener('click', handleDownload)
              this.cropper.crop()
            },
            crop(event) {
              cropInputWidth.value = Math.round(event.detail.width)
              cropInputHeight.value = Math.round(event.detail.height)
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
    width: cropInputWidth.value,
    height: cropInputHeight.value,
  })
  if (imgData === '') {
    let a = document.createElement('a')
    a.href = imgCanvas.toDataURL()
    a.download = 'Safeimagekit.png'
    a.click()
  } else {
    let img = new Image()
    img.onload = () => {
      let img2 = new Image()
      img2.onload = () => {
        let canvas = document.createElement('canvas')
        canvas.width = cropInputWidth.value
        canvas.height = cropInputHeight.value
        let ctx = canvas.getContext('2d')
        img.height = cropInputHeight.value
        img.width = cropInputWidth.value
        ctx.drawImage(img, 0, 0, cropInputWidth.value, cropInputHeight.value)
        ctx.globalCompositeOperation = 'xor'
        ctx.drawImage(img2, 0, 0, cropInputWidth.value, cropInputHeight.value)
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
}
cropInputWidth.addEventListener('change', (e) => {
  cropInputHeight.value = e.target.value
})
cropInputHeight.addEventListener('change', (e) => {
  cropInputWidth.value = e.target.value
})
