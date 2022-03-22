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
let croppedImageHeight = ''
const cropInputHeight = document.querySelector('#crop-height')
const cropInputWidth = document.querySelector('#crop-width')
let fileType = ''
Array.from(mediaCrop).map((item) => {
  item.addEventListener('click', (e) => {
    document.querySelector('.alert').style.display = 'none'
    document.querySelector('#dropdownMenuButton').innerHTML = e.currentTarget.id
    if (e.currentTarget.id === 'freely') {
      cropInputHeight.disabled = false
      cropInputWidth.disabled = false
      setId = 'freely'
      cropper.setAspectRatio(NaN)
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

          let data = ` <div class="col-sm-4 mx-auto mb-3"> <button class='media-choose' data-width='${
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
          mediaDimensions.innerHTML = ` <div class="col-12"> <div class='options-title mb-2'> ${find.name}:</div> </div> <div class="list-crop-options row"> ${html} </div>`
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
    }
  })
})
let data = [
  {
    name: 'Facebook',
    'profile picture': [180, 180],
    'link image': [1200, 630],
    'image post': [1200, 630],
    coverphoto: [820, 312],
    'event image': [1920, 1005],
    'group cover': [1640, 856],
    'market place': [1200, 1200],
    'instant articles': [1200, 1200],
    'highlighed image': [1200, 717],
    stories: [1080, 1920],
    'right column': [1200, 1200],
    feed: [1080, 1350],
  },

  {
    name: 'Instagram',
    'profile picture': [320, 320],
    'square post': [1080, 1080],
    'landscape post': [1080, 566],
    'ad square': [1080, 1080],
    stories: [1080, 1920],
    'potrait post': [1080, 1350],
    'ad potrait': [1080, 1350],
    'ad landscape': [1080, 566],
    'photo thumbnails': [161, 161],
    reels: [1080, 1920],
    'IGTV content': [420, 654],
    feed: [1080, 1350],
  },

  {
    name: 'Youtube',
    'profile picture': [800, 800],
    banner: [2560, 1440],
    thumbnail: [1280, 720],
    'display ads': [300, 250],
    'banner ads': [300, 60],
    'overlay ads': [480, 60],
  },

  {
    name: 'Linkedin',
    'logo size': [300, 300],
    'tab image': [1128, 376],
    'dynamic ad': [100, 100],
    'background photo': [1584, 396],
    'profile picture': [400, 400],
    'sponsored content': [1200, 627],
    'link post': [1200, 627],
    'cover photo': [1128, 191],
    stories: [1080, 1920],
    'blog post link': [1200, 627],
    'buisness banner': [636, 220],
    'square post': [1200, 1200],
    'potrait post': [1080, 1350],
  },

  {
    name: 'Email',
    'blog image': [750, 750],
    'blog featured': [1200, 600],
    'header image': [600, 200],
  },
  {
    name: 'Freely',
  },

  {
    name: 'Tiktok',
    'in-feed ad image': [1080, 1080],
    'profile photo': [200, 200],
    'vertical video ad': [1080, 1920],
    'square video ad': [1080, 1080],
    'horizontal video ad': [1920, 1080],
  },

  {
    name: 'Squarespace',
    'preferred image': [1500, 2500],
    'banner  photo': [2000, 2500],
    'vertical image': [1000, 1500],
  },

  {
    name: 'Twitter',
    'profile photo': [300, 400],
    header: [1500, 500],
    'post image': [1200, 675],
    'conversation card': [800, 418],
    'website card ad': [800, 800],
    'app card ad': [800, 800],
    'fleets images': [1080, 1920],
    'card image': [120, 120],
    carousels: [800, 800],
    'direct message': [800, 418],
    'video thumbnail': [640, 360],
  },
  {
    name: 'Tumblr',
    'Profile picture': [128, 128],
    'Image post': [500, 750],
  },
  {
    name: 'Pinterest',
    'portrait carousel': [1000, 1500],
    'profile photo': [165, 165],
    'square carousel': [1000, 1000],
    'story pins': [1080, 1920],
    'vertical pin': [1000, 1500],
    'board display': [222, 150],
  },

  {
    name: 'Snapchat',
    'image share': [1080, 1920],
  },

  {
    name: 'Google Banner Ads',
    'Display skyscraper': [120, 600],
    'Display vertical rectangle': [240, 400],
    'Display square': [250, 250],
    'Display half banner': [234, 60],
    'Display medium rectangle': [300, 250],
    'Display small square': [200, 200],
    'Display netboard': [580, 400],
    'Display wide skyscraper': [160, 600],
    'Display half-page ad': [300, 600],
    'Display leaderboard': [728, 90],
    'Display mobile banner': [300, 50],
    'Display banner': [468, 60],
    'Display triple widescreen': [250, 360],
    'Display portrait': [300, 1050],
    'Display large leaderboard': [970, 90],
    'Display inline rectangle': [300, 250],
    'Display large mobile banner': [320, 50],
    'Display top banner': [930, 180],
    'Display large rectangle': [336, 280],
    'Display panorama': [980, 120],
    'Display large mobile banner ': [320, 100],
    'Display billboard': [970, 250],
  },

  {
    name: 'Discord',
    'Discord Profile Photo Size': [128, 128],
    'Discord Server Icon Size': [512, 512],
    'Discord Emoji Size': [32, 32],
    'Discord Server Banner Background Size': [960, 540],
    'Discord Server Invite Splash Image Size': [1920, 1080],
  },

  {
    name: 'Soundcloud',
    'Profile Photo': [1000, 1000],
    'Album Cover': [800, 800],
    'Minimum Header': [2480, 520],
  },

  {
    name: 'Whatsapp',
    'Profile Image for WhatsApp': [500, 500],
    'Post to send by WhatsApp (Square)': [800, 800],
    'Stories to Share in WhatsApp': [750, 1334],
  },

  {
    name: 'Twitch',
    'Profile Photo': [800, 800],
    'Profile Banner': [1920, 480],
    'Video Player Banner': [1920, 1080],
    'Video Thumbnail': [1280, 720],
    'Cover Image': [380, 1200],
    'Info Panels': [320, 200],
  },

  {
    name: 'Printing',
    '400x600': [400, 600],
    '1000x1500': [1000, 1500],
    '1200x1800': [1200, 1800],
    '2000x3000': [2000, 3000],
    '3000x4500': [3000, 4500],
    '4000x6000': [4000, 6000],
    '4800x7200': [4800, 7200],
    '6000x9000': [6000, 9000],
    '12000x18000': [12000, 18000],
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
            ready() {
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
  let cropperImg = cropper
    .getCroppedCanvas({
      width: cropInputWidth.value,
      height: cropInputHeight.value,
    })
    .toDataURL()
  let a = document.createElement('a')
  a.href = cropperImg
  a.download = `Safeimagekit-cropped-img.${fileType}`
  document.body.appendChild(a)
  a.click()
  if (lang === 'en') {
    window.location.href = `/download?tool=${pageTool}`
  } else {
    window.location.href = `/${lang}/download?tool=${pageTool}`
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
