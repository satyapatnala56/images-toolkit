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
    image_to_pixel_art();
  } else {
    console.log("error");
    document.querySelector(".box").style.height = "350px";
    document.querySelector("#error").innerHTML = "File format not supported";
  }
};
file.onchange = function () {
  inputbox.style.display = "none";
  input = file.files[0];
  image_to_pixel_art();
};
////drag and drop ended
function image_to_pixel_art() {
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
      document.querySelector("#loader-box").style.display = "none";
      document.querySelector("#content").style.visibility = "visible";

      clearInterval(ans);
    }
  }, 1000);
  ////loader end
  var reader = new FileReader();
  reader.onload = function () {
    var img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = function () {
      var canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d");
      var w,
        h,
        sample_size = 7;
      w = img.width;
      h = img.height;
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);

      var pt = ctx.getImageData(0, 0, w, h).data;
      for (let y = 0; y < h; y += sample_size) {
        for (let x = 0; x < w; x += sample_size) {
          let p = (x + y * w) * 4;
          ctx.fillStyle =
            "rgba(" +
            pt[p] +
            "," +
            pt[p + 1] +
            "," +
            pt[p + 2] +
            "," +
            pt[p + 3] +
            ")";
          ctx.fillRect(x, y, sample_size, sample_size);
        }
      }
      var url = canvas.toDataURL();
      document.getElementById("downloadButton").onclick = function () {
        console.log(url);
        var a = document.createElement("a");
        a.href = url;
        a.download = "download";
        document.body.appendChild(a);
        a.click();
      };
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(input);
}
document.querySelector(".container2").onclick = function () {
  document.querySelector("#file").click();
};
