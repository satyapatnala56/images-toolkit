///drag and drop n option
var container = document.querySelector(".container2");
var inputbox = document.querySelector("#inputbox");
var content = document.querySelector("#content");
var file = document.querySelector("#file");
var box = document.querySelector(".box");

var canvas = document.createElement("canvas");

document.querySelector(".box").style.background = "#353535";

///loader end
///qr generation processing
var qr_info_input = document.querySelector("#qr_info_input");

qr_info_input.oninput = function () {
  var qr_output = new Image();
  if (qr_info_input.value == "") {
    document.querySelector("#qr_error_span").innerHTML =
      "<p id='qr_error'>Please enter a value</p>";
    document.querySelector("#qr_output_span").innerHTML = "<p>Output</p>";
    document.querySelector("#save_button_div").style.marginTop = "-15px";
    document.querySelector("#save_button_div").innerHTML = "";
  } else {
    document.querySelector("#save_button_div").innerHTML =
      "<button id='save'>Save</button>";
    document.querySelector("#save_button_div").style.marginTop = "24px";

    document.querySelector("#qr_error_span").innerHTML = "";

    (function () {
      var qr = new QRious({
        element: canvas,
        level: "H",
        size: 500,
        value: qr_info_input.value,
      });

      var url = canvas.toDataURL();
      document.querySelector("#qr_output_span").innerHTML =
        "<img id='qr_output' src='" + url + "'>";
      ///saving button
      document.querySelector("#save").onclick = function () {
        document.querySelector("#content").style.display = "none";
        container.style.height = "300px";
        container.style.width = "100%";
        document.querySelector(".box").style.background = "#ff8533";

        ////loader starting
        var loaderbox = document.createElement("div");
        loaderbox.id = "loader-box";
        var mainDiv = document.querySelector("#loaderDiv .col");
        mainDiv.insertBefore(loaderbox, mainDiv.childNodes[1]);

        document.querySelector("#loader").innerHTML =
          '<p id="loadingMessage"></p>';
        document.querySelector("#loadingMessage").innerHTML =
          "Please Wait ,Converting Your file ";
        var count = 0;
        var ans = setInterval(function () {
          count = count + 10;
          document.querySelector("#upper-loader").style.width = count + "%";
          if (count == 110) {
            document.querySelector("#upper-loader").style.display = "none";
            document.querySelector("#loaderDiv").style.display = "none";
            window.location.href = "#";
            document.querySelector(".thankyouBox").innerHTML =
              ' <div class="row"> <div class="col col-md-12 col-sm-12 col-lg-12 col-xl-12"> <img src="/trust.svg" alt="" id="thankyouImage" /> <p id="thankyouText">Thanks for your patience</p> <a class="btn" id="downloadButton">DOWNLOAD</a> </div> </div>';
            document.querySelector("#loader-box").style.display = "none";

            document.querySelector("#downloadButton").onclick = function () {
              var a = document.createElement("a");
              a.href = url;
              a.download = "download";
              a.click();
            };

            clearInterval(ans);
          }
        }, 200);
        /////loader end

        //// download button
      };
    })();
  }
};
