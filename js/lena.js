const getScript = document.currentScript;
const pageTool = getScript.dataset.tool;
const lang = getScript.dataset.lang;
var container = document.querySelector(".container2");
var inputbox = document.querySelector("#inputbox");
var content = document.querySelector("#content");
var file = document.querySelector("#file");
var box = document.querySelector(".box");
var filter_container = [];
var boxContainer = document.querySelector(".container2");
const gdrive = document.querySelector("#filepicker");
const getFile = (file) => {
  onFileDrop(file);
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
  console.log(e);
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
    showLoader();

    document.querySelector(".box").style.height = "300px";
    inputbox.style.display = "none";

    sFilter();
  } else {
    console.log("error");
    document.querySelector("#error").style.visibility = "visible";

    document.querySelector(".box").style.height = "350px";
    document.querySelector("#error").innerHTML = "File format not supported";
  }
};
const fileOnChange = () => {
  showLoader();

  input = file.files[0];

  sFilter();
};
////drag and drop ended

var setFilter = document.getElementById("setfilter");
var file = document.getElementById("file");
//filter loading

///set filter button

function sFilter() {
  $("#file").remove();
  ///////loader
  var count = 0;
  var ans = setInterval(function () {
    count = count + 10;
    console.log(count);
    setTimeout(filtering_process(), 3000);
    document.querySelector("#upper-loader").style.width = count + "%";
    if (count == 110) {
      document.querySelector("#upper-loader").style.display = "none";
      document.querySelector("#loaderDiv").style.display = "none";
      document.querySelector("#content").style.visibility = "visible";
      document.querySelector("#loader-box").style.display = "none";
      document.querySelector(".box").style.borderRadius = "10px";
      document.querySelector(".container2").style.borderRadius = "10px";

      document.querySelector(".container2").style.height = "auto";
      document.querySelector(".container2_inner").style.background = "#00b8e6";

      clearInterval(ans);
    }
  }, 300);

  ///////loader end
  var filtering_process = () => {
    var reader = new FileReader();
    reader.onload = function () {
      ////filter choosing
      document.querySelector(".output_div img").src = reader.result;
      var img = new Image();
      img.onload = function () {
        document.querySelector(".cancel").onclick = function () {
          location.reload();
        };
        var filter_buttons = document.querySelectorAll(".filter_box");
        for (let i = 0; i < filter_buttons.length; i++) {
          filter_buttons[i].onclick = function () {
            var canvas = document.createElement("canvas");
            canvas.height = img.height;
            canvas.width = img.width;

            var filter_style = filter_buttons[i].querySelector("img").id;
            ///filte roperaiton code
            LenaJS.filterImage(canvas, LenaJS[filter_style], img);
            var url = canvas.toDataURL();

            document.querySelector(".output_div img").src = url;
            ///saving button

            document.querySelector(".save").onclick = function () {
              document.querySelector("#content").style.display = "none";
              document.querySelector(".container2").style.borderRadius = "0px";
              document.querySelector(".box").style.borderRadius = "0px";
              window.location.href = "#";
              document.querySelector(".thankyouBox").innerHTML =
                ' <div class="row"> <div class="col col-md-12 col-sm-12 col-lg-12 col-xl-12"> <img src="/trust.svg" alt="" id="thankyouImage" /> <p id="thankyouText">Thanks for your patience</p> <a class="btn" id="downloadButton">DOWNLOAD</a> </div> </div>';
              container.style.height = "300px";
              box.style.background = "#00b8e6";
              document.querySelector(".container2").style.background =
                "transparent";
              document.querySelector(".container2").style.borderRadius = "0px";

              ////download button
              var downloadButton = document.getElementById("downloadButton");
              downloadButton.onclick = function () {
                var a = document.createElement("a");
                a.href = url;
                a.download = "Safeimagekit-" + input.name;
                a.click();
                if (lang === "en") {
                  window.location.href = `/download?tool=${pageTool}`;
                } else {
                  window.location.href = `/${lang}/download?tool=${pageTool}`;
                }
              };
            };
          };
        }
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(input);
  };
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

/////filter scroll functionality
var scroll_value = 0;

document.querySelector(".next_button").onclick = () => {
  if (scroll_value >= 2190) {
    scroll_value = 2190;
  } else {
    scroll_value += 150;
  }
  document.querySelector(".filter_options").scrollLeft = scroll_value;
  console.log(scroll_value);
};
document.querySelector(".prev_button").onclick = () => {
  if (scroll_value <= 0) {
    scroll_value = 0;
  } else {
    scroll_value -= 160;
  }
  document.querySelector(".filter_options").scrollLeft = scroll_value;
  console.log(scroll_value);
};

///////
var filter_buttons = document.querySelectorAll(".filter_box");
for (let i = 0; i < filter_buttons.length; i++) {
  filter_buttons[i].querySelector("p").innerHTML =
    filter_buttons[i].querySelector("img").id;
}
