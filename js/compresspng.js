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
  if (extension == "png") {
    inputbox.style.display = "none";
    compressImage();
  } else {
    console.log("error");
    document.querySelector(".box").style.height = "350px";
    document.querySelector("#error").innerHTML = "File format not supported";
  }
};
file.onchange = function () {
  inputbox.style.display = "none";
  input = file.files[0];
  compressImage();
};

////drag and drop ended

function compressImage() {
  ////loader end
  $("#file").remove();
  var reader = new FileReader();
  reader.onload = function () {
    document.querySelector("#inputContent img").src = reader.result;
    document.querySelector("#outputContent img").src = reader.result;

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

        clearInterval(ans);
      }
    }, 1000);
    ////loader end

    document.querySelector("#inputContent p #ans1").innerHTML = input.name;
    document.querySelector("#inputContent p #ans2").innerHTML = input.type;
    document.querySelector("#inputContent p #ans3").innerHTML =
      parseInt(input.size) / 1000 + "kb";
    document.querySelector("#inputContent p #ans4").innerHTML =
      input.lastModifiedDate;
    ////compressing image

    document.querySelector("#compress").onclick = function () {
      document.querySelector("#outputContent").style.visibility = "visible";
      var mimetype = document.querySelector("#mimetype").value;
      var quality = document.querySelector("#compressOption").value || 1;
      var strict = document.querySelector("#strict") || false;
      var checkOrientation = document.querySelector("#orientation") || false;
      var maxWidth = document.querySelector("#max-width").value;
      var maxHeight = document.querySelector("#max-height").value;
      var minWidth = document.querySelector("#min-width").value;
      var minHeight = document.querySelector("#min-width").value;
      var width = document.querySelector("#cwidth").value;
      var height = document.querySelector("#cheight").value;
      var convertSize = document.querySelector("#convertSize").value || 50000;
      new Compressor(input, {
        strict: strict.checked,
        checkOrientation: checkOrientation.checked,
        maxWidth: maxWidth,
        maxHeight: maxHeight,
        minWidth: minWidth,
        minHeight: minHeight,
        width: width,
        height: height,
        mimeType: mimetype,
        quality: parseInt(quality),
        convertSize: convertSize,
        success(result) {
          var filename, filetype;
          if (mimetype == "---") {
            var name = result.name.match(/^.*\./);
            filename = name + "png";
            filetype = "image/png";
          } else {
            var name = result.name.match(/^.*\./);
            filename = name + mimetype;
            filetype = "image/" + mimetype;
          }

          document.querySelector("#outputContent p #ans1").innerHTML = filename;
          document.querySelector("#outputContent p #ans2").innerHTML = filetype;
          document.querySelector("#outputContent p #ans3").innerHTML =
            result.size / 1000 + "kb";
          document.querySelector("#outputContent p #ans4").innerHTML =
            result.lastModifiedDate;

          document.querySelector("#save").onclick = function () {
            window.location.href = "#";
            document.querySelector(".box").style.background = "#66b3ff";
            document.querySelector("#content").style.display = "none";
            document.querySelector(".thankyouBox").innerHTML =
              '<div class="row"> <div class="col col-md-12 col-sm-12 col-lg-12 col-xl-12"> <img src="/trust.svg" alt="" id="thankyouImage" /> <p id="thankyouText">Thanks for your patience</p> <a class="btn" id="downloadButton">DOWNLOAD</a> </div> </div>';

            container.style.height = "300px";
            box.style.background = "ad81ee";
            ////download button

            document.getElementById("downloadButton").onclick = function () {
              var reader2 = new FileReader();
              reader2.onload = function () {
                // var ans = .replace(/^.*\;/, "data:image/gif;");
                var url = window.URL.createObjectURL(result);
                var a = document.createElement("a");
                if (mimetype == "---") {
                  a.href = reader2.result.replace(/^.*\;/, "data:image/png;");
                } else {
                  a.href = reader2.result.replace(
                    /^.*\;/,
                    "data:image/" + mimetype + ";"
                  );
                }

                console.log(a.href);
                a.download = filename;
                document.body.appendChild(a);
                a.click();
              };
              reader2.readAsDataURL(result);
            };
          };
          ///donwload button
        },
        error(err) {
          console.log(err.message);
        },
      });
      ///saving button
    };
  };
  reader.readAsDataURL(input);
}
document.querySelector(".container2").onclick = function () {
  document.querySelector("#file").click();
};
