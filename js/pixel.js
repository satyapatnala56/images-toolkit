const getScript = document.currentScript;
const pageTool = getScript.dataset.tool;
const lang = getScript.dataset.lang;
var container = document.querySelector(".container2");
var inputbox = document.querySelector("#inputbox");
var content = document.querySelector("#content");
var file = document.querySelector("#file");
var boxContainer = document.querySelector(".container2");
const gdrive = document.querySelector("#filepicker");

var loader_span = document.querySelector(".loader_span");
var saving_process = (url) => {
  document.querySelector("#save").onclick = function () {
    document.querySelector(".box").style.background = "#cc66ff";

    window.location.href = "#";
    document.querySelector(".content_span").style.display = "none";
    document.querySelector(".thankyou_span").innerHTML =
      '<div class="box-padding"> <div class="d-flex" id="__cond-922051"> <div class="flex-container"> <div class="flex-class"> <div class="d-flex flex-column"> <div class="box" style="background: #ff5975"> <div class="box-border"></div> <div class="content-box"> <div class="container2"> <span class="thankyouBox"> <div class="row"> <div class="col col-md-12 col-sm-12 col-lg-12 col-xl-12"> <img src="/trust.svg" alt="" id="thankyouImage" /> <p id="thankyouText">Thanks for your patience</p> <a class="btn" id="downloadButton">DOWNLOAD</a> </div> </div></span > </div> </div> </div> </div> </div> </div> </div> </div> ';
    document.querySelector(".container2").style.height = "300px";
    document.querySelector("#downloadButton").onclick = function () {
      var a = document.createElement("a");
      a.href = url;
      a.download = "Safeimagekit-" + input.name.match(/^.*\./) + "png";
      document.body.appendChild(a);
      a.click();
      if (lang === "en") {
        window.location.href = `/download?tool=${pageTool}`;
      } else {
        window.location.href = `/${lang}/download?tool=${pageTool}`;
      }
    };
  };
};

var resizing_img = (image_two_url, image_one_url) => {
  var img1 = document.querySelector(".image_one");
  var img2 = document.querySelector(".image_two");
  var bar = document.querySelector(".bar");
  var width = img1.offsetWidth;
  var height = img1.offsetHeight;
  var slider_range = document.querySelector(".slider_range");
  var slider_circle = document.querySelector(".slider_circle");
  img2.style.background = "url('" + image_one_url + "') no-repeat";
  img1.style.background = "url('" + image_two_url + "') no-repeat";
  img1.style.backgroundSize = width + "px " + height + "px";
  img2.style.backgroundSize = width + "px " + height + "px";
  slider_range.oninput = () => {
    img2.style.width = slider_range.value + "%";
    bar.style.marginLeft = slider_range.value + "%";
    slider_circle.style.marginLeft = slider_range.value + "%";
  };
};
var pixel_processing = () => {
  document.querySelector(".loader_span").style.display = "none";
  document.querySelector(".content_span").innerHTML =
    '<div class="content_div"> <div class="image_name"> <div class="original_image">Original Image</div> <div class="pixelized_image">Pixelized Image</div> </div> <div class="slider_container_outer"><div class="slider_container"> <div class="image_one"> <div class="image_two"> <div class="bar"><div class="slider_circle"></div></div> <input type="range" min="0" max="100" class="slider_range" /> </div></div></div></div> <div class="saving_div"> <a class="btn" id="save" >SAVE CHANGES <img src="/img/rightarrow.png" alt="" /></a> </div> </div> ';

  $("#file").remove();
  ////loader end
  var reader = new FileReader();
  reader.onload = function () {
    var img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = function () {
      var canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d");
      var w,
        h,
        sample_size = 7;
      w = img.width;
      h = img.height;
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);

      var pt = ctx.getImageData(0, 0, w, h).data;
      for (let y = 0; y < h; y += sample_size) {
        for (let x = 0; x < w; x += sample_size) {
          let p = (x + y * w) * 4;
          ctx.fillStyle =
            "rgba(" +
            pt[p] +
            "," +
            pt[p + 1] +
            "," +
            pt[p + 2] +
            "," +
            pt[p + 3] +
            ")";
          ctx.fillRect(x, y, sample_size, sample_size);
        }
      }

      var url = canvas.toDataURL();
      resizing_img(img.src, url);
      saving_process(url);
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(input);
};
var show_loader = () => {
  document.querySelector(".box-padding").style.display = "none";
  loader_span.innerHTML =
    '<div class="loading_div"><img src="../../tenor.gif" alt="" /></div>';
  setTimeout(pixel_processing, 3000);
};

const getFile = (file) => {
  onFileDrop(file);
};
const showLoader = () => {
  document.querySelector(".box-padding").style.display = "none";
  loader_span.innerHTML =
    '<div class="loading_div"><img src="../../tenor.gif" alt="" /></div>';
  setTimeout(pixel_processing, 3000);
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
  onFileDrop(file);
};
const dropbox = document.getElementById("dropbox");
dropbox.addEventListener(
  "click",
  async (getDropBoxFile, showLoader, closeLoader) => {
    const getFile = chooseFromDropbox();
  }
);
boxContainer.ondrop = (e) => {
  e.preventDefault();
  onFileDrop(e.dataTransfer.files[0]);
};
var input;
container.ondragover = function (e) {
  e.preventDefault();
};
const onFileDrop = (file) => {
  input = file;
  var extension = input.name.replace(/^.*\./, "");
  if (
    extension == "webp" ||
    extension == "jpg" ||
    extension == "jpeg" ||
    extension == "png" ||
    extension == "svg"
  ) {
    document.querySelector(".container2").style.height = "300px";

    inputbox.style.display = "none";
    show_loader();
  } else {
    console.log("error");
    document.querySelector("#error").style.visibility = "visible";

    document.querySelector(".container2").style.height = "350px";
    document.querySelector("#error").innerHTML = "File format not supported";
  }
};
const fileOnChange = () => {
  input = file.files[0];
  show_loader();
};

////drag and drop ended

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
