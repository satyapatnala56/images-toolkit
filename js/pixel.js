const getDetail = document.querySelector('#get-detail')
const gdrive = document.querySelector('#filepicker')
const inputBox = document.querySelector('#Inputbox')
const fileDropBox = document.querySelector('.custom-box')
const cropBoxPanel = document.getElementById('crop-box-panel')
const downloadButton = document.querySelector('#download-button')
const maxheight = document.querySelector('#maxheight')
const maxwidth = document.querySelector('#maxwidth')
const blocksize = document.querySelector('#blocksize')
const greyscale = document.querySelector('#greyscale')
const reset = document.querySelector('#reset')
let imgHeight = getDetail.dataset.height
let imgWidth = getDetail.dataset.width
let palettechecked = false
let imageOriginalHeight = null
let imageOriginalWidth = null

let px = null
downloadButton.addEventListener('click', function (e) {
  px.saveImage()
})
let currentPalette = 0

const paletteList = [
  [
    [7, 5, 5],
    [33, 25, 25],
    [82, 58, 42],
    [138, 107, 62],
    [193, 156, 77],
    [234, 219, 116],
    [160, 179, 53],
    [83, 124, 68],
    [66, 60, 86],
    [89, 111, 175],
    [107, 185, 182],
    [251, 250, 249],
    [184, 170, 176],
    [121, 112, 126],
    [148, 91, 40],
  ],
  [
    [13, 43, 69],
    [32, 60, 86],
    [84, 78, 104],
    [141, 105, 122],
    [208, 129, 89],
    [255, 170, 94],
    [255, 212, 163],
    [255, 236, 214],
  ],
  [
    [43, 15, 84],
    [171, 31, 101],
    [255, 79, 105],
    [255, 247, 248],
    [255, 129, 66],
    [255, 218, 69],
    [51, 104, 220],
    [73, 231, 236],
  ],
  [
    [48, 0, 48],
    [96, 40, 120],
    [248, 144, 32],
    [248, 240, 136],
  ],
  [
    [239, 26, 26],
    [172, 23, 23],
    [243, 216, 216],
    [177, 139, 139],
    [53, 52, 65],
    [27, 26, 29],
  ],
  [
    [26, 28, 44],
    [93, 39, 93],
    [177, 62, 83],
    [239, 125, 87],
    [255, 205, 117],
    [167, 240, 112],
    [56, 183, 100],
    [37, 113, 121],
    [41, 54, 111],
    [59, 93, 201],
    [65, 166, 246],
    [115, 239, 247],
    [244, 244, 244],
    [148, 176, 194],
    [86, 108, 134],
    [51, 60, 87],
  ],
  [
    [44, 33, 55],
    [118, 68, 98],
    [237, 180, 161],
    [169, 104, 104],
  ],

  [
    [171, 97, 135],
    [235, 198, 134],
    [216, 232, 230],
    [101, 219, 115],
    [112, 157, 207],
    [90, 104, 125],
    [33, 30, 51],
  ],
  [
    [140, 143, 174],
    [88, 69, 99],
    [62, 33, 55],
    [154, 99, 72],
    [215, 155, 125],
    [245, 237, 186],
    [192, 199, 65],
    [100, 125, 52],
    [228, 148, 58],
    [157, 48, 59],
    [210, 100, 113],
    [112, 55, 127],
    [126, 196, 193],
    [52, 133, 157],
    [23, 67, 75],
    [31, 14, 28],
  ],
  [
    [94, 96, 110],
    [34, 52, 209],
    [12, 126, 69],
    [68, 170, 204],
    [138, 54, 34],
    [235, 138, 96],
    [0, 0, 0],
    [92, 46, 120],
    [226, 61, 105],
    [170, 92, 61],
    [255, 217, 63],
    [181, 181, 181],
    [255, 255, 255],
  ],
  [
    [49, 31, 95],
    [22, 135, 167],
    [31, 213, 188],
    [237, 255, 177],
  ],
  [
    [21, 25, 26],
    [138, 76, 88],
    [217, 98, 117],
    [230, 184, 193],
    [69, 107, 115],
    [75, 151, 166],
    [165, 189, 194],
    [255, 245, 247],
  ],
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
  document.querySelector('#file-loader').style.display = 'flex'
  document.querySelector('.file-input').style.display = 'none'
  inputFile = file
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target.result) {
        let image = new Image()
        image.onload = () => {
          imageOriginalHeight = image.height
          imageOriginalWidth = image.width
          maxheight.value = imgHeight !== '0' ? Number(imgHeight) : image.height
          maxwidth.value = imgWidth !== '0' ? Number(imgWidth) : image.width
          image.setAttribute('id', 'pixel-img')
          px = new pixelit({ from: image })
          pixelitimg()
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
const pixelitimg = () => {
  px.setScale(27 - blocksize.value)
    .setPalette(paletteList[currentPalette])
    .draw()
    .pixelate()

  greyscale.checked ? px.convertGrayscale() : null
  palettechecked ? px.convertPalette() : null
  maxheight.value ? px.setMaxHeight(maxheight.value).resizeImage() : null
  maxwidth.value ? px.setMaxWidth(maxwidth.value).resizeImage() : null
}
const makePaletteGradient = () => {
  let pdivs = ''
  document.querySelector('#palettecolor').innerHTML = ''
  paletteList.forEach((palette, i) => {
    const option = document.createElement('option')
    option.value = i
    palette.forEach((elem) => {
      let div = document.createElement('div')
      div.classList = 'colorblock'
      div.style.backgroundColor = `rgba(${elem[0]},${elem[1]},${elem[2]},1)`
      option.appendChild(div)
    })
    document.getElementById('paletteselector').appendChild(option)
  })
}

makePaletteGradient()
new SlimSelect({
  hideSelectedOption: true,
  showSearch: false,
  select: '#paletteselector',
  onChange: (info) => {
    currentPalette = info.value
    palettechecked = true
    pixelitimg()
  },
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
const handleDownload = () => {
  px.saveImage()
}
maxheight.addEventListener('change', pixelitimg)
maxwidth.addEventListener('change', pixelitimg)

blocksize.addEventListener('change', function (e) {
  document.querySelector('#blockvalue').innerText = this.value
  pixelitimg()
})

greyscale.addEventListener('change', pixelitimg)
reset.addEventListener('click', () => {
  palettechecked = false
  greyscale.checked = false
  maxheight.value = imageOriginalHeight
  maxwidth.value = imageOriginalWidth
  blocksize.value = 2
  document.querySelector('#blockvalue').innerText = 2
  pixelitimg()
})
