const gdrive = document.querySelector('#filepicker')
const inputBox = document.querySelector('#Inputbox')
const fileDropBox = document.querySelector('.custom-box')
const previewBoxPanel = document.getElementById('preview-box-panel')
const mirror = document.querySelector('#mirror-button')
const download = document.querySelector('#download-button')
const formCheckInput = document.querySelectorAll('.form-check-input')
let typeOfMirror = 'horizontal'
let image = null
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
Array.from(formCheckInput).map((item) => {
  item.addEventListener('change', (e) => {
    typeOfMirror = e.target.value
  })
})
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
mirror.addEventListener('click', () => {
  if (typeOfMirror === 'horizontal') {
    mirrorImage(image, 0, 0, true, false)
  } else {
    mirrorImage(image, 0, 0, false, true)
  }
})
const mirrorImage = (
  image,
  x = 0,
  y = 0,
  horizontal = false,
  vertical = false
) => {
  const canvas = document.createElement('canvas')
  canvas.setAttribute('id', 'canvas')
  let ctx = canvas.getContext('2d')
  canvas.width = image.width
  canvas.height = image.height
  ctx.save()
  ctx.setTransform(
    horizontal ? -1 : 1,
    0,
    0,
    vertical ? -1 : 1,
    x + horizontal ? canvas.width : 0,
    y + vertical ? canvas.height : 0
  )
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
  ctx.restore()
  previewBoxPanel.innerHTML = ''
  previewBoxPanel.appendChild(canvas)
}
let inputFile = ''
const handleFile = (file) => {
  document.querySelector('#file-loader').style.display = 'flex'
  document.querySelector('.file-input').style.display = 'none'
  inputFile = file
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target.result) {
        const canvas = document.createElement('canvas')
        canvas.setAttribute('id', 'canvas')
        let ctx = canvas.getContext('2d')
        image = new Image()
        image.onload = () => {
          canvas.width = image.width
          canvas.height = image.height
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
          previewBoxPanel.innerHTML = ''
          previewBoxPanel.appendChild(canvas)
        }
        image.src = e.target.result
      }
    }
    reader.readAsDataURL(file)
  }
  stopLoading()
  document.querySelector('.workspace').style.display = 'block'
}
const showLoading = () => {
  document.querySelector('#file-loader').style.display = 'flex'
  document.querySelector('.file-input').style.display = 'none'
}
const stopLoading = () => {
  fileDropBox.style.display = 'none'
}
download.addEventListener('click', () => {
  let canvas = document.querySelector('canvas')
  let url = canvas.toDataURL(`image/png`)
  let a = document.createElement('a')
  a.href = url
  a.download = `safeimagekit-mirror-image.${inputFile.type.split('/')[1]}`
  document.body.appendChild(a)
  a.click()
})
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
