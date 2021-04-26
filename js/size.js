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
  $("#file").remove();
  var loaderbox = document.createElement("div");
  loaderbox.id = "loader-box";
  var mainDiv = document.querySelector("#loaderDiv .col");
  mainDiv.insertBefore(loaderbox, mainDiv.childNodes[1]);

  document.querySelector("#loader").innerHTML = '<p id="loadingMessage"></p>';
  document.querySelector("#loadingMessage").innerHTML =
    "Please Wait ,Loading Your file ";
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
      document.querySelector(".box").style.background = "#353535";
      document.querySelector(".box").style.height = "900px";

      clearInterval(ans);
    }
  }, 500);
  ////loader end
  var canvas = document.getElementById("final");
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
          document.querySelector("#errorMessage").innerHTML =
            "Please enter Height and width";
          /////error message
        } else {
          document.querySelector("#errorMessage").innerHTML = "";
          var img2 = new Image(width, height);
          img2.onload = function () {
            canvas.height = img2.height;
            canvas.width = img2.width;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img2, 0, 0, width, height);

            ////saving button

            document.querySelector("#save").onclick = function () {
              window.location.href = "#thankyouBox";
              document.querySelector("#content").style.display = "none";
              document.querySelector(".thankyouBox").style.visibility =
                "visible";
              box.style.height = "300px";
              box.style.background = "#ffbb33";
            };

            /////donwloading file
            document.getElementById("downloadButton").onclick = function () {
              var nav = document.createElement("a");
              nav.href = "";
              document.body.appendChild(nav);
              nav.click();

              var url = canvas.toDataURL();
              var a = document.createElement("a");
              a.href = url;
              a.download = "resized";
              document.body.appendChild(a);
              a.click();
            };
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
