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
// let cropper = ''
let setId = 'freely'
let croppedImageWidth = ''
let croppedImageHeight = ''
const cropInputHeight = document.querySelector('#crop-height')
const cropInputWidth = document.querySelector('#crop-width')
let fileType = ''


let blob2 = null;

const showLoader = () => {
    showLoading()
}
const closeLoader = () => { }
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
    const BlobUrl = URL.createObjectURL(file);
    const img = new Image();
    img.src = BlobUrl;
    img.onload = function () {
        console.log(img.height);
        // document.querySelector("#gifDiv").style.height = `${img.height}px`;
        // document.querySelector("#gifDiv").style.width = `${img.width}px`;
        document.querySelector("#gifDiv").style.height = `auto`;
        document.querySelector("#gifDiv").style.width = `100%`;
    }

    const reader = new FileReader;

    reader.onerror = function (e) {
        console.log(e)
    }

    if (file) {
        reader.readAsDataURL(file);
    }
    reader.onload = function (e) {
        document.getElementById('gif').src = e.target.result;
        var URLs = window.URL || window.webkitURL;
        var gifImg = document.querySelector("#gif");
        console.log(gifImg.height);
        console.log(gifImg.width);
        var previewImg = document.all.preview;
        var tmp = document.all.tmp;

        // document.querySelector("#gifDiv").style.height = gifImg.height / 3;
        // document.querySelector("#gifDiv").style.width = gifImg.width / 3;

        var cropper = new Cropper(gifImg, {
            zoomable: false
            // viewMode: 3,
            // dragMode: 'crop',
            // aspectRatio: 16/9,
            // autoCrop: true,
            // autoCropArea: 3,
            // cropBoxResizable: false,
            // cropBoxMovable: false,
            // ready: function(){
            //     cropper.rotate(10);
            // }
        });

        function cropGif() {
            document.getElementById("previewLoading").style.display = "block";
            document.getElementById("preview").src = "";
            
            CropperjsGif.crop({
                // debug: true,
                encoder: {
                    workers: 2,
                    quality: 10,
                    workerScript: "/js/gif_cropper/gif.worker.js"
                },
                src: gifImg.src,
                background: '#fff',
                maxWidth: 600,
                maxHeight: 600,
                onerror: function (code, error) {
                    console.log(code, error)
                }
            },
                cropper,
                function (blob) {
                    document.getElementById("previewLoading").style.display = "none";
                    previewImg.src = URL.createObjectURL(blob);
                    console.log(blob);
                    blob2 = blob;

                    // // test send blob
                    // var xhr = new XMLHttpRequest();
                    // xhr.open('POST', "/post/test");
                    // xhr.onprogress = function (e) {
                    //     tmp.innerText = "upload progress: " + e.loaded;
                    // };
                    // xhr.onreadystatechange = function (e) {
                    //     tmp.innerText = "upload status: " + xhr.status + ", " + xhr.readyState;
                    // }
                    // if (blob.slice) {
                    //     xhr.send(blob.slice(0, 10))
                    // } else {
                    //     var fileReader = new FileReader();
                    //     fileReader.onload = function (event) {
                    //         xhr.send(event.target.result)
                    //     };
                    //     fileReader.readAsArrayBuffer(blob);
                    // }

                    // URLdata = blob;
                    // downloadButton.addEventListener('click', function(){
                    //     console.log("Hiii");
                    // });
                    // function downloadGif(){
                    //     var reader2 = new FileReader();
                    //     reader2.onload = function () {
                    //         var url = window.URL.createObjectURL(blob);
                    //         var a = document.createElement("a");
                    //         a.href = url;

                    //         a.download = "C_";
                    //         document.body.appendChild(a);
                    //         a.click();
                    //         if (lang === "en") {
                    //             window.location.href = `/download?tool=${pageTool}`;
                    //         } else {
                    //             window.location.href = `/${lang}/download?tool=${pageTool}`;
                    //         }
                    //     };
                    //     reader2.readAsDataURL(blob);
                    // }
                    // document.getElementById("downloadButton").onclick = function () {
                    //     var reader2 = new FileReader();
                    //     reader2.onload = function () {
                    //         var url = window.URL.createObjectURL(blob);
                    //         var a = document.createElement("a");
                    //         a.href = url;

                    //         a.download = "C_";
                    //         document.body.appendChild(a);
                    //         a.click();
                    //         if (lang === "en") {
                    //             window.location.href = `/download?tool=${pageTool}`;
                    //         } else {
                    //             window.location.href = `/${lang}/download?tool=${pageTool}`;
                    //         }
                    //     };
                    //     reader2.readAsDataURL(blob);
                    // };
                });
        }

        window.cropGif = cropGif;
        window.cropper = cropper;
    }
    // fileType = file.type.split('/')[1]
    // document.querySelector('#file-loader').style.display = 'flex'
    // document.querySelector('.file-input').style.display = 'none'
    // inputFile = file
    // if (file) {
    //     const reader = new FileReader()
    //     reader.onload = (e) => {
    //         if (e.target.result) {
    //             let image = new Image()
    //             image.onload = () => {
    //                 croppedImageWidth = image.width
    //                 croppedImageHeight = image.height
    //                 let img = document.createElement('img')
    //                 img.id = 'image'
    //                 img.src = e.target.result
    //                 cropBoxPanel.appendChild(img)
    //                 cropper = new Cropper(img, {
    //                     ready() {
    //                         downloadButton.addEventListener('click', handleDownload)
    //                         this.cropper.crop()
    //                     },
    //                     crop(event) {
    //                         if (setId === 'freely') {
    //                             cropInputWidth.value = Math.round(event.detail.width)
    //                             cropInputHeight.value = Math.round(event.detail.height)
    //                         }
    //                     },
    //                 })
    //             }
    //             image.src = e.target.result
    //         }
    //     }
    //     reader.readAsDataURL(file)
    // }
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
// const handleDownload = () => {
//     document.getElementById('saving-data').style.display = 'block'
//     cropBoxPanel.style.display = 'none'
//     let cropperImg = cropper
//         .getCroppedCanvas({
//             width: cropInputWidth.value,
//             height: cropInputHeight.value,
//         })
//         .toDataURL()
//     let a = document.createElement('a')
//     a.href = cropperImg
//     a.download = `Safeimagekit-cropped-img.${fileType}`
//     document.body.appendChild(a)
//     a.click()
//     if (lang === 'en') {
//         window.location.href = `/download?tool=${pageTool}`
//     } else {
//         window.location.href = `/${lang}/download?tool=${pageTool}`
//     }
// }

