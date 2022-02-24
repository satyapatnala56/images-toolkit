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

    input = file.files[0]
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
        document.querySelector('.success_alert').style.visibility = 'hidden'
        // var r = new FileReader()





        // input.onchange = function (ev) {
            // const file = ev.target.files[0]; // get the file
            const blobURL = URL.createObjectURL(input);
            const img = new Image();
            img.src = blobURL;

            const reader = new FileReader();

            reader.onload = function (e) {
                document.getElementById('preview').src = e.target.result;   
            };

            if (input) {
                reader.readAsDataURL(input);
            }

            img.onerror = function () {
                URL.revokeObjectURL(this.src);
                // Handle the failure properly
                console.log("Cannot load image");
            };
            img.onload = function () {
                URL.revokeObjectURL(this.src);
                document.getElementById("myHeight").setAttribute("value", `${img.height}`);
                document.getElementById("myWidth").setAttribute("value", `${img.width}`);
                orgHeight = img.height;
                orgWidth = img.width;
                aspectRatio = img.height / img.width;
                // console.log(aspectRatio);
            };
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


const heightFnc = (myH) => {
    newHeight = parseInt(myH.value);
    console.log(newHeight)
    if (notRatio == false) {
        useHeight = true;
        useWidth = false;

        newWidth = newHeight * (orgWidth / orgHeight);
    newWidth = Math.round(newWidth + Number.EPSILON)
    document.getElementById("myWidth").value = `${newWidth}`;
    document.getElementById("myWidth").setAttribute("value", `${newWidth}`);
    document.getElementById("myHeight").setAttribute("value", `${newHeight}`);
    }

    
}

const widthFnc = (myW) => {
    newWidth = parseInt(myW.value);
    console.log(newWidth)
    if (notRatio == false) {
        useHeight = false;
        useWidth = true;

        newHeight = newWidth * (orgHeight / orgWidth);
    newHeight = Math.round(newHeight + Number.EPSILON)
    document.getElementById("myHeight").value = `${newHeight}`;
    document.getElementById("myHeight").setAttribute("value", `${newHeight}`);
    document.getElementById("myWidth").setAttribute("value", `${newWidth}`);
    }

    
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


const oneforth = () =>{
    newHeight = parseInt(orgHeight/4);
    
    console.log(newHeight)
    if (notRatio == false) {
        useHeight = true;
        useWidth = false;
    }
}
const half = () =>{
    newHeight = parseInt(orgHeight/2);
    
    console.log(newHeight)
    if (notRatio == false) {
        useHeight = true;
        useWidth = false;
    }
}
const thirdforth = () =>{
    newHeight = parseInt(orgHeight*(3/4));
    
    console.log(newHeight)
    if (notRatio == false) {
        useHeight = true;
        useWidth = false;
    }
}








const ResizeImage = () => {
    // console.log(1);
    // const input = document.getElementById("imageFile");
    // const file = input.files[0];

    const blobURL = URL.createObjectURL(input);
    const img = new Image();
    img.src = blobURL;

    // const preview = document.querySelector('img');
    // const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function () {
        // convert image file to base64 string
        // preview.src = reader.result;
        var svg = atob(reader.result.replace(/data:image\/svg\+xml;base64,/, ""));
        let newSvg = document.createElement("svg");

        const parser = new DOMParser();
        const doc = parser.parseFromString(svg, "text/html");
        let temp = doc.getElementsByTagName("svg")[0];

        if (useHeight == true) {
            svgHeight = newHeight;
            svgWidth = newHeight * (orgWidth / orgHeight);
        }
        if (useWidth == true) {
            svgHeight = newWidth * (orgHeight / orgWidth);
            svgWidth = newWidth;
        }
        if (notRatio == true) {
            svgHeight = newHeight;
            svgWidth = newWidth;
        }

        temp.setAttribute("height", `${svgHeight}`);
        temp.setAttribute("width", `${svgWidth}`);
        console.log(doc.getElementsByTagName("svg")[0]);




        const svgTodownload = temp;
        if (svgTodownload) {
            let { width, height } = svgTodownload.getBBox();
            let clonedSvgElement = svgTodownload.cloneNode(true);
            let outerHTML = clonedSvgElement.outerHTML,
                blob = new Blob([outerHTML], { type: "image/svg+xml;charset=utf-8" });
            let URL = window.URL || window.webkitURL || window;
            let blobURL = URL.createObjectURL(blob);
            let image = new Image();
            image.onload = () => {
                let canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                let context = canvas.getContext("2d");
                context.drawImage(image, 0, 0, width, height);
                svgUrl = URL.createObjectURL(blob);

                // downloadFunc(svgUrl, "svg");
            };
            image.src = blobURL;
            // setTimeout(() => {
            //     if (lang === "en") {
            //         window.location.href = `/download?tool=${pageTool}`;
            //     } else {
            //         window.location.href = `/${lang}/download?tool=${pageTool}`;
            //     }
            // }, 1000);
        }




        newSvg.append(temp);

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





        // document.getElementById("root").append(newSvg);
        // document.getElementById("root").append(svg);
        // newSvg.setAttribute("height", "500px");

        // console.log(newSvg);
        // console.log(newSvg.height);
    },
        false
    );
    if (input) {
        reader.readAsDataURL(input);
    }
}


const Download =() =>{
    downloadFunc(svgUrl, "svg");
}

const downloadFunc = (url, type) => {
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = `Resized_svg.${type}`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        if (lang === "en") {
            window.location.href = `/download?tool=${pageTool}`;
        } else {
            window.location.href = `/${lang}/download?tool=${pageTool}`;
        }
    }, 70);
};
