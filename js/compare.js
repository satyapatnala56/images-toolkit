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
    extension == "png"
  ) {
    imgComparison();
  } else {
    console.log("error");
    document.querySelector(".box").style.height = "350px";
    document.querySelector("#error").innerHTML = "File format not supported";
  }
};

document.querySelector("#file").onchange = function (e) {
  e.preventDefault();
  document.querySelector("#inputbox").style.display = "none";
  document.querySelector("#secondInput").style.visibility = "visible";
  var file = e.target.files[0];
  var reader = new FileReader();
  reader.onload = function () {
    var r1 = reader.result;
    var file2 = document.querySelector("#file2");
    file2.onchange = function () {
      //////
      document.querySelector("#secondInput").style.display = "none";

      var loaderbox = document.createElement("div");
      loaderbox.id = "loader-box";
      var mainDiv = document.querySelector("#loaderDiv .col");
      mainDiv.insertBefore(loaderbox, mainDiv.childNodes[1]);

      document.querySelector("#loader").innerHTML =
        '<p id="loadingMessage"></p>';
      document.querySelector("#loadingMessage").innerHTML =
        "Please Wait ,Loading Your file ";
      var count = 0;
      var ans = setInterval(function () {
        count = count + 20;
        console.log(count);
        document.querySelector("#upper-loader").style.width = count + "%";
        if (count >= 110) {
          document.querySelector("#upper-loader").style.display = "none";
          document.querySelector("#loaderDiv").style.display = "none";
          document.querySelector("#loader-box").style.display = "none";
          document.querySelector("#content").style.visibility = "visible";
          document.querySelector(".box").style.height = "auto";
          document.querySelector(".box").style.background = "#353535";

          clearInterval(ans);
        }
      }, 1000);

      var reader2 = new FileReader();
      reader2.onload = function () {
        var r2 = reader2.result;
        //////fade effect
        document.querySelector("#fade").onclick = function () {
          document.querySelector("#msg").innerHTML =
            "Fade effect based comparison";

          document.querySelector("#cResult").innerHTML =
            ' <div class="pictureDisplay" style="width: 90%"> <div id="back"> <img src="' +
            r2 +
            '" alt="" style="height: auto; width: 100%; max-height: 500px; opacity: 0.6" /> </div> </div>; ';
          document.querySelector("#back").style.backgroundImage =
            "url('" + r1 + "')";
        };

        //////pixel comparison effect
        document.querySelector("#pixel").onclick = function () {
          document.querySelector("#msg").innerHTML = "Pixel based comparison";
          document.querySelector("#cResult").innerHTML = "<img id='pt'>";
          ////////////////////////////////
          var img = new Image();
          img.onload = function () {
            var img2 = new Image();
            img2.onload = function () {
              diff = imagediff.diff(img, img2);
              canvas = imagediff.createCanvas(diff.width, diff.height);
              context = canvas.getContext("2d");
              context.putImageData(diff, 0, 0);
              var url = canvas.toDataURL();
              var img3 = document.querySelector("#pt");
              img3.onload = function () {
                img3.style.width = "90%";
                //   // var a = document.createElement("a");
                //   // a.href = url;
                //   // a.download = "download";
                //   // a.click();
              };
              img3.src = url;
            };
            img2.src = reader2.result;
          };
          img.src = reader.result;
        };
        document.querySelector("#info").onclick = function () {
          document.querySelector("#msg").innerHTML = "Info based comparison";

          var img = new Image();
          img.onload = function () {
            var img2 = new Image();
            img2.onload = function () {
              document.querySelector("#cResult").innerHTML =
                ' <div style="width: 100%; height: 500px"> <div class="tableDiv"> <table id="table1" class="table"> <tr> <th>Property</th> <th>Value</th> </tr> <tr> <td>Name</td> <td>' +
                file.name +
                "</td> </tr> <tr> <td>Size</td> <td>" +
                parseInt(file.size) / 1000 +
                "kb</td> </tr> <tr> <td>Type</td> <td>" +
                file.type +
                "</td> </tr> <tr> <td>Height</td> <td>" +
                img.height +
                "</td> </tr> <tr> <td>Width</td> <td>" +
                img.width +
                "</td> </tr> </table> </div> " +
                '<div class="tableDiv"> <table id="table1" class="table"> <tr> <th>Property</th> <th>Value</th> </tr> <tr> <td>Name</td> <td>' +
                file2.files[0].name +
                "</td> </tr> <tr> <td>Size</td> <td>" +
                parseInt(file2.files[0].size) / 1000 +
                "kb</td> </tr> <tr> <td>Type</td> <td>" +
                file2.files[0].type +
                "</td> </tr> <tr> <td>Height</td> <td>" +
                img2.height +
                "px</td> </tr> <tr> <td>Width</td> <td>" +
                img2.width +
                "px</td> </tr> </table> </div></div>";
            };
            img2.src = reader2.result;
          };
          img.src = reader.result;
        };

        document.querySelector("#pixel").click();
        document.querySelector("#slider").onclick = function () {};
      };
      reader2.readAsDataURL(file2.files[0]);
    };
  };
  reader.readAsDataURL(file);
};

document.querySelector(".container2").onclick = function () {
  document.querySelector(".file").click();
};
