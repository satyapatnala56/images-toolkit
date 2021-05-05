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

///set filter button

function sFilter() {
  document.querySelector("#fchoice").oninput = function () {
    document.querySelector("#filter").style.background =
      "rgba(90, 90, 90, 0.466)";
  };

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
      document.querySelector(".container2").style.height = "auto";

      clearInterval(ans);
    }
  }, 1000);

  ///////loader
  var reader = new FileReader();
  reader.onload = function () {
    var img = new Image();
    var final = document.querySelector("#final");
    var filteroption = document.getElementById("fchoice");
    var ctx = final.getContext("2d");
    img.onload = function () {
      final.height = img.height;
      final.width = img.width;

      ctx.drawImage(img, 0, 0);
      document.getElementById("filter").onclick = function () {
        if (filteroption.value == "----") {
          document.querySelector("#msg").innerHTML = "Please Enter your choice";
        } else {
          document.querySelector("#msg").innerHTML = "";

          document.querySelector("#filter").style.background = "green";

          ///filter processing
          LenaJS.filterImage(final, LenaJS[filteroption.value], img);

          ////   saving button
          document.querySelector("#save").onclick = function () {
            document.querySelector("#content").style.display = "none";
            document.querySelector(".thankyouBox").innerHTML =
              ' <div class="row"> <div class="col col-md-12 col-sm-12 col-lg-12 col-xl-12"> <img src="/trust.svg" alt="" id="thankyouImage" /> <p id="thankyouText">Thanks for your patience</p> <a class="btn" id="downloadButton">DOWNLOAD</a> </div> </div>';
            container.style.height = "300px";
            box.style.background = "#00b8e6";
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
        }
      };
      ///download button

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
