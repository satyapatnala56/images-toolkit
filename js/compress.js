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
const onFileDrop = (file) => {
  input = file;
  var extension = input.name.replace(/^.*\./, "");
  if (window.location.href.match("compress-an-image")) {
    if (
      extension == "webp" ||
      extension == "jpg" ||
      extension == "jpeg" ||
      extension == "png" ||
      extension == "gif"
    ) {
      showLoader();

      inputbox.style.display = "none";
      document.querySelector(".container2").style.height = "300px";

      compressImage();
    } else {
      console.log("error");
      document.querySelector(".container2").style.height = "350px";
      document.querySelector("#error").style.visibility = "visible";

      document.querySelector("#error").innerHTML = "File format not supported";
    }
  } else if (window.location.href.match("compress-a-gif")) {
    if (extension == "gif") {
      showLoader();
      inputbox.style.display = "none";
      document.querySelector(".container2").style.height = "300px";
      compressImage();
    } else {
      console.log("error");
      document.querySelector(".container2").style.height = "350px";
      document.querySelector("#error").style.visibility = "visible";

      document.querySelector("#error").innerHTML = "File format not supported";
    }
  } else if (window.location.href.match("compress-jpeg")) {
    if (extension == "jpeg") {
      showLoader();
      document.querySelector(".container2").style.height = "300px";
      inputbox.style.display = "none";
      compressImage();
    } else {
      console.log("error");
      document.querySelector(".container2").style.height = "350px";
      document.querySelector("#error").style.visibility = "visible";

      document.querySelector("#error").innerHTML = "File format not supported";
    }
  } else if (window.location.href.match("compress-png")) {
    if (extension == "png") {
      showLoader();
      inputbox.style.display = "none";
      document.querySelector(".container2").style.height = "300px";
      compressImage();
    } else {
      console.log("error");
      document.querySelector(".container2").style.height = "350px";
      document.querySelector("#error").style.visibility = "visible";

      document.querySelector("#error").innerHTML = "File format not supported";
    }
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

function compressImage() {
  ////loader end
  $("#file").remove();
  var reader = new FileReader();
  reader.onload = function () {
    document.querySelector("#input_img .image_section img").src = reader.result;
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

        clearInterval(ans);
      }
    }, 300);
    ////loader end

    document.querySelector(".info_section #input_table  #name").innerHTML =
      input.name;
    document.querySelector(".info_section #input_table  #type").innerHTML =
      input.type;
    document.querySelector(".info_section #input_table  #size").innerHTML =
      parseInt(input.size) / 1000 + "kb";
    document.querySelector(
      ".info_section #input_table  #lastModifiedDate"
    ).innerHTML = input.lastModifiedDate;
    document.querySelector(
      ".info_section #input_table  #lastModified"
    ).innerHTML = input.lastModified;
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

    var res = document.querySelectorAll(
      "bottom_div_inner .checkbox_input input,.bottom_div_inner .text_input input,.bottom_div_inner .text_input select"
    );
    for (let i = 0; i < res.length; i++) {
      res[i].oninput = function () {
        var mimetype = document.querySelector(
          ".bottom_div_inner #Mimetype select"
        ).value;
        var quality = document.querySelector(
          ".bottom_div_inner #Quality select"
        ).value;

        var strict =
          document.querySelector(".bottom_div_inner #Strict input") || false;
        var checkOrientation =
          document.querySelector(
            ".bottom_div_inner #Check_orientation input "
          ) || false;
        var maxWidth = document.querySelector(
          ".bottom_div_inner #MaxWidth input "
        ).value;
        var maxHeight = document.querySelector(
          ".bottom_div_inner #MaxHeight input "
        ).value;
        var minWidth = document.querySelector(
          ".bottom_div_inner #MinWidth input "
        ).value;
        var minHeight = document.querySelector(
          ".bottom_div_inner #MinHeight input "
        ).value;
        var width = document.querySelector(
          ".bottom_div_inner #Width input "
        ).value;
        var height = document.querySelector(
          ".bottom_div_inner #Height input "
        ).value;
        var convertSize =
          document.querySelector(".bottom_div_inner #ConvertSize input ")
            .value || 50000;
        console.log(strict.checked);
        new Compressor(input, {
          strict: strict.checked,
          checkOrientation: checkOrientation.checked,
          width: width,
          height: height,
          maxHeight: maxHeight,
          maxWidth: maxWidth,
          minHeight: minHeight,
          minWidth: minWidth,

          mimeType: mimetype,
          quality: parseInt(quality),
          convertSize: convertSize,
          success(result) {
            var filename, filetype;
            var name = result.name.match(/^.*\./);
            if (mimetype == "---") {
              var name = result.name.match(/^.*\./);
              filename = name + input.name.replace(/^.*\./, "");
              filetype = input.type;
            } else {
              var name = result.name.match(/^.*\./);
              filename = name + mimetype;
              filetype = "image/" + mimetype;
            }
            document.querySelector(
              ".info_section #output_table  #name"
            ).innerHTML = filename;
            document.querySelector(
              ".info_section #output_table  #type"
            ).innerHTML = filetype;
            document.querySelector(
              ".info_section #output_table  #size"
            ).innerHTML = result.size / 1000 + "kb";
            document.querySelector(
              ".info_section #output_table  #lastModifiedDate"
            ).innerHTML = result.lastModifiedDate;
            document.querySelector(
              ".info_section #output_table  #lastModified"
            ).innerHTML = result.lastModified;

            document.querySelector("#saving_image").onclick = function () {
              window.location.href = "#";
              document.querySelector(".container2").style.background = "none";

              document.querySelector(".box").style.background = "#ad81ee";

              document.querySelector("#content").style.display = "none";
              document.querySelector(".thankyouBox").innerHTML =
                '<div class="row"> <div class="col col-md-12 col-sm-12 col-lg-12 col-xl-12"> <img src="/trust.svg" alt="" id="thankyouImage" /> <p id="thankyouText">Thanks for your patience</p> <a class="btn" id="downloadButton">DOWNLOAD</a> </div> </div>';

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
              ////download button

              document.getElementById("downloadButton").onclick = function () {
                var reader2 = new FileReader();
                reader2.onload = function () {
                  // var ans = .replace(/^.*\;/, "data:image/gif;");
                  var url = window.URL.createObjectURL(result);
                  var a = document.createElement("a");
                  if (mimetype == "---") {
                    a.href = reader2.result.replace(
                      /^.*\;/,
                      "data:" + input.type + ";"
                    );
                  } else {
                    a.href = reader2.result.replace(
                      /^.*\;/,
                      "data:image/" + mimetype + ";"
                    );
                  }

                  a.download = "Safeimagekit-" + filename;
                  document.body.appendChild(a);
                  a.click();
                  if (lang === "en") {
                    window.location.href = `/download?tool=${pageTool}`;
                  } else {
                    window.location.href = `/${lang}/download?tool=${pageTool}`;
                  }
                };
                reader2.readAsDataURL(result);
              };
            };
            ///donwload button
          },
          error(err) {
            console.log(err.message);
          },
        });
      };
    }
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
