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
let cropper = ''
let setId = 'freely'
let croppedImageWidth = ''
let fileType = ''
let croppedImageHeight = ''
const cropInputHeight = document.querySelector('#crop-height')
const cropInputWidth = document.querySelector('#crop-width')
let shapes = document.querySelectorAll('.shape')
let imgData = ''

Array.from(shapes).map((i) => {
  i.addEventListener('click', (e) => {
    Array.from(shapes).map((item) => {
      item.style.border = 'none'
    })
    e.currentTarget.style.border = '2px solid #444'
    if (e.currentTarget.id === 'round') {
      let appendData = `<img src="/img/shapes-transparent/6.png">`
      document.querySelector('.cropper-center').innerHTML = appendData
      imgData = '/img/shapes-transparent/6.png'
    } else {
      document.querySelector('.cropper-center').innerHTML = ''
      imgData = ''
    }
  })
})
Array.from(mediaCrop).map((item) => {
  item.addEventListener('click', (e) => {
    document.querySelector('#dropdownMenuButton').innerHTML = e.currentTarget.id
    if (e.currentTarget.id === 'freely') {
      cropInputHeight.disabled = false
      cropInputWidth.disabled = false
      cropper.setAspectRatio(1)
      mediaDimensions.innerHTML = ''
    } else {
      cropInputHeight.disabled = true
      cropInputWidth.disabled = true
      let find = data.find((i) => i.name.toLowerCase() === e.currentTarget.id)
      setId = e.currentTarget.id
      let html = ''
      for (const key in find) {
        const element = find[key]
        mediaDimensions.innerHTML = ''
        if (key !== 'name') {
          let a_ratio = ratio(Number(element[0]) / Number(element[1]), 50)
          let aspectRadio = Number(element[0]) / Number(element[1])
          let height = 84 / aspectRadio
          let width = 84 * aspectRadio

          let data = ` <div class="col-sm-4mb-3"> <button class='media-choose' data-width='${
            element[0]
          }' data-height='${element[1]}' > <div style="height:${
            height > 84 ? 84 : height
          }px;width:${width > 84 ? 84 : width}px;" class='show-aspect'>${
            a_ratio[0] + ' : ' + a_ratio[1]
          }</div> </button>  <div class="type">${key}</div> <div class='value'>${
            element[0]
          }x ${element[1]}</div> 
        </div>
        `
          html += data
          mediaDimensions.innerHTML = ` <div class="col-12 px-0"> <div class='options-title mb-2'> ${find.name}:</div> </div> <div class="list-crop-options row"> ${html} </div>`
        }
      }
      Array.from(document.querySelectorAll('.media-choose')).map((i) => {
        i.addEventListener('click', (e) => {
          croppedImageWidth = e.currentTarget.dataset.width
          croppedImageHeight = e.currentTarget.dataset.height
          cropInputHeight.value = Number(e.currentTarget.dataset.height)
          cropInputWidth.value = Number(e.currentTarget.dataset.width)
          Array.from(document.querySelectorAll('.media-choose')).map((i) => {
            i.style.border = 'none'
          })
          e.currentTarget.style.border = '2px solid #444'

          cropper.setAspectRatio(
            Number(e.currentTarget.dataset.width) /
              Number(e.currentTarget.dataset.height)
          )
        })
      })
      document.querySelector('.media-choose').click()
    }
  })
})
let data = [
  {
    name: 'Facebook',
    'profile picture': [180, 180],
  },

  {
    name: 'Instagram',
    'profile picture': [320, 320],
  },

  {
    name: 'Youtube',
    'profile picture': [800, 800],
  },

  {
    name: 'Linkedin',
    'profile picture': [400, 400],
  },
  {
    name: 'Freely',
  },
  {
    name: 'Tiktok',
    'profile photo': [200, 200],
  },

  {
    name: 'Twitter',
    'profile photo': [300, 400],
  },
  {
    name: 'Tumblr',
    'Profile picture': [128, 128],
  },
  {
    name: 'Pinterest',
    'portrait carousel': [1000, 1500],
  },
  {
    name: 'Discord',
    'Discord Profile Photo Size': [128, 128],
  },

  {
    name: 'Soundcloud',
    'Profile Photo': [1000, 1000],
  },

  {
    name: 'Whatsapp',
    'Profile Image for WhatsApp': [500, 500],
  },

  {
    name: 'Twitch',
    'Profile Photo': [800, 800],
  },
]

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
              downloadButton.addEventListener('click', handleDownload)
              this.cropper.crop()
            },
            crop(event) {
              if (setId === 'freely') {
                cropInputWidth.value = Math.round(event.detail.width)
                cropInputHeight.value = Math.round(event.detail.height)
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
    width: croppedImageWidth,
    height: croppedImageHeight,
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
}

function ratio(val, lim) {
  var lower = [0, 1]
  var upper = [1, 0]

  while (true) {
    var mediant = [lower[0] + upper[0], lower[1] + upper[1]]

    if (val * mediant[1] > mediant[0]) {
      if (lim < mediant[1]) {
        return upper
      }
      lower = mediant
    } else if (val * mediant[1] == mediant[0]) {
      if (lim >= mediant[1]) {
        return mediant
      }
      if (lower[1] < upper[1]) {
        return lower
      }
      return upper
    } else {
      if (lim < mediant[1]) {
        return lower
      }
      upper = mediant
    }
  }
}
