console.log('connected!')
const canvasPanel = document.getElementById('canvasconatiner')
let imageSource = ''
var arrayanimate = []
let animateimage = []
let animatedImage=null;
document.querySelector(".radio-picture-selector-2").addEventListener("change",(e)=>{
  animateimage=[];
})
document.querySelector(".radio-picture-selector-1").addEventListener("change",(e)=>{
  animateimage=[];
})

function imagepicker() {
  if (document.querySelector('#left').checked) {
    if (document.querySelector('#speech').checked) {
      imageSource = 'img/left-speech-bubble.png'
    } else if (document.querySelector('#thought').checked) {
      imageSource = 'img/left-thought-bubble.png'
    }
  } else if (document.querySelector('#right').checked) {
    if (document.querySelector('#speech').checked) {
      imageSource = 'img/right-speech-bubble.png'
    } else if (document.querySelector('#thought').checked) {
      imageSource = 'img/right-thought-bubble.png'
    }
  }
}
document
  .querySelector('#finalclick')
  .addEventListener(onclick, () => drawImage())
let drawImage = () => {
  
  const textColor = 'black'
  const fontSize = '30'
  canvasPanel.innerHTML = ''
  const canvas = document.createElement('canvas')
  let ctx = canvas.getContext('2d')
  const image = document.createElement('img')
  imagepicker()
  image.src = imageSource
  image.width=`${inputtext.value.length}*2 px`
  console.log(image.width)
  image.crossOrigin = 'Anonymous'
  image.onload = () => {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
    ctx.font = `400 ${fontSize}px 'Minecraft',sans-serif`
    ctx.fillStyle = textColor
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(`${inputtext.value}`, canvas.width / 2, canvas.height / 3)
    canvasPanel.appendChild(canvas)
  }
  animate()
}
document.querySelector('#downloadbtn').addEventListener('click', handledownload)
function handledownload() {
  if(document.querySelector("#animate").checked){
    console.log(animatedImage)
    var url = animatedImage.src
    fetch(url)
      .then((res) => res.blob())
      .then((bloburl) => {
        let a = document.createElement('a')
        console.log(bloburl)
        a.href = URL.createObjectURL(bloburl)
        a.download = `safeimagekit.gif`
        document.body.appendChild(a)
        a.click()
      })
  }
  else{
    let canvas1 = document.getElementsByTagName('canvas')[0]
    let dataURL = canvas1.toDataURL('image/png')
    console.log(canvas1)
    let a = document.createElement('a')
    a.href = dataURL
    a.download = 'Safeimagekit.png'
    a.click()
  }
}

const animatedraw = (text) => {
  return new Promise((resolve) => {
    const textColor = 'black'
    const fontSize = '30'
    canvasPanel.innerHTML = ''
    const canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')
    const image = document.createElement('img')
    imagepicker()
    image.src = imageSource
    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
      ctx.font = `400 ${fontSize}px 'Minecraft' , sans-serif`
      ctx.fillStyle = textColor
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(`${text}`, canvas.width / 2, canvas.height / 3)
      animateimage.push(canvas.toDataURL().toString())
      resolve()
    }
  })
}
const animate = async () => {
  if (document.querySelector('#animate').checked) {
    var inputtext = document.querySelector('#inputtext')
    let edittext = inputtext.value.split('')
    edittext.map((i, index) => {
      let newstr = ''
      for (i = 0; i < index + 1; i++) {
        newstr += edittext[i]
      }
      arrayanimate.push(newstr)
    })
    Promise.all(
      arrayanimate.map((draw, index) => {
        return new Promise((resolve) => {
          animatedraw(draw).then(() => {
            resolve()
          })
        })
      })
    ).then(() => {
      gifshot.createGIF(
        {
          images: [...animateimage],
          interval:0.5,
        },
        function (obj) {
          if (!obj.error) {
            var image = obj.image
              animatedImage = document.createElement('img')
            animatedImage.src = image;
            canvasPanel.innerHTML="";
            canvasPanel.appendChild(animatedImage)
          }
        }
      )
    })
  }
}



