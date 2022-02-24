const getScript = document.currentScript;
const pageTool = getScript.dataset.tool;
const lang = getScript.dataset.lang;
var container = document.querySelector('.container2');
var inputbox = document.querySelector('#inputbox');
var content = document.querySelector('#content');
var file = document.querySelector('#file');
var box = document.querySelector('.box');
var rotate = document.querySelector('#rotate_input') || 0;
var rotate_value_range = document.querySelector('#rotate_value_range') || 0;
var input;


let aspectRatio;

let orgHeight, orgWidth;
let newHeight, newWidth;

let svgUrl = null;


container.ondragover = function (e) {
    e.preventDefault()
}
var boxContainer = document.querySelector('.container2')
const gdrive = document.querySelector('#filepicker')
const getFile = (file) => {
    onFileDrop(file, 1)
}
const showLoader = () => {
    document.querySelector('#inputbox').style.display = 'none'
    var loaderbox = document.createElement('div')
    loaderbox.id = 'loader-box'
    var mainDiv = document.querySelector('#loaderDiv .col')
    mainDiv.insertBefore(loaderbox, mainDiv.childNodes[1])
    document.querySelector('#loader').innerHTML = '<p id="loadingMessage"></p>'
    document.querySelector('#loadingMessage').innerHTML =
        'Please Wait ,Loading Your file '
}
const closeLoader = () => { }
const mimeTypes = 'image/png,image/jpg,image/jpeg,image/webp'
const filemimes = ['.png', '.webp', '.jpg', '.jpeg', '.svg']
gdrive.addEventListener(
    'click',
    (getFile, mimeTypes, showLoader, closeLoader) => {
        const data = loadPicker()
    }
)
const getDropBoxFile = (file) => {
    onFileDrop(file, 1)
}
const dropbox = document.getElementById('dropbox')
dropbox.addEventListener(
    'click',
    async (getDropBoxFile, showLoader, closeLoader) => {
        const getFile = chooseFromDropbox()
    }
)
boxContainer.ondrop = (e) => {
    e.preventDefault()
    onFileDrop(e.dataTransfer.files[0])
}
const onFileDrop = (file, flag = 0) => {
    input = file
    var extension = input.name.replace(/^.*\./, '')
    if (
        extension == 'webp' ||
        extension == 'jpg' ||
        extension == 'jpeg' ||
        extension == 'png' ||
        extension == 'svg'
    ) {
        if (flag == 0) {
            showLoader()
        }

        inputbox.style.display = 'none'
        container.style.height = '300px'
        convert_webp()
    } else {
        container.style.height = '350px'
        document.querySelector('#error').style.visibility = 'visible'

        document.querySelector('#error').style.visibility = 'visible'
        document.querySelector('#error').innerHTML = 'File not supported'
    }
}
const fileOnChange = () => {
    showLoader()

    input = file.files;
    container.style.height = '300px'
    convert_webp()
}
function convert_webp() {
    document.querySelector('.success_alert').style.visibility = 'hidden'
    /////loader starting
    $('#file').remove()
    setTimeout(function () {
        webp_to_img()
    }, 6000)
    var count = 0
    var ans = setInterval(function () {
        count = count + 10
        document.querySelector('#upper-loader').style.width = count + '%'
        if (count == 110) {
            document.querySelector('#upper-loader').style.display = 'none'
            document.querySelector('#loaderDiv').style.display = 'none'
            document.querySelector('#content').style.visibility = 'visible'
            document.querySelector('#loader-box').style.display = 'none'
            document.querySelector('.container2').style.height = 'auto'
            document.querySelector('#footer_div').style.paddingTop = '30px'
            document.querySelector('.container2').style.background = '#fff'
            document.querySelector('.box').style.borderRadius = '20px'
            document.querySelector('.container2').style.borderRadius = '25px'
            document.querySelector('.box').style.background = '#ffffff'
            document.querySelector('.box-border').style.background = '#ffffff'
            document.querySelector('.box-border').style.border = 'none'
            window.location.href = '#'
            clearInterval(ans)
        }
    }, 600)
    function webp_to_img() {
        
        document.querySelector('.success_alert').style.visibility = 'hidden';
        
        let files = input;
        
        let orgHeight, orgWidth;

        for (let i = 0; i < files.length; i++) {
            let file = files.item(i);
            console.log(file);


            const blobURL = URL.createObjectURL(file);
            const img = new Image();
            img.src = blobURL;
            img.onerror = function () {
                URL.revokeObjectURL(this.src);
                // Handle the failure properly
                console.log("Cannot load image");
            };
            img.onload = function () {
                URL.revokeObjectURL(this.src);
                // document.getElementById("myHeight").setAttribute("value", `${img.height}`);
                // document.getElementById("myWidth").setAttribute("value", `${img.width}`);
                orgHeight = img.height;
                orgWidth = img.width;
                // aspectRatio = img.height / img.width;
                console.log(orgHeight);
                let preDiv = document.createElement("div");
                let preImage = document.createElement("img");
                let preSize = document.createElement("spam");
                preSize.innerText = `${orgHeight}` + " X " + `${orgWidth}`;
                // console.log(file.height);
                preImage.setAttribute("id", "preview" + `${i}`)
                preImage.setAttribute("class", "previewImg")
                preImage.setAttribute("height", "70px");
                preDiv.setAttribute("class", "previewDiv");
                preDiv.append(preImage);
                preDiv.append(preSize);
                document.getElementById("output_div_inner").append(preDiv);
                if (file) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        document.getElementById('preview' + `${i}`).src = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            };
        }







        // // var r = new FileReader()





        // // input.onchange = function (ev) {
        // // const file = ev.target.files[0]; // get the file
        // const blobURL = URL.createObjectURL(input);
        // const img = new Image();
        // img.src = blobURL;

        // const reader = new FileReader();

        // reader.onload = function (e) {
        //     document.getElementById('preview').src = e.target.result;
        // };

        // if (input) {
        //     reader.readAsDataURL(input);
        // }

        // img.onerror = function () {
        //     URL.revokeObjectURL(this.src);
        //     // Handle the failure properly
        //     console.log("Cannot load image");
        // };
        // img.onload = function () {
        //     URL.revokeObjectURL(this.src);
        //     document.getElementById("myHeight").setAttribute("value", `${img.height}`);
        //     document.getElementById("myWidth").setAttribute("value", `${img.width}`);
        //     orgHeight = img.height;
        //     orgWidth = img.width;
        //     aspectRatio = img.height / img.width;
        //     // console.log(aspectRatio);
        // };
        // };
    }
}
document.querySelector('#Inputbox').onclick = function () {
    document.querySelector('#file').click()
}

