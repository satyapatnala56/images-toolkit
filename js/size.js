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
    resizeImage();
  } else {
    console.log("error");
    document.querySelector(".box").style.height = "350px";
    document.querySelector("#error").innerHTML = "File format not supported";
  }
};
file.onchange = function () {
  inputbox.style.display = "none";
  input = file.files[0];
  resizeImage();
};
//
////drag and drop ended
function resizeImage() {
  ////loader end
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
      document.querySelector(".container2").style.height = "auto";
      document.querySelector(".box").style.height = "auto";

      clearInterval(ans);
    }
  }, 1000);
  ////loader end
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");

  var reader = new FileReader();
  reader.onload = function (event) {
    var image = new Image();
    image.onload = function () {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      document.getElementById("resize").onclick = function () {
        var height = document.querySelector("#height").value;
        var width = document.querySelector("#width").value;
        if (
          height == "" ||
          height == undefined ||
          width == "" ||
          width == undefined
        ) {
          document.querySelector("#msg").style.color = "red";

          document.querySelector("#msg").innerHTML =
            "Please enter both Height and width";
          /////error message
        } else {
          document.querySelector("#msg").style.color = "yellow";
          document.querySelector("#msg").innerHTML = "Image Resized";
          var img2 = new Image(width, height);
          img2.onload = function () {
            canvas.height = img2.height;
            canvas.width = img2.width;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img2, 0, 0, width, height);
            //////saving process
            document.querySelector("#saving").onclick = function () {
              document.querySelector("#content").style.display = "none";
              document.querySelector(".thankyouBox").style.visibility =
                "visible";
              document.querySelector(".box").style.background = "#ffbb33";
              document.getElementById("downloadButton").onclick = function () {
                var url = canvas.toDataURL();
                var a = document.createElement("a");
                a.href = url;
                a.download = "resized";
                document.body.appendChild(a);
                a.click();
              };
            };

            /////donwloading file
          };
          img2.src = image.src;
        }
      };
    };
    image.src = event.target.result;
  };
  reader.readAsDataURL(input);
}

///
document.querySelector(".container2").onclick = function () {
  document.querySelector("#file").click();
};
