document.querySelector('#Inputbox').onclick = function () {
  document.querySelector('#file').click()
}
let inputFile = ''
const fileOnChange = () => {
  inputFile = file.files[0]
  compressImage(file.files[0])
}
let downloadFile = ''
document.querySelector('#quality-range').addEventListener('change', (e) => {
  document.querySelector('#quality-input').value = e.target.value
  new Compressor(inputFile, {
    quality: Number(e.target.value) / 100,
    success(result) {
      document.querySelector('#compressed-img').src =
        URL.createObjectURL(result)
      document.querySelector('#compressed-img-size').innerHTML = fileSize(
        result.size
      )
      downloadFile = result
    },
  })
})
document.querySelector('#quality-input').addEventListener('change', (e) => {
  document.querySelector('#quality-range').value = e.target.value
  new Compressor(inputFile, {
    quality: Number(e.target.value) / 100,
    success(result) {
      document.querySelector('#compressed-img').src =
        URL.createObjectURL(result)
      document.querySelector('#compressed-img-size').innerHTML = fileSize(
        result.size
      )
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
  document.getElementById('original-img').style.clipPath =
    'polygon(0 0,' + slideValue + '% 0,' + slideValue + '% 100%, 0 100%)'
  console.log(
    'polygon(0 0,' + slideValue + '% 0,' + slideValue + '% 100%, 0 100%)'
  )
}
const compressImage = (file) => {
  document.querySelector('.custom-box').style.display = 'none'
  let quality = Number(document.querySelector('#quality-range').value) / 100
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