var inputs = document.querySelectorAll('#height_input,#width_input,#mimetype')

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



let useHeight = false;
let useWidth = false;
let notRatio = false;

let persentage1 = false;
let persentage2 = false;
let persentage3 = false;



const heightFnc = (myH) => {
    newHeight = parseInt(myH.value);
    console.log(newHeight)
    if (notRatio == false) {
        useHeight = true;
        useWidth = false;
    }

    // newWidth = newHeight * (orgWidth / orgHeight);
    // document.getElementById("myWidth").value = `${newWidth}`;
    // document.getElementById("myWidth").setAttribute("value", `${newWidth}`);
    // document.getElementById("myHeight").setAttribute("value", `${newHeight}`);
}


const widthFnc = (myW) => {
    newWidth = parseInt(myW.value);
    console.log(newWidth)
    if (notRatio == false) {
        useHeight = false;
        useWidth = true;
    }

    // newHeight = newWidth * (orgHeight / orgWidth);
    // document.getElementById("myHeight").value = `${newHeight}`;
    // document.getElementById("myHeight").setAttribute("value", `${newHeight}`);
    // document.getElementById("myWidth").setAttribute("value", `${newWidth}`);
}


// const notByRatio = () => {
//     useHeight = false;
//     useWidth = false;
//     notRatio = true;
// }

