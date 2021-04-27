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
    sFilter();
  } else {
    console.log("error");
    document.querySelector(".box").style.height = "350px";
    document.querySelector("#error").innerHTML = "File format not supported";
  }
};
file.onchange = function () {
  inputbox.style.display = "none";
  input = file.files[0];
  sFilter();
};
////drag and drop ended

var setFilter = document.getElementById("setfilter");
var file = document.getElementById("file");
//filter loading

var filter = [
  "prewittHorizontal",
  "red",
  "blue",
  "green",
  "grayscale",
  "highpass",
  "invert",
  "laplacian",
  "prewittVertical",
  "roberts",
  "saturation",
  "sepia",
  "sharpen",
  "sobelHorizontal",
  "sobelVertical",
  "thresholding",
  "mirror",
];
filterButton = [];

function setFilteroption() {
  filterButton.push("<select id='filterChoice'>");
  for (let i = 0; i < filter.length; i++) {
    filterButton.push(
      "<option value=" + filter[i] + ">" + filter[i] + "</option>"
    );
  }
  filterButton.push("</select>");
  return filterButton.join("");
}
document.getElementById("filter-result").innerHTML = setFilteroption();

///set filter button

function sFilter() {
  $("#file").remove();
  ///////loader
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
  }, 1000);

  ///////loader
  var reader = new FileReader();
  reader.onload = function () {
    var img = new Image();
    var final = document.querySelector("#final");
    var filteroption = document.getElementById("filterChoice");
    var ctx = final.getContext("2d");
    img.onload = function () {
      final.height = img.height;
      final.width = img.width;

      ctx.drawImage(img, 0, 0);
      document.getElementById("filter").onclick = function () {
        document.querySelector("#save").onclick = function () {
          document.querySelector("#content").style.display = "none";
          document.querySelector(".thankyouBox").style.visibility = "visible";
          box.style.height = "300px";
          box.style.background = "#00b8e6";
        };

        LenaJS.filterImage(final, LenaJS[filteroption.value], img);
        document.getElementById("downloadButton").onclick = function () {
          var canvas = document.querySelector("#final");
          var result = canvas.toDataURL();
          var a = document.createElement("a");
          a.href = result;
          a.download = "filter";
          document.body.appendChild(a);
          a.click();
        };
      };

      //// donwload image
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(input);
}

///drag and drop n option

document.querySelector(".container2").onclick = function () {
  document.querySelector("#file").click();
};
