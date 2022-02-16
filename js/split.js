const getScript = document.currentScript
const pageTool = getScript.dataset.tool
const lang = getScript.dataset.lang
const gdrive = document.querySelector('#filepicker')
const inputBox = document.querySelector('#Inputbox')
const fileDropBox = document.querySelector('.custom-box')
const cropBoxPanel = document.getElementById('crop-box-panel')
const downloadButton = document.querySelector('#download-button')
let cropper = ''
let rows = 3
let columns = 3
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
let inputFile = ''
const handleFile = (file) => {
  document.querySelector('#file-loader').style.display = 'flex'
  document.querySelector('.file-input').style.display = 'none'
  inputFile = file
  if (file) {
    const actionButtons = document.getElementsByClassName('action-buttons')
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
            guides: false,
            ready() {
              updateCells()
              Array.from(actionButtons).map((item) => {
                item.addEventListener('click', (e) => {
                  switch (e.target.dataset.type) {
                    case 'col-plus':
                      columns += 1
                      break
                    case 'col-minus':
                      columns != 1 ? (columns -= 1) : columns
                      break
                    case 'row-plus':
                      rows += 1
                      break
                    case 'row-minus':
                      rows != 1 ? (rows -= 1) : rows
                      break
                    default:
                      break
                  }
                  updateCells()
                })
              })
              downloadButton.addEventListener('click', handleDownload)
              this.cropper.crop()
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
const updateCells = () => {
  document.querySelector('#cols-number').innerHTML = columns
  document.querySelector('#rows-number').innerHTML = rows
  let columnsData = ''
  Array.from(Array(columns).keys()).map((i) => {
    columns - 1 === i
      ? (columnsData += `<div class="cell last-child" ></div>`)
      : (columnsData += `<div class="cell" ></div>`)
  })
  let appendData = ''
  Array.from(Array(rows).keys()).map((i) => {
    rows - 1 === i
      ? (appendData += `<div class='row-item last-child'>${columnsData}</div>`)
      : (appendData += `<div class='row'>${columnsData}</div>`)
  })

  document.querySelector('.cropper-center').innerHTML = appendData
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
  let fileType = document.querySelector('#image-format').value
  cropBoxPanel.style.display = 'none'
  let cropperImg = cropper
    .getCroppedCanvas({ width: croppedImageWidth, height: croppedImageHeight })
    .toDataURL()
  let blob = dataURLtoBlob(cropperImg)
  let reader = new FileReader()
  reader.readAsDataURL(blob)
  reader.onload = function (evt) {
    let image = new Image()
    image.onload = function () {
      let om = document.createElement('img')
      document.body.appendChild(om)
      let imagePieces = []
      let colWidth = image.width / columns
      let rowHeight = image.height / rows
      for (var x = 0; x < rows; ++x) {
        for (var y = 0; y < columns; ++y) {
          var canvas = document.createElement('canvas')
          var context = canvas.getContext('2d')
          canvas.height = rowHeight
          canvas.width = colWidth
          context.drawImage(
            image,
            y * colWidth,
            x * rowHeight,
            colWidth,
            rowHeight,
            0,
            0,
            colWidth,
            rowHeight
          )
          imagePieces.push(canvas.toDataURL(`image/${fileType}`))
        }
      }
      let zip = new JSZip()
      let zipFiles = zip.folder(`${inputFile.name}-safeimagekit`)
      imagePieces.map((file, index) => {
        zipFiles.file(
          `${
            inputFile.name.split('.')[0] + index + 1
          }-safeimagekit.${fileType}`,
          getBase64String(file),
          { base64: true }
        )
      })
      document.getElementById('saving-data').style.display = 'none'
      document.querySelector('#file-loader').style.display = 'none'
      document.querySelector('.split-img-box').style.display = 'none'
      cropBoxPanel.style.display = 'none'
      fileDropBox.style.display = 'flex'
      document.querySelector('.saving-file-download-wrap').style.display =
        'flex'
      document.querySelector('#download-zip').addEventListener('click', () => {
        zip.generateAsync({ type: 'blob' }).then(function (content) {
          saveAs(content, `${inputFile.name}-safeimagekit.zip`)
          if (lang === 'en') {
            window.location.href = `/download?tool=${pageTool}`
          } else {
            window.location.href = `/${lang}/download?tool=${pageTool}`
          }
        })
      })
    }
    image.src = evt.target.result
  }
}

const getBase64String = (dataURL) => {
  const idx = dataURL.indexOf('base64,') + 'base64,'.length
  return dataURL.substring(idx)
}
const dataURLtoBlob = (dataurl) => {
  let arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}
