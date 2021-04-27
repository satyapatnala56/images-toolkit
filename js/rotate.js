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
    document.querySelector(".box").style.height = "350px";
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
      document.querySelector(".box").style.height = "850px";

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
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
      document.querySelector(".pictureDisplay").appendChild(canvas);
      document.getElementById("savep").onclick = function () {
        var rotate = document.getElementById("angle").value;
        if (rotate == "" || rotate == undefined) {
          ////error message

          document.querySelector("#errorMessage").innerHTML =
            "Please enter the Rotation Angle";
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          var an = parseInt(rotate);
          var result;
          result = 180 / an;
          console.log(result);
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate(Math.PI / result);
          ctx.drawImage(image, -image.width / 2, -image.height / 2);

          ////saving button
          window.location.href = "#thankyouBox";
          document.querySelector("#content").style.display = "none";
          document.querySelector(".thankyouBox").style.visibility = "visible";
          box.style.height = "300px";
          box.style.background = "#9999ff";

          ///downloading image
          var downloadButton = document.getElementById("downloadButton");
          downloadButton.onclick = function () {
            var url = canvas.toDataURL();
            var a = document.createElement("a");
            a.href = url;
            a.download = "download";
            a.click();
            location.reload();
          };
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
