const getScript = document.currentScript
const pageTool = getScript.dataset.tool
const lang = getScript.dataset.lang
const gdrive = document.querySelector('#filepicker')
const fileDropBox = document.querySelector('.custom-box')
let differenceLine = document.querySelector('#difference-line')
const showLoader = () => {
  document.querySelector('#file-loader').style.display = 'flex'
  document.querySelector('.file-input').style.display = 'none'
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
  ChangeFile(file)
}
const getFile = (file) => {
  ChangeFile(file)
}
fileDropBox.addEventListener('dragover', (e) => {
  e.preventDefault()
})
fileDropBox.addEventListener('drop', (e) => {
  e.preventDefault()
  ChangeFile(e.dataTransfer.files[0])
})
const dropbox = document.getElementById('dropbox')
dropbox.addEventListener(
  'click',
  async (getDropBoxFile, showLoader, closeLoader) => {
    const getFile = chooseFromDropbox()
  }
)
document.querySelector('#Inputbox').onclick = function () {
  document.querySelector('#file').click()
}
let inputFile = ''
const fileOnChange = () => {
  document.querySelector('#file-loader').style.display = 'flex'
  document.querySelector('.file-input').style.display = 'none'
  inputFile = file.files[0]
  compressImage(file.files[0])
}
const ChangeFile = (file) => {
  document.querySelector('#file-loader').style.display = 'flex'
  document.querySelector('.file-input').style.display = 'none'
  inputFile = file
  compressImage(file)
}
let downloadFile = ''
document.querySelector('#quality-range').addEventListener('change', (e) => {
  e.target.disabled = true
  document.querySelector('#loading-img-div').style.visibility = 'visible'
  document.querySelector('#quality-input').value = e.target.value
  new Compressor(inputFile, {
    quality: (Number(e.target.value) - 10) / 100,
    success(result) {
      document.querySelector('#loading-img-div').style.visibility = 'hidden'
      document.querySelector('#compressed-img').src =
        URL.createObjectURL(result)
      document.querySelector('#compressed-img-size').innerHTML = fileSize(
        result.size
      )
      e.target.disabled = false
      downloadFile = result
    },
  })
})
document.querySelector('#quality-input').addEventListener('change', (e) => {
  e.target.disabled = true
  document.querySelector('#loading-img-div').style.visibility = 'visible'
  document.querySelector('#quality-range').value = e.target.value
  new Compressor(inputFile, {
    quality: (Number(e.target.value) - 10) / 100,
    success(result) {
      document.querySelector('#compressed-img').src =
        URL.createObjectURL(result)
      document.querySelector('#compressed-img-size').innerHTML = fileSize(
        result.size
      )
      document.querySelector('#loading-img-div').style.visibility = 'hidden'
      e.target.disabled = false
      document.querySelector('#download-btn').addEventListener('click', () => {
        handleDownload()
      })
    },
  })
})
const handleDownload = () => {
  const url = window.URL.createObjectURL(downloadFile)
  const a = document.createElement('a')
  a.style.display = 'none'
  a.href = url
  a.download = `safeimagekit-${inputFile.name}`
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(url)
  if (lang === 'en') {
    window.location.href = `/download?tool=${pageTool}`
  } else {
    window.location.href = `/${lang}/download?tool=${pageTool}`
  }
}
const fileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}
const slide = () => {
  let slideValue = document.getElementById('slider').value
  differenceLine.style.left = `calc(${slideValue}% - 1.6px)`
  document.getElementById('original-img').style.clipPath =
    'polygon(0 0,' + slideValue + '% 0,' + slideValue + '% 100%, 0 100%)'
}
const compressImage = (file) => {
  let reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = function (e) {
    let image = new Image()
    image.src = e.target.result
    image.onload = function () {
      let height = this.height
      let width = this.width
      let aspectRadio = width / height
      height = 320
      width = height / aspectRadio
      console.log(width)
    }
  }

  let quality =
    (Number(document.querySelector('#quality-range').value) - 10) / 100
  new Compressor(file, {
    quality: quality,
    success(result) {
      document.querySelector('.compress-img-box').style.display = 'block'
      document.querySelector('#file-name').innerHTML = file.name
      document.querySelector('#original-img').src = URL.createObjectURL(file)
      document.querySelector('#compressed-img').src =
        URL.createObjectURL(result)
      downloadFile = result
      document.querySelector('#compressed-img-size').innerHTML = fileSize(
        result.size
      )
      document.querySelector('#original-img-size').innerHTML = fileSize(
        file.size
      )
      document.querySelector('.custom-box').style.display = 'none'
      document.querySelector('#download-btn').addEventListener('click', () => {
        handleDownload()
      })
    },
    error(err) {},
  })
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
