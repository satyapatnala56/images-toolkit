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
      document.querySelector(".box").style.background = "white";
      document.querySelector(".box-border").style.background = "none";
      document.querySelector(".box-border").style.border = "none";
      document.querySelector(".container2").style.height = "auto";
      window.location.href = "#";
      clearInterval(ans);
    }
  }, 600);

  function rotating_process() {
    var r = new FileReader();
    r.onload = function () {
      document.querySelector("#result_img_div img").src = r.result;
      var img = new Image();
      img.onload = function () {
        document.querySelector("#r_btn").onclick = function () {
          var rotate_value = document.querySelector("#rotate_input").value;
          if (rotate_value == "") {
            rotate_value = 0;
          }
          Rotate(img, rotate_value + "deg");
          document.querySelector("#angle_range_span").innerHTML = "";
        };
        var rotate_buttons = document.querySelectorAll(".rotate_buttons");
        console.log(rotate_buttons);
        for (let i = 0; i < rotate_buttons.length; i++) {
          rotate_buttons[i].onclick = function () {
            Rotate(img, rotate_buttons[i].id + "deg");
            document.querySelector("#angle_range_span").innerHTML = "";
          };
        }
        document.querySelector("#rotate_value_range").oninput = function () {
          document.querySelector("#angle_range_span").innerHTML =
            "(" + document.querySelector("#rotate_value_range").value + "°)";
        };
        document.querySelector("#rotate_value_range").onchange = function () {
          Rotate(
            img,
            document.querySelector("#rotate_value_range").value + "deg"
          );
        };
        document.querySelector("#save_btn").onclick = function () {
          document.querySelector(".box").style.background = "#a29bfe";
          document.querySelector(".box-border").style.background =
            "rgba(0, 0, 0, 0.1)";
          document.querySelector(".box-border").style.background =
            "2px dashed rgba(0, 0, 0, 0.15)";

          window.location.href = "#";
          document.querySelector("#content").style.display = "none";
          document.querySelector(".thankyouBox").innerHTML =
            ' <div class="row"> <div class="col col-md-12 col-sm-12 col-lg-12 col-xl-12"> <img src="/trust.svg" alt="" id="thankyouImage" /> <p id="thankyouText">Thanks for your patience</p> <a class="btn" id="downloadButton">DOWNLOAD</a> </div> </div>';
          document.querySelector(".container2").style.height = "300px";
          ///download button
          document.querySelector("#downloadButton").onclick = function () {
            var download_file_name = input.name.match(/^.*/);
            download(
              document.querySelector("canvas").toDataURL(),
              download_file_name,
              "image/png"
            );
          };
        };
      };
      img.src = r.result;
    };
    r.readAsDataURL(input);
  }
}
document.querySelector(".container2").onclick = function () {
  document.querySelector("#file").click();
};
