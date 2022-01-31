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
var input;
container.ondragover = function (e) {
  e.preventDefault();
};
const onFileDrop = (file, flag = 0) => {
  input = file;
  var extension = input.name.replace(/^.*\./, "");
  if (
    extension == "webp" ||
    extension == "jpg" ||
    extension == "jpeg" ||
    extension == "png" ||
    extension == "svg"
  ) {
    if (flag == 0) {
      showLoader();
    }
    inputbox.style.display = "none";
    document.querySelector(".box").style.height = "300px";
    cropImage();
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
  cropImage();
};

//////cropping image
function cropImage() {
  ////loader
  $("#file").remove();
  var count = 0;
  var ans = setInterval(function () {
    count = count + 10;
    console.log(count);
    document.querySelector("#upper-loader").style.width = count + "%";
    if (count == 110) {
      document.querySelector("#upper-loader").style.display = "none";
      document.querySelector("#loaderDiv").style.display = "none";
      document.querySelector("#content").style.visibility = "visible";
      document.querySelector("#loader-box").style.display = "none";
      document.querySelector(".box").style.background = "white";
      document.querySelector(".container2").style.height = "auto";
      document.querySelector(".container2").style.borderRadius = "20px";
      document.querySelector(".box").style.borderRadius = "20px";
      document.querySelector(".container2").style.background = "black";
      document.querySelector(".box").style.background = "#353535";

      clearInterval(ans);
    }
  }, 300);
  ////loader end
  var reader = new FileReader();
  reader.onload = function () {
    var img = document.querySelector("#output_div #input_img");
    img.src = reader.result;

    img.onload = function () {
      var Rotate = (function () {
        function radians(angle) {
          if (typeof angle == "number") return angle;
          return {
            rad: function (z) {
              return z;
            },
            deg: function (z) {
              return (Math.PI / 180) * z;
            },
          }[String(angle).match(/[a-z]+$/)[0] || "rad"](parseFloat(angle));
        }

        var HAS_CANVAS = (function () {
          var canvas = document.createElement("canvas");
          canvas.id = "canvas_id";
          return !!(canvas && canvas.getContext);
        })();

        var HAS_FILTER = (function () {
          return document.createElement("span").style.filter !== undefined;
        })();

        return function (img, angle) {
          angle = radians(angle);

          var sin = Math.sin(angle),
            cos = Math.cos(angle);

          if (HAS_CANVAS)
            return (function () {
              var loader = new Image();

              loader.onload = function () {
                var sin = Math.sin(angle),
                  cos = Math.cos(angle);

                var canvas = document.createElement("canvas");

                var imgWidth = img.width || loader.width;
                var imgHeight = img.height || loader.height;

                //compute the needed space
                var fullWidth =
                  Math.abs(sin) * imgHeight + Math.abs(cos) * imgWidth;
                var fullHeight =
                  Math.abs(cos) * imgHeight + Math.abs(sin) * imgWidth;

                //safari 2 requires setAttribute
                canvas.setAttribute("width", fullWidth);
                canvas.setAttribute("height", fullHeight);

                var g = canvas.getContext("2d");
                g.translate(fullWidth / 2, fullHeight / 2);
                g.rotate(angle);
                g.drawImage(
                  loader,
                  -imgWidth / 2,
                  -imgHeight / 2,
                  imgWidth,
                  imgHeight
                );
                document.querySelector("#output_div").innerHTML = "";
                var img2 = new Image();
                img2.id = "input_img";
                img2.onload = function () {
                  document.querySelector("#output_div").appendChild(img2);
                  cropping_process(img2);
                };
                img2.src = canvas.toDataURL();
              };

              loader.src = img.src;
            })();

          if (HAS_FILTER)
            return (function () {
              img.style.filter = [
                'progid:DXImageTransform.Microsoft.Matrix(M11="',
                cos,
                '", M12="',
                -sin,
                '", M21="',
                sin,
                '", M22="',
                cos,
                '", sizingMethod="auto expand")',
              ].join("");
            })();
        };
      })();

      var rotate_options = document.querySelectorAll(".function_btns");
      var val = 0;
      for (let i = 0; i < rotate_options.length; i++) {
        rotate_options[i].onclick = function () {
          if (rotate_options[i].id == "rotate_left") {
            val = val - 90;
            Rotate(img, val + "deg");
          } else if (rotate_options[i].id == "rotate_right") {
            val = val + 90;
            Rotate(img, val + "deg");
            console.log(document.querySelector("#output_div"));
          }
        };
      }

      document.querySelector(".cancel_btn").onclick = function () {
        document.getElementById("crop_btn").innerText = "Crop";
        // document.getElementById("crop_icon").style.display = "none";
        document.querySelector("#output_div").innerHTML = "";

        var img3 = new Image();
        img3.id = "input_img";
        img3.onload = function () {
          document.querySelector("#output_div").appendChild(img3);
          cropping_process(img3);
          val = 0;
        };
        img3.src = reader.result;
      };
      cropping_process(img);
      function cropping_process(img_el) {
        var croppr = new Croppr("#output_div #input_img", {
          onCropEnd: function (value) {
            document.querySelector("#crop_btn").onclick = function () {
              var value = croppr.getValue();
              var canvas = document.createElement("canvas");
              canvas.height = value.height;
              canvas.width = value.width;
              var ctx = canvas.getContext("2d");
              ctx.drawImage(
                img_el,
                value.x,
                value.y,
                value.width,
                value.height,
                0,
                0,
                value.width,
                value.height
              );

              document.getElementById("crop_btn").innerText = "Save";
              // document.getElementById("crop_icon").style.display = "none";

              var img5 = new Image();
              img5.id = "clipped_img";
              img5.onload = function () {
                document.querySelector("#output_div img").style.display =
                  "none";
                document.querySelector(
                  ".croppr-handleContainer"
                ).style.display = "none";
                document.querySelector(".croppr-region").style.display = "none";
                document.querySelector("#output_div").appendChild(img5);
                document.querySelector("#crop_btn").onclick = function () {
                  window.location.href = "#";
                  document.querySelector(".box").style.borderRadius = "0px";
                  document.querySelector(".container2").style.borderRadius =
                    "0px";
                  document.querySelector(".container2").style.height = "300px";
                  box.style.background = "#ff704d";
                  document.querySelector(".container2").style.background =
                    "transparent";

                  document.querySelector("#content").style.display = "none";
                  document.querySelector(".thankyouBox").innerHTML =
                    ' <div class="row"> <div class="col col-md-12 col-sm-12 col-lg-12 col-xl-12"> <img src="/trust.svg" alt="" id="thankyouImage" /> <p id="thankyouText">Thanks for your patience</p> <a class="btn" id="downloadButton">DOWNLOAD</a> </div> </div>';

                  document.querySelector("#downloadButton").onclick =
                    function () {
                      canvas.toBlob(function (result_blob) {
                        var result_url =
                          window.URL.createObjectURL(result_blob);
                        var a = document.createElement("a");
                        a.href = result_url;
                        a.download = "Safeimagekit-" + input.name;
                        a.click();
                        if (lang === "en") {
                          window.location.href = `/download?tool=${pageTool}`;
                        } else {
                          window.location.href = `/${lang}/download?tool=${pageTool}`;
                        }
                      });
                    };
                };
              };
              img5.src = canvas.toDataURL();
            };
          },
        });
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