const aspectRatio2 = () => {
    let temp = document.getElementById("aspectRatio");
    if (temp.checked) {
        console.log("check");
        useHeight = true;
        useWidth = true;
        notRatio = false;
    } else {
        console.log("uncheck")
        useHeight = false;
        useWidth = false;
        notRatio = true;
    }
}


const oneforth = () => {
    persentage1 = true;
    persentage2 = false;
    persentage3 = false;

    useHeight = false;
    useWidth = false;
    notRatio = false;

}
const half = () => {
    persentage1 = false;
    persentage2 = true;
    persentage3 = false;

    useHeight = false;
    useWidth = false;
    notRatio = false;

}
const thirdforth = () => {
    persentage1 = false;
    persentage2 = false;
    persentage3 = true;

    useHeight = false;
    useWidth = false;
    notRatio = false;

}



// var imagePieces = [];
var myMap = new Map();




const ResizeImage = () => {


    let MIME_TYPE;
    let QUALITY = 1;
    // const input = document.querySelector('#imageFile');

    // Retrieve FileList boject
    let files = input;

    // Loop through files
    for (let i = 0; i < files.length; i++) {
        let file = files.item(i);
        console.log(file.name);
        if (file.name.split('.')[1] == 'png'){
            MIME_TYPE = "image/png";
        }else{
            MIME_TYPE = "image/jpeg";
        }

        const blobURL = URL.createObjectURL(file);
        const img = new Image();
        img.src = blobURL;
        img.onerror = function () {
            URL.revokeObjectURL(this.src);
            // Handle the failure properly
            console.log("Cannot load image");
        };
        img.onload = function () {
            URL.revokeObjectURL(this.src);



            if (useHeight == true) {
                MAX_HEIGHT = newHeight;
                MAX_WIDTH = newHeight * (img.width / img.height);
            }
            if (useWidth == true){
                MAX_WIDTH = newWidth;
                MAX_HEIGHT = newWidth * (img.height / img.width);
            }
            if (notRatio == true){
                MAX_WIDTH = newWidth;
                MAX_HEIGHT = newHeight;
            }
            if (persentage1 == true) {
                MAX_HEIGHT = img.height/4;
                MAX_WIDTH = img.width /4;
            }
            if (persentage2 == true){
                MAX_WIDTH = newWidth/2;
                MAX_HEIGHT = img.height / 2;
            }
            if (persentage3 == true){
                MAX_WIDTH = img.height*(3/4);
                MAX_HEIGHT = img.width * (3 / 4);
            }
            

            const [newWidth2, newHeight2] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT);
            const canvas = document.createElement("canvas");
            canvas.width = MAX_WIDTH;
            canvas.height = MAX_HEIGHT;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, MAX_WIDTH, MAX_HEIGHT);
            // let url = canvas.toDataURL(`${MIME_TYPE}`);
            // myMap.set(file.name, url);
            
            canvas.toBlob(
                (blob) => {
                    // Handle the compressed image. es. upload or save in local state
                    // displayInfo('Original file', file);
                    // displayInfo('Compressed file', blob);


                    var urls = URL.createObjectURL(blob);
                    myMap.set(file.name, urls);
                    // imagePieces.push(url);
                    // var a = document.createElement("a");
                    // a.href = url;
                    // a.setAttribute("target", "_blank");
                    // //   a.download = "pdfBytes";
                    // a.dispatchEvent(new MouseEvent("click"));





                },
                MIME_TYPE,
                QUALITY
            );
            // document.getElementById("root").append(canvas);
        };

        // };

        function calculateSize(img, maxWidth, maxHeight) {
            let width = img.width;
            let height = img.height;

            // calculate the width and height, constraining the proportions
            if (width > height) {
                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width = Math.round((width * maxHeight) / height);
                    height = maxHeight;
                }
            }
            return [width, height];
        }
    }
    // console.log(myMap);
    // let lastFile = false;
    // let zip = new JSZip()
    // let zipFiles = zip.folder(`safeimagekit`)
    // let mapSize = myMap.size;
    // let i = 0;
    // for (let [key, file] of myMap) {
    //     i++;
    //     if(i==mapSize-1){
    //         lastFile = true;
    //     }
    //     zipFiles.file(
    //         `${key}`,
    //         getBase64String(file),
    //         { base64: true }
    //     )
    //     console.log(zip);
    // }




    // if (lastFile == true){
        window.location.href = '#'
        document.querySelector('.box').style.background = '#ffbb33'
        document.querySelector('.box-border').style.background =
            'rgba(0, 0, 0, 0.1)'
        document.querySelector('.box-border').style.background =
            '2px dashed rgba(0, 0, 0, 0.15)'

        document.querySelector('#content').style.display = 'none'
        document.querySelector('.thankyouBox').innerHTML =
            ' <div class="row"> <div class="col col-md-12 col-sm-12 col-lg-12 col-xl-12"> <img src="/trust.svg" alt="" id="thankyouImage" /> <p id="thankyouText">Thanks for your patience</p> <span><a class="btn" id="downloadButton" onclick = "Download()">DOWNLOAD</a></span> </div> </div>'
        document.querySelector('.container2').style.height = '300px'
        document.querySelector('.container2').style.background =
            'transparent'
        document.querySelector('.container2').style.borderRadius = '0px'
        document.querySelector('.box').style.borderRadius = '0px'

        // document.querySelector('#downloadButton').addEventListener('click', () => {
        //     zip.generateAsync({ type: 'blob' }).then(function (content) {
        //         saveAs(content, `safeimagekit.zip`)
        //         if (lang === 'en') {
        //             window.location.href = `/download?tool=${pageTool}`
        //         } else {
        //             window.location.href = `/${lang}/download?tool=${pageTool}`
        //         }
        //     })
        // })
    // }

    
    

    
    // imagePieces.map((file, index) => {
    //     zipFiles.file(
    //         `${inputFile.name.split('.')[0] + index + 1
    //         }-safeimagekit.${fileType}`,
    //         getBase64String(file),
    //         { base64: true }
    //     )
    // })

}

