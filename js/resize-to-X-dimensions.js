const getScript = document.currentScript;
const pageTool = getScript.dataset.tool;
const lang = getScript.dataset.lang;
const x_width = getScript.dataset.x;
const y_height = getScript.dataset.y;
const type_dimesions = getScript.dataset.type;
const color = getScript.dataset.color;
var container = document.querySelector(".container2");
var inputbox = document.querySelector("#inputbox");
var content = document.querySelector("#content");
var file = document.querySelector("#file");
var box = document.querySelector(".box");
var rotate = document.querySelector("#rotate_input") || 0;
var rotate_value_range = document.querySelector("#rotate_value_range") || 0;
var input;
container.ondragover = function (e) {
  e.preventDefault();
};
var boxContainer = document.querySelector(".container2");
const gdrive = document.querySelector("#filepicker");
const getFile = (file) => {
  onFileDrop(file, 1);
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
  onFileDrop(file, 1);
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
    convert_webp();
  } else {
    container.style.height = "350px";
    document.querySelector("#error").style.visibility = "visible";

    document.querySelector("#error").style.visibility = "visible";
    document.querySelector("#error").innerHTML = "File not supported";
  }
};
const fileOnChange = () => {
  showLoader();

  input = file.files[0];
  container.style.height = "300px";
  convert_webp();
};
function convert_webp() {
  document.querySelector(".success_alert").style.visibility = "hidden";
  $("#file").remove();
  setTimeout(function () {
    webp_to_img();
  }, 6000);
  var count = 0;
  var ans = setInterval(function () {
    count = count + 10;
    document.querySelector("#upper-loader").style.width = count + "%";
    if (count == 110) {
      document.querySelector("#upper-loader").style.display = "none";
      document.querySelector("#loaderDiv").style.display = "none";
      document.querySelector("#content").style.visibility = "visible";
      document.querySelector("#loader-box").style.display = "none";
        if($(window).width() < 600) {
          document.querySelector(".container2").style.height = "1167px";
        }else{
          document.querySelector(".container2").style.height = "620px";
        }
      document.querySelector(".container2").style.background = color;
      document.querySelector(".box").style.borderRadius = "20px";
      document.querySelector(".container2").style.borderRadius = "25px";
      window.location.href = "#";
      clearInterval(ans);
    }
  }, 600);
  function starting_initial_conversion(message1, message2, value) {
    var file_name =
      document.querySelector("#file_name input").value ||
      input.name.match(/^.*\./);
    var height =
      document.querySelector("#resize_height input").value || img.height;
    var quality =
      document.querySelector("#resize_quality select").value || 1;
    var width =
      document.querySelector("#resize_width input").value || img.width;

    var mimetype = document.querySelector("#save_as select").value;
    new Compressor(input, {
      quality: parseInt(quality),
      success(final_blob) {
        var final_url = window.URL.createObjectURL(final_blob);
        var image = new Image(width, height);
        image.onload = function () {
          var naturalheight = image.height;
          var naturalwidth = image.width;

          converting_process(
            message1,
            message2,
            value,
            image,
            height,
            width,
            mimetype,
            quality,
            file_name,
            naturalwidth,
            naturalheight
          );
        };
        image.src = final_url;
      },
    });
  }
  function converting_process(
    message1,
    message2,
    value,
    image,
    height,
    width,
    mimetype,
    quality,
    file_name,
    naturalwidth,
    naturalheight
  ) {
    window.location.href = "#";

    document.querySelector(".success_alert").style.visibility = "visible";
    document.querySelector(".success_alert").style.borderColor =
      "#b6d4fe";
    document.querySelector(".success_alert").style.color = "#084298";
    document.querySelector(".success_alert").style.background = "#cfe2ff";
    document.querySelector(".success_alert").innerHTML = message1;

    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.height = naturalheight;
    canvas.width = naturalwidth;
    ctx.drawImage(image, 0, 0, width, height);
    document.querySelector("#output_div_inner img").src =
      canvas.toDataURL();
    document.querySelector("#output_div_inner img").onload = function () {
      document.querySelector(".success_alert").style.borderColor =
        "#badbcc";
      document.querySelector(".success_alert").style.color = "#0f5132";
      document.querySelector(".success_alert").style.background =
        "#d1e7dd";
      document.querySelector(".success_alert").innerHTML = message2;
      if (message2 == "") {
        document.querySelector(".success_alert").style.visibility =
          "hidden";
      } else {
        setTimeout(function () {
          document.querySelector(".success_alert").style.visibility =
            "hidden";
        }, 2000);
      }

      function image_saving(file_name, mimetype) {
        window.location.href = "#";
        document.querySelector(".box").style.background = color;
        document.querySelector(".box-border").style.background =
          "rgba(0, 0, 0, 0.1)";
        document.querySelector(".box-border").style.background =
          "2px dashed rgba(0, 0, 0, 0.15)";

        document.querySelector("#content").style.display = "none";
        document.querySelector(".thankyouBox").innerHTML =
          ' <div class="row"> <div class="col col-md-12 col-sm-12 col-lg-12 col-xl-12"> <img src="/trust.svg" alt="" id="thankyouImage" /> <p id="thankyouText">Thanks for your patience</p> <span><a class="btn" id="downloadButton">DOWNLOAD</a></span> </div> </div>';
        document.querySelector(".container2").style.height = "300px";
        document.querySelector(".container2").style.background =
          "transparent";
        document.querySelector(".container2").style.borderRadius = "0px";
        document.querySelector(".box").style.borderRadius = "0px";
        ///download button

        document.querySelector("#downloadButton").onclick = function () {
          document.querySelector(".thankyouBox span").innerHTML =
            "Downloading might take a while";
          canvas.toBlob(function (blob) {
            var r = new FileReader();
            r.onload = function () {
              var b = new Blob([r.result], {
                type: "image/" + mimetype,
              });
              var url = window.URL.createObjectURL(b);
              var a = document.createElement("a");
              a.href = url;
              a.download = "Safeimagekit-" + file_name + mimetype;
              a.click();
              setTimeout(() => {
                if (lang === "en") {
                  window.location.href = `/download?tool=${pageTool}`;
                } else {
                  window.location.href = `/${lang}/downlod?tool=${pageTool}`;
                }
              }, 200);
            };
            r.readAsArrayBuffer(blob);
          });
        };
      }
      if (value == 1) {
        image_saving(file_name, mimetype);
      } else if (value == 0) {
        return false;
      }
    };
  }
  function webp_to_img() {
    document.querySelector(".success_alert").style.visibility = "hidden";
    var r = new FileReader();
    r.onload = function () {
      var img = new Image();
      document.querySelector("#resize_height input").value = parseInt(y_height);
      document.querySelector("#resize_width input").value = parseInt(x_width);
      
      console.log("inashhshsh")
      starting_initial_conversion("Loading preview...", "Preview loaded", 0);
      img.onload = function () {
        document.querySelector("#output_div_inner img").src = r.result;
        if(type_dimesions === "pixels"){
          document.getElementById("div_pixcel").style.display="block";
        }else{
          document.getElementById("div_inches").style.display="block";
        }
      var inches = document.getElementById("dimensions_div_inches");
      inches.addEventListener("change", (e) => {
        const value = e.target.value;
        var button_arr = value.split("X");
        var button_width = button_arr[0];
        var button_height = button_arr[1];
        if (value) {
          document.querySelector("#resize_height input").value = parseInt(button_height);
          document.querySelector("#resize_width input").value = parseInt(button_width); 
        initial_conversion("Loading preview...", "Preview loaded", 0);
        } else {
          document.querySelector("#resize_height input").value =
          button_height;
        document.querySelector("#resize_width input").value = button_width;
        }
      });
      var pixecl = document.getElementById("dimensions_div_pixcel");
      pixecl.addEventListener("change", (e) => {
        const value = e.target.value;
        var button_arr = value.split("X");
        var button_width = button_arr[0];
        var button_height = button_arr[1];
        if (value) {
           document.querySelector("#resize_height input").value = parseInt(button_height);
           document.querySelector("#resize_width input").value = parseInt(button_width);
        initial_conversion("Loading preview...", "Preview loaded", 0);
        } else {
          document.querySelector("#resize_height input").value =
          button_height;
        document.querySelector("#resize_width input").value = button_width;
        }
      });
        document.querySelector("#preview").onclick = function () {
          initial_conversion("Loading preview...", "Preview loaded", 0);
        };
        document.querySelector("#save").onclick = function () {
          initial_conversion("Saving Image...", "", 1);
        };
        function initial_conversion(message1, message2, value) {
          var file_name =
            document.querySelector("#file_name input").value ||
            input.name.match(/^.*\./);
          var height =
            document.querySelector("#resize_height input").value || img.height;
          var quality =
            document.querySelector("#resize_quality select").value || 1;
          var width =
            document.querySelector("#resize_width input").value || img.width;

          var mimetype = document.querySelector("#save_as select").value;
          new Compressor(input, {
            quality: parseInt(quality),
            success(final_blob) {
              var final_url = window.URL.createObjectURL(final_blob);
              var image = new Image(width, height);
              image.onload = function () {
                var naturalheight = image.height;
                var naturalwidth = image.width;

                converting_process(
                  message1,
                  message2,
                  value,
                  image,
                  height,
                  width,
                  mimetype,
                  quality,
                  file_name,
                  naturalwidth,
                  naturalheight
                );
              };
              image.src = final_url;
            },
          });
        }

        function converting_process(
          message1,
          message2,
          value,
          image,
          height,
          width,
          mimetype,
          quality,
          file_name,
          naturalwidth,
          naturalheight
        ) {
          window.location.href = "#";

          document.querySelector(".success_alert").style.visibility = "visible";
          document.querySelector(".success_alert").style.borderColor =
            "#b6d4fe";
          document.querySelector(".success_alert").style.color = "#084298";
          document.querySelector(".success_alert").style.background = "#cfe2ff";
          document.querySelector(".success_alert").innerHTML = message1;

          var canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d");
          canvas.height = naturalheight;
          canvas.width = naturalwidth;
          ctx.drawImage(image, 0, 0, width, height);
          document.querySelector("#output_div_inner img").src =
            canvas.toDataURL();
          document.querySelector("#output_div_inner img").onload = function () {
            document.querySelector(".success_alert").style.borderColor =
              "#badbcc";
            document.querySelector(".success_alert").style.color = "#0f5132";
            document.querySelector(".success_alert").style.background =
              "#d1e7dd";
            document.querySelector(".success_alert").innerHTML = message2;
            if (message2 == "") {
              document.querySelector(".success_alert").style.visibility =
                "hidden";
            } else {
              setTimeout(function () {
                document.querySelector(".success_alert").style.visibility =
                  "hidden";
              }, 2000);
            }

            function image_saving(file_name, mimetype) {
              window.location.href = "#";
              document.querySelector(".box").style.background = color;
              document.querySelector(".box-border").style.background =
                "rgba(0, 0, 0, 0.1)";
              document.querySelector(".box-border").style.background =
                "2px dashed rgba(0, 0, 0, 0.15)";

              document.querySelector("#content").style.display = "none";
              document.querySelector(".thankyouBox").innerHTML =
                ' <div class="row"> <div class="col col-md-12 col-sm-12 col-lg-12 col-xl-12"> <img src="/trust.svg" alt="" id="thankyouImage" /> <p id="thankyouText">Thanks for your patience</p> <span><a class="btn" id="downloadButton">DOWNLOAD</a></span> </div> </div>';
              document.querySelector(".container2").style.height = "300px";
              document.querySelector(".container2").style.background =
                "transparent";
              document.querySelector(".container2").style.borderRadius = "0px";
              document.querySelector(".box").style.borderRadius = "0px";
              ///download button

              document.querySelector("#downloadButton").onclick = function () {
                document.querySelector(".thankyouBox span").innerHTML =
                  "Downloading might take a while";
                canvas.toBlob(function (blob) {
                  var r = new FileReader();
                  r.onload = function () {
                    var b = new Blob([r.result], {
                      type: "image/" + mimetype,
                    });
                    var url = window.URL.createObjectURL(b);
                    var a = document.createElement("a");
                    a.href = url;
                    a.download = "Safeimagekit-" + file_name + mimetype;
                    a.click();
                    setTimeout(() => {
                      if (lang === "en") {
                        window.location.href = `/download?tool=${pageTool}`;
                      } else {
                        window.location.href = `/${lang}/downlod?tool=${pageTool}`;
                      }
                    }, 200);
                  };
                  r.readAsArrayBuffer(blob);
                });
              };
            }
            if (value == 1) {
              image_saving(file_name, mimetype);
            } else if (value == 0) {
              return false;
            }
          };
        }
      };
      img.src = r.result;
      img.style.width =parseInt(x_width);
      img.style.height =parseInt(y_height);
    };
    r.readAsDataURL(input);
  }
}
document.querySelector("#Inputbox").onclick = function () {
  document.querySelector("#file").click();
};

var inputs = document.querySelectorAll("#height_input,#width_input,#mimetype");

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
