///drag and drop n option
const getScript = document.currentScript;
const pageTool = getScript.dataset.tool;
const lang = getScript.dataset.lang;
var container = document.querySelector(".container2");
var inputbox = document.querySelector("#inputbox");
var content = document.querySelector("#content");
var file = document.querySelector("#file");
var box = document.querySelector(".box");
var boxContainer = document.querySelector(".container2");
const gdrive = document.querySelector("#filepicker");

const MIME_TYPE = "image/jpeg";
let QUALITY = 0; //0-1
var first = true;
var second = false;
var third = true;
var forth = false;
var fifth = false;
let m = 0;
let size = getScript.dataset.size;
console.log(size);

const getFile = (file) => {
  onFileChange(file);
};
const showLoader = () => {
  document.querySelector("#inputbox").style.display = "none";
  var loaderbox = document.createElement("div");
  loaderbox.id = "loader-box";
  var mainDiv = document.querySelector("#loaderDiv .col");
  mainDiv.insertBefore(loaderbox, mainDiv.childNodes[1]);
  document.querySelector("#loader").innerHTML = '<p id="loadingMessage"></p>';
  document.querySelector("#loadingMessage").innerHTML =
    "Please Wait ,Loading Your file ";
};
const closeLoader = () => {};
const mimeTypes = "image/png,image/jpg,image/jpeg,image/webp";
const filemimes = [".png", ".webp", ".jpg", ".jpeg"];
gdrive.addEventListener(
  "click",
  (getFile, mimeTypes, showLoader, closeLoader) => {
    const data = loadPicker();
  }
);
const getDropBoxFile = (file) => {
  onFileChange(file);
};
const dropbox = document.getElementById("dropbox");
dropbox.addEventListener(
  "click",
  async (getDropBoxFile, showLoader, closeLoader) => {
    const getFile = chooseFromDropbox();
  }
);

var input;
container.ondragover = function (e) {
  e.preventDefault();
};
boxContainer.ondrop = (e) => {
  e.preventDefault();
  onFileDrop(e.dataTransfer.files[0]);
};

const onFileDrop = (file, flag = 0) => {
  input = file;
  var extension = input.name.replace(/^.*\./, "");
  if (
    extension == "webp" ||
    extension == "jpg" ||
    extension == "jpeg" ||
    extension == "png"
  ) {
    if (flag == 0) {
      showLoader();
    }

    inputbox.style.display = "none";
    container.style.height = "300px";
    compressImage();
  } else {
    container.style.height = "350px";
    document.querySelector("#error").style.visibility = "visible";

    document.querySelector("#error").style.visibility = "visible";
    document.querySelector("#error").innerHTML = "File not supported";
  }
};

const fileOnChange = () => {
  showLoader();

  inputbox.style.display = "none";
  input = file.files[0];

  compressImage();
};
const onFileChange = (file) => {
  inputbox.style.display = "none";
  input = file;

  compressImage();
};
////drag and drop ended

let final_blob;
let countforalert = 0;
let forZeroalert = false;
let onValueOne = false;
let pleaseWait = false;

document.querySelector(".waitBox").style.display = "none";