const Download = () => {
    downloadFunc();
}

const downloadFunc = () => {
    // let zip = new JSZip()
    // let zipFiles = zip.folder(`safeimagekit`)
    // for (let [key, file] of myMap) {
    //     zipFiles.file(
    //         `${key}`,
    //         getBase64String(file),
    //         { base64: true }
    //     )
    //     console.log(zip);
    // }


    // zip.generateAsync({ type: 'blob' }).then(function (content) {
    //     saveAs(content, `safeimagekit.zip`)
    //     if (lang === 'en') {
    //         window.location.href = `/download?tool=${pageTool}`
    //     } else {
    //         window.location.href = `/${lang}/download?tool=${pageTool}`
    //     }
    // })



    console.log(myMap);
    for(let [key,value] of myMap){
        var a = document.createElement("a");
        a.href = value;
        a.download = key;
        a.click();
    }
    // for (let i = 0; i < imagePieces.length; i++) {
    //     var a = document.createElement("a");
    //     a.href = imagePieces[i];
    //     a.download = i + 1 + ".png";
    //     // a.click();
    //     // if (lang === "en") {
    //     //     window.location.href = `/download?tool=${pageTool}`;
    //     // } else {
    //     //     window.location.href = `/${lang}/download?tool=${pageTool}`;
    //     // }
    // }
};

const getBase64String = (dataURL) => {
    const idx = dataURL.indexOf('base64,') + 'base64,'.length
    return dataURL.substring(idx)
}