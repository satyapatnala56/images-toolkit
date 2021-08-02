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
          var fullWidth = Math.abs(sin) * imgHeight + Math.abs(cos) * imgWidth;
          var fullHeight = Math.abs(cos) * imgHeight + Math.abs(sin) * imgWidth;

          //safari 2 requires setAttribute
          canvas.setAttribute("width", fullWidth);
          canvas.setAttribute("height", fullHeight);

          document.querySelector(".middle_div").innerHTML = "";

          document.querySelector(".middle_div").appendChild(canvas);
          canvas.style.maxHeight = "360px";
          canvas.style.marginRight = "auto";
          canvas.style.marginLeft = "auto";
          canvas.style.boxShadow = "8px 7px 5px rgb(0 0 0 / 20%)";
          canvas.style.maxWidth = "85%";
          console.log("done");

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
const getScript = document.currentScript;
const pageTool = getScript.dataset.tool;
const lang = getScript.dataset.lang;
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
  onFileDrop(e.dataTransfer.files[0]);
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

    container.style.height = "300px";

    inputbox.style.display = "none";
    rotateImg();
  } else {
    console.log("error");
    document.querySelector("#error").style.visibility = "visible";

    container.style.height = "350px";
    document.querySelector("#error").innerHTML = "File format not supported";
  }
};
const fileOnChange = () => {
  showLoader();

  input = file.files[0];
  rotateImg();
};
function rotateImg() {
  /////loader starting

  $("#file").remove();
  setTimeout(function () {
    rotating_process();
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
      document.querySelector(".container2").style.background = "white";

      document.querySelector(".container2").style.height = "auto";
      window.location.href = "#";
      clearInterval(ans);
    }
  }, 600);

  function rotating_process() {
    var rotate_btn_value = 0;
    var r = new FileReader();
    r.onload = function () {
      document.querySelector(".middle_div img").src = r.result;
      var img = new Image();
      img.onload = function () {
        $(".options_div .rotate_range input").on(
          "input propertychange",
          function () {
            var rotate_range = $(".options_div .rotate_range input").val();
            $(".options_div .rotate_range span").html(rotate_range + "°");
            $(".rotate_info #rotate_value").html(rotate_range + "°");
          }
        );

        var rotate_btns = document.querySelectorAll(
          ".options_div #right_rotate,.options_div #left_rotate"
        );
        for (let i = 0; i < rotate_btns.length; i++) {
          rotate_btns[i].onclick = function () {
            if (rotate_btns[i].id == "right_rotate") {
              rotate_btn_value = rotate_btn_value + 90;
              Rotate(img, rotate_btn_value + "deg");
              $(".rotate_info #rotate_value").html(rotate_btn_value + "°");
            } else if (rotate_btns[i].id == "left_rotate") {
              rotate_btn_value = rotate_btn_value - 90;
              $(".rotate_info #rotate_value").html(rotate_btn_value + "°");
              Rotate(img, rotate_btn_value + "deg");
            }
          };
        }
        document.querySelector(".options_div .rotate_range input").onchange =
          function () {
            rotate_btn_value = 0;
            Rotate(
              img,
              document.querySelector(".options_div .rotate_range input").value +
                "deg"
            );
          };

        document.querySelector(".rotate_submit").onclick = function () {
          document.querySelector(".container2").style.background = "none";
          window.location.href = "#";
          document.querySelector("#content").style.display = "none";
          document.querySelector(".thankyouBox").innerHTML =
            ' <div class="row"> <div class="col col-md-12 col-sm-12 col-lg-12 col-xl-12"> <img src="/trust.svg" alt="" id="thankyouImage" /> <p id="thankyouText">Thanks for your patience</p> <a class="btn" id="downloadButton">DOWNLOAD</a> </div> </div>';
          document.querySelector(".container2").style.height = "300px";
          ///download button
          document.querySelector("#downloadButton").onclick = function () {
            document.querySelector("canvas").toBlob(function (result_blob) {
              var result_url = window.URL.createObjectURL(result_blob);
              var a = document.createElement("a");
              a.href = result_url;
              a.download = "Safeimagekit-" + input.name.match(/^.*\./) + "png";
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
      img.src = r.result;
    };
    r.readAsDataURL(input);
  }
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