function compressImage() {
  ////loader end
  $("#file").remove();
  var reader = new FileReader();
  reader.onload = function () {
    // document.querySelector("#input_img .image_section img").src = reader.result;
    document.querySelector("#output_img .image_section img").src =
      reader.result;

    var count = 0;
    var ans = setInterval(function () {
      count = count + 10;
      document.querySelector("#upper-loader").style.width = count + "%";
      if (count == 110) {
        document.querySelector("#upper-loader").style.display = "none";
        document.querySelector("#loaderDiv").style.display = "none";
        document.querySelector("#content").style.visibility = "visible";
        document.querySelector("#loader-box").style.display = "none";
        document.querySelector(".container2").style.background = "white";
        document.querySelector(".container2").style.padding = "20px";
        document.querySelector(".container2").style.paddingLeft = "0px";
        document.querySelector(".container2").style.paddingRight = "0px";
        document.querySelector(".container2").style.height = "auto";

        document.querySelector(".container2").style.background = "none";

              document.querySelector(".box").style.background = "#ad81ee";

              document.querySelector("#content").style.display = "none";
        document.querySelector(".thankyouBox").style.display = "block";
        // if (document.querySelector(".waitBox").style.display == "block"){
        //   document.querySelector(".waitBox").style.display = "none";
        //   console.log(1)
        // }else{
        //   document.querySelector(".waitBox").style.display = "block"
        //   console.log(2)
        // }
        if(fifth == false && onValueOne == false){
          document.querySelector(".waitBox").style.display = "block"
          pleaseWait = true;
        }
        

        clearInterval(ans);
        // if (forZeroalert==true){
        //     alert("We can't compress the image further")
        //   }
      }
    }, 300);
    ////loader end

    // document.querySelector(".info_section #input_table  #name").innerHTML =
    //   input.name;
    // document.querySelector(".info_section #input_table  #type").innerHTML =
    //   input.type;
    // document.querySelector(".info_section #input_table  #size").innerHTML =
    //   parseInt(input.size) / 1000 + "kb";
    // document.querySelector(
    //   ".info_section #input_table  #lastModifiedDate"
    // ).innerHTML = input.lastModifiedDate;
    // document.querySelector(
    //   ".info_section #input_table  #lastModified"
    // ).innerHTML = input.lastModified;
    ////compressing image

    document.querySelector(".info_section #output_table  #name").innerHTML =
      input.name;
    document.querySelector(".info_section #output_table  #type").innerHTML =
      input.type;
    document.querySelector(".info_section #output_table  #size").innerHTML =
      parseInt(input.size) / 1000 + "kb";
    document.querySelector(
      ".info_section #output_table  #lastModifiedDate"
    ).innerHTML = input.lastModifiedDate;

    document.querySelector(
      ".info_section #output_table  #lastModified"
    ).innerHTML = input.lastModified;

    // const file = ev.target.files[0]; // get the file
    const file = input;
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
      const [newWidth, newHeight] = calculateSize(img);
      const canvas = document.createElement("canvas");
      canvas.width = newWidth;
      canvas.height = newHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      // console.log("QUALITY");

      callback(QUALITY);

      function callback(QUALITY) {
        canvas.toBlob(
          (blob) => {
            // Handle the compressed image. es. upload or save in local state
            displayInfo("Original file", file);
            displayInfo("Compressed file", blob);
            getQualityFactor(blob);
            console.log(blob);


            document.querySelector(
              ".info_section #output_table  #name"
            ).innerHTML = "C_" + input.name;
            document.querySelector(
              ".info_section #output_table  #type"
            ).innerHTML = blob.type;
            final_blob = parseInt(blob.size) / 1024;
            document.querySelector(
              ".info_section #output_table  #size"
            ).innerHTML =
              Math.round((final_blob + Number.EPSILON) * 100) / 100 + "kb";
            document.querySelector(
              ".info_section #output_table  #lastModifiedDate"
            ).innerHTML = input.lastModifiedDate;

            document.querySelector(
              ".info_section #output_table  #lastModified"
            ).innerHTML = input.lastModified;

            // document.querySelector(
            //   ".info_section #input_table  #name"
            // ).innerHTML = input.name;




            // document.querySelector("#saving_image").onclick = function () {
              if(fifth == true){
                document.querySelector(".waitBox").style.display = "none";
                console.log(1)

              
              window.location.href = "#";
              document.querySelector(".container2").style.background = "none";

              document.querySelector(".container2").style.background = "none";

              document.querySelector(".box").style.background = "#ad81ee";

              document.querySelector("#content").style.display = "none";
              // document.querySelector(".thankyouBox").innerHTML =
              //   '<div class="row"> <div class="col col-md-12 col-sm-12 col-lg-12 col-xl-12"> <img src="/trust.svg" alt="" id="thankyouImage" /> <p id="thankyouText">Thanks for your patience</p><p id = "newFileSize">New file size : </p><p id = "zeroAlert"></p><a class="btn" id="downloadButton">DOWNLOAD</a> </div> </div>';


              // document.querySelector("#newFileSize").innerHTML = "New file size: " + Math.round((final_blob + Number.EPSILON) * 100) / 100 + "kb";
              if(forZeroalert == true){
                document.querySelector(".thankyouBox").innerHTML =
                  '<div class="row"> <div class="col col-md-12 col-sm-12 col-lg-12 col-xl-12"><p id = "zeroAlert"></p></div> </div>';
                document.querySelector("#zeroAlert").innerText = "Sorry, we can't compress this image to " + `${size}` + "kb";
                // document.querySelector("#downloadButton").style.marginBottom = "18px";
                document.querySelector("#zeroAlert").style.color = "#ffffff";
                // document.querySelector(".thankyouBox").innerHTML = "";
              }else{
                document.querySelector(".thankyouBox").innerHTML =
                  '<div class="row"> <div class="col col-md-12 col-sm-12 col-lg-12 col-xl-12"> <img src="/trust.svg" alt="" id="thankyouImage" /> <p id="thankyouText">Thanks for your patience</p><p id = "newFileSize">New file size : </p><p id = "zeroAlert"></p><a class="btn" id="downloadButton">DOWNLOAD</a> </div> </div>';
                  if((Math.round((final_blob + Number.EPSILON) * 100) / 100) > 1024){
                    let temp = (Math.round((final_blob + Number.EPSILON) * 100) / 100)/1024;
                    temp = Math.round((temp + Number.EPSILON) * 100) / 100;
                    document.querySelector("#newFileSize").innerHTML = "New file size: " + temp + "mb";
                  }else{
                    document.querySelector("#newFileSize").innerHTML = "New file size: " + Math.round((final_blob + Number.EPSILON) * 100) / 100 + "kb";
                  }
                
                if(pleaseWait==false){
                  document.querySelector(".thankyouBox").style.display = "none";
                }
              document.querySelector("#newFileSize").style.color = "#ffffff"
              document.querySelector("#zeroAlert").style.color = "#ffffff"
              container.style.height = "300px";
              if (window.location.href.match("compress-an-image")) {
                box.style.background = "#ad81ee";
              } else if (window.location.href.match("compress-jpeg")) {
                box.style.background = "#33cccc";
              } else if (window.location.href.match("compress-png")) {
                box.style.background = "#66b3ff";
              } else if (window.location.href.match("compress-a-gif")) {
                box.style.background = "#ff9966";
              }
              console.log("last step")
                if (Math.round((final_blob + Number.EPSILON) * 100) / 100 > size && countforalert == 2) {
                  alert("we can't compress the image further");
                }
              // document.querySelector(".box").style.background = "#ad81ee";

              // document.querySelector("#content").style.display = "none"; 
              document.getElementById("downloadButton").onclick = function (){
              var reader2 = new FileReader();
              reader2.onload = function () {
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement("a");
                a.href = url;

                a.download = "C_" + input.name;
                document.body.appendChild(a);
                a.click();
                if (lang === "en") {
                  window.location.href = `/download?tool=${pageTool}`;
                } else {
                  window.location.href = `/${lang}/download?tool=${pageTool}`;
                }
              };
              reader2.readAsDataURL(blob);
            };
              }
              
          // };
          };
          },
          MIME_TYPE,
          QUALITY,
          console.log(QUALITY)
        );
      }

      function getQualityFactor(blob) {
        console.log("hi1");
        if (m == 1 && blob.size / 1024 < size){
          document.querySelector(".thankyouBox").innerHTML = 
            '<div class="row"> <div class="col col-md-12 col-sm-12 col-lg-12 col-xl-12"><p style = "color:white;">Sorry, choose different image</p></div> </div>';
          onValueOne = true;
          document.querySelector(".waitBox").style.display = "none";
        }
        if (m == 0 && blob.size / 1024 > size) {
          first = false;
          third = false;
          fifth = true;
          forZeroalert = true;
          console.log("hi");


          // document.querySelector(
          //   ".info_section #input_table  #name"
          // ).innerHTML = input.name;

          
          // can't compress to this size
        }
        if (m <= 1) {
          console.log("hi3");
          if (first == true) {
            console.log("hi2");
            if (blob.size / 1024 < size) {
              m = m + 0.1;
              m = Math.round((m + Number.EPSILON) * 100) / 100;
              callback(m);
            } else {
              m = m - 0.1;
              first = false;
              // second = true;
              // m = Math.round((m + Number.EPSILON) * 100) / 100;
              // callback(m);
            }
          }
          if (second == true) {
            if (blob.size / 1024 < size) {
              m = m + 0.01;
              m = Math.round((m + Number.EPSILON) * 100) / 100;
              callback(m);
            } else {
              m = m - 0.01;
              second = false;
              third = false;
              m = Math.round((m + Number.EPSILON) * 100) / 100;
              fifth = true;
              callback(m);
              forth = true;
            }
          }
          if (third == true) {
            if (second == false && first == false) {
              second = true;
              m = Math.round((m + Number.EPSILON) * 100) / 100;
              callback(m);
            }
          }
          if (forth == true) {
            console.log("HIII")
            countforalert++;

            // document.querySelector(
            //   ".info_section #input_table  #name"
            // ).innerHTML = input.name;
          }
        }
      }
    };
  };
  reader.readAsDataURL(input);
}
document.querySelector("#Inputbox").onclick = function () {
  document.querySelector("#file").click();
};
const showDropDown = document.querySelector(".file-pick-dropdown");
const icon = document.querySelector(".arrow-sign");
const dropDown = document.querySelector(".file-picker-dropdown");
showDropDown.addEventListener("click", () => {
  addScripts();
  if (dropDown.style.display !== "none") {
    dropDown.style.display = "none";
    icon.classList.remove("fa-angle-up");
    icon.classList.add("fa-angle-down");
  } else {
    dropDown.style.display = "block";
    icon.classList.remove("fa-angle-down");
    icon.classList.add("fa-angle-up");
  }
});

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

function displayInfo(label, input) {
  const p = document.createElement("p");
  p.innerText = `${label} - ${readableBytes(file.size)}`;
  // document.getElementById("header_div").style.background = "green";
  // document.querySelector(".info_section #input_table  #name").innerHTML =
  //   input.name;
}

function readableBytes(bytes) {
  const i = Math.floor(Math.log(bytes) / Math.log(1024)),
    sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  return (bytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
}