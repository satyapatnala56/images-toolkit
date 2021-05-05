///drag and drop n option
var container = document.querySelector(".container2");
var inputbox = document.querySelector("#inputbox");
var content = document.querySelector("#content");
var file = document.querySelector("#file");
var box = document.querySelector(".box");

var canvas = document.createElement("canvas");

document.querySelector(".box").style.background = "#353535";

document.querySelector("#convert").onclick = function () {
  ///loader end
  ///qr generation processing
  var qrInput = document.querySelector("#qrInput").value;

  if (qrInput == undefined || qrInput == "") {
    document.querySelector("#errorMessage").innerHTML = "Please enter the text";
  } else {
    document.querySelector("#errorMessage").innerHTML = "";

    (function () {
      var qr = new QRious({
        element: canvas,
        value: qrInput,
      });
      document.querySelector("#qrOutput").src = canvas.toDataURL();
      ///saving button
      document.querySelector("#save").onclick = function () {
        window.location.href = "#";
        document.querySelector("#content").style.display = "none";
        document.querySelector(".thankyouBox").innerHTML =
          ' <div class="row"> <div class="col col-md-12 col-sm-12 col-lg-12 col-xl-12"> <img src="/trust.svg" alt="" id="thankyouImage" /> <p id="thankyouText">Thanks for your patience</p> <a class="btn" id="downloadButton">DOWNLOAD</a> </div> </div>';
        container.style.height = "300px";
        box.style.background = "#ff8533";

        //// download button
        document.querySelector("#downloadButton").onclick = function () {
          var url = canvas.toDataURL();
          var a = document.createElement("a");
          a.href = url;
          a.download = "download";
          a.click();
        };
      };
    })();
  }
};