// function ratio(val, lim) {
//     var lower = [0, 1]
//     var upper = [1, 0]

//     while (true) {
//         var mediant = [lower[0] + upper[0], lower[1] + upper[1]]

//         if (val * mediant[1] > mediant[0]) {
//             if (lim < mediant[1]) {
//                 return upper
//             }
//             lower = mediant
//         } else if (val * mediant[1] == mediant[0]) {
//             if (lim >= mediant[1]) {
//                 return mediant
//             }
//             if (lower[1] < upper[1]) {
//                 return lower
//             }
//             return upper
//         } else {
//             if (lim < mediant[1]) {
//                 return lower
//             }
//             upper = mediant
//         }
//     }
// }


// const Downloadgif = ()=>{
//     console.log(1);
//     // var reader2 = new FileReader();
//     // reader2.onload = function () {
//         console.log(URLdata);
//         var url = window.URL.createObjectURL(URLdata);
//         var a = document.createElement("a");
//         a.href = url;

//         a.download = "C_" + input.name;
//         document.body.appendChild(a);
//         a.click();
//         if (lang === "en") {
//         window.location.href = `/download?tool=${pageTool}`;
//         } else {
//         window.location.href = `/${lang}/download?tool=${pageTool}`;
//         }
//     // };
//     // reader2.readAsDataURL(URLdata);
// }


function downloadGif() {
    var reader2 = new FileReader();
    reader2.onload = function () {
        var url = window.URL.createObjectURL(blob2);
        var a = document.createElement("a");
        a.href = url;

        a.download = "C_";
        document.body.appendChild(a);
        a.click();
        if (lang === "en") {
            window.location.href = `/download?tool=${pageTool}`;
        } else {
            window.location.href = `/${lang}/download?tool=${pageTool}`;
        }
    };
    reader2.readAsDataURL(blob2);
}