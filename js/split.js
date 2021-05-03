///drag and drop n option
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
    splitImage();
  } else {
    console.log("error");
    document.querySelector(".box").style.height = "350px";
    document.querySelector("#error").innerHTML = "File format not supported";
  }
};
file.onchange = function () {
  inputbox.style.display = "none";
  input = file.files[0];
  splitImage();
};

function splitImage() {
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
      document.querySelector(".box").style.height = "900px";

      clearInterval(ans);
    }
  }, 1000);

  ////
  var reader = new FileReader();

  reader.onload = function (evt) {
    var image = new Image();
    image.onload = function () {
      $("#file").remove();

      var numRowsToCut = 2;
      var numColsToCut = 3;

      var imagePieces = [];
      var c = document.createElement("canvas");
      var ctx = c.getContext("2d");
      c.width = image.width;
      c.height = image.height;
      ctx.drawImage(image, 0, 0);
      c.id = "c";
      document.querySelector(".pictureDisplay").appendChild(c);

      document.querySelector("#submit").onclick = function () {
        $("#c").remove();

        var rows = document.querySelector("#ROWS").value || 2;
        var cols = document.querySelector("#COLS").value || 2;

        ////err message

        numRowsToCut = rows;
        numColsToCut = cols;

        for (var x = 0; x < numRowsToCut; ++x) {
          for (var y = 0; y < numColsToCut; ++y) {
            var canvas = document.createElement("canvas");
            var context = canvas.getContext("2d");
            canvas.width = image.width / rows;
            canvas.height = image.height / cols;
            context.drawImage(
              image,
              x * canvas.width,
              y * canvas.height,
              canvas.width,
              canvas.height,
              0,
              0,
              canvas.width,
              canvas.height
            );
            imagePieces.push(canvas.toDataURL());
          }
        }
        for (let i = 0; i < imagePieces.length; i++) {
          var img = document.createElement("img");
          img.src = imagePieces[i];
          img.id = i;
          img.style.margin = "10px";
          document.querySelector(".pictureDisplay").appendChild(img);
        }

        var resultImages = document.querySelectorAll(".pictureDisplay img");
        document.querySelector("#downloadButton").onclick = function () {
          for (let i = 0; i < imagePieces.length; i++) {
            var a = document.createElement("a");
            a.href = resultImages[i].src;
            a.download = "download";
            a.click();
          }
        };
        document.querySelector("#save").onclick = function () {
          window.location.href = "#down";
          document.querySelector("#content").style.display = "none";
          document.querySelector(".thankyouBox").style.visibility = "visible";
          box.style.height = "300px";
          box.style.background = "#ff6666";
        };
      };
      console.log(reader.result);
      /////
    };
    image.src = evt.target.result;
  };
  reader.readAsDataURL(input);
}
document.querySelector(".container2").onclick = function () {
  document.querySelector("#file").click();
};
