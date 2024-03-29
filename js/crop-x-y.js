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
let cropDimensions = document.querySelector('#file').dataset
let cropper = ''
let croppedImageWidth = ''
let fileType = ''
let croppedImageHeight = ''
const cropInputHeight = document.querySelector('#crop-height')
const cropInputWidth = document.querySelector('#crop-width')
let shapes = document.querySelectorAll('.shape')
let canChange = false
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
        if (cropDimensions.x !== '0' || cropDimensions.y !== '0') {
          cropInputWidth.value = cropDimensions.x
          cropInputHeight.value = cropDimensions.y
        } else {
          canChange = true
        }

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
              if (cropDimensions.x !== '0' || cropDimensions.y !== '0') {
                cropper.setAspectRatio(
                  Number(cropInputWidth.value) / Number(cropInputHeight.value)
                )
              }

              downloadButton.addEventListener('click', handleDownload)
              this.cropper.crop()
            },
            crop(event) {
              if (canChange) {
                cropInputWidth.value = Math.round(event.detail.width)
                cropInputHeight.value = Math.round(event.detail.height)
                canChange = false
              }
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
  let a = document.createElement('a')
  a.href = imgCanvas.toDataURL()
  a.download = 'Safeimagekit.png'
  a.click()
  if (lang === 'en') {
    window.location.href = `/download?tool=${pageTool}`
  } else {
    window.location.href = `/${lang}/download?tool=${pageTool}`
  }
}
cropInputWidth.addEventListener('change', (e) => {
  cropper.setAspectRatio(
    Number(cropInputWidth.value) / Number(cropInputHeight.value)
  )
})
cropInputHeight.addEventListener('change', (e) => {
  cropper.setAspectRatio(
    Number(cropInputWidth.value) / Number(cropInputHeight.value)
  )
})
