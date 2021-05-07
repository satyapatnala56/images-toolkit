var container = document.querySelector(".container2");
var inputbox = document.querySelector("#inputbox");
var content = document.querySelector("#content");
var file = document.querySelector("#file");
var box = document.querySelector(".box");

var input;
container.ondragover = function (e) {
  e.preventDefault();
};
container.ondrop = function (e) {
  e.preventDefault();
  input = e.dataTransfer.files[0];
  var extension = input.name.replace(/^.*\./, "");
  if (
    extension == "webp" ||
    extension == "jpg" ||
    extension == "jpeg" ||
    extension == "png" ||
    extension == "svg"
  ) {
    inputbox.style.display = "none";
    rotateImg();
  } else {
    console.log("error");
    container.style.height = "350px";
    document.querySelector("#error").innerHTML = "File format not supported";
  }
};
file.onchange = function () {
  inputbox.style.display = "none";
  input = file.files[0];
  rotateImg();
};
function rotateImg() {
  /////loader starting

  $("#file").remove();
  var loaderbox = document.createElement("div");
  loaderbox.id = "loader-box";
  var mainDiv = document.querySelector("#loaderDiv .col");
  mainDiv.insertBefore(loaderbox, mainDiv.childNodes[1]);

  document.querySelector("#loader").innerHTML = '<p id="loadingMessage"></p>';
  document.querySelector("#loadingMessage").innerHTML =
    "Please Wait ,Converting Your file ";
  var count = 0;
  var ans = setInterval(function () {
    count = count + 10;
    document.querySelector("#upper-loader").style.width = count + "%";
    if (count == 110) {
      document.querySelector("#upper-loader").style.display = "none";
      document.querySelector("#loaderDiv").style.display = "none";
      document.querySelector("#content").style.visibility = "visible";
      document.querySelector("#loader-box").style.display = "none";
      document.querySelector(".box").style.background = "#353535";

      container.style.height = "auto";
      container.style.width = "92%";

      clearInterval(ans);
    }
  }, 1000);

  ////loader end

  /////loader ending

  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  var reader = new FileReader();
  reader.onload = function () {
    var image = new Image();
    image.onload = function () {
      document.querySelector("#prevImg").src = image.src;
      document.getElementById("rotate").onclick = function () {
        var rotate = document.getElementById("angle");
        rotate.oninput = function () {
          document.querySelector("#errorMessage").innerHTML = "";
        };
        if (rotate.value == "" || rotate.value == undefined) {
          ////error message

          document.querySelector("#errorMessage").innerHTML =
            "Please enter the Rotation Angle";
        } else {
          document.querySelector("#errorMessage").innerHTML = "Image rotated";

          /////rotating process
          Rotate(image, rotate.value + "deg");

          ////saving button
          document.querySelector("#Saving").onclick = function () {
            document.querySelector(".container2").style.width = "100%";

            window.location.href = "#";
            document.querySelector("#content").style.display = "none";
            document.querySelector(".thankyouBox").innerHTML =
              ' <div class="row"> <div class="col col-md-12 col-sm-12 col-lg-12 col-xl-12"> <img src="/trust.svg" alt="" id="thankyouImage" /> <p id="thankyouText">Thanks for your patience</p> <a class="btn" id="downloadButton">DOWNLOAD</a> </div> </div>';
            container.style.height = "300px";
            box.style.background = "#9999ff";

            var downloadButton = document.getElementById("downloadButton");
            downloadButton.onclick = function () {
              var url = document.querySelector("canvas").toDataURL();
              var a = document.createElement("a");
              a.href = url;
              a.download = "download";
              a.click();
            };
          };

          ///downloading image
        }
      };
    };
    image.src = reader.result;
  };
  reader.readAsDataURL(input);
}

document.querySelector(".container2").onclick = function () {
  document.querySelector("#file").click();
};
