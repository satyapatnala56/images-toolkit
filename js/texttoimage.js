var container = document.querySelector(".container2");
var inputbox = document.querySelector("#inputbox");
var content = document.querySelector("#content");
var file = document.querySelector("#file");
var box = document.querySelector(".box");

var input;

///canvasloading
///// styling button

var styles = document.querySelectorAll("#bold,#italic");
var bold = false,
  italic = false;
for (let i = 0; i < styles.length; i++) {
  styles[i].onclick = function () {
    if (styles[i].style.background == "red") {
      if (styles[i].id == "bold") {
        bold = false;
      }
      if (styles[i].id == "italic") {
        italic = false;
      }

      styles[i].style.background = "rgba(90, 90, 90, 0.466)";
    } else {
      if (styles[i].id == "bold") {
        bold = "bold";
      }
      if (styles[i].id == "italic") {
        italic = "italic";
      }

      styles[i].style.background = "red";
    }
  };
}
//additional text

document.querySelector("#generate").onclick = function () {
  var t = document.querySelector("#memeText").value;
  var bgColor = document.querySelector("#bgColor").value || "white";
  var color = document.querySelector("#memeTextColor").value || "black";
  var style = document.querySelector("#memeStyle").value || "Arial";
  var lineHeight = document.querySelector("#lineHeight").value || 1.6;

  var strokeColor = document.querySelector("#memeStrokeColor").value;
  var stroke = document.querySelector("#memeStroke").value;
  var fontsize = document.querySelector("#fontSize").value || 50;
  var bgColor = document.querySelector("#bgColor").value || "white";

  ///Impact,Lucida Console,Courier New,Arial,times new roman,Lucida Sans Unicode,Palatino Linotype
  //additional image

  var style = {
    font: style,
    color: color,
    size: fontsize,
    background: bgColor,
    stroke: stroke,
    strokeColor: strokeColor,
    lineHeight: lineHeight + "em",
    bold: bold,
    italic: italic,
  };

  var textImage2 = TextImage(style);
  console.log(textImage2);
  var img = textImage2.toImage(t);
  document.querySelector("#resultImage").src = img.src;
  // Custom control

  ///save button
  document.querySelector("#save").onclick = function () {
    window.location.href = "#";
    document.querySelector("#content").style.display = "none";
    document.querySelector(".thankyouBox").innerHTML =
      ' <div class="row"> <div class="col col-md-12 col-sm-12 col-lg-12 col-xl-12"> <img src="/trust.svg" alt="" id="thankyouImage" /> <p id="thankyouText">Thanks for your patience</p> <a class="btn" id="downloadButton">DOWNLOAD</a> </div> </div>';
    container.style.height = "300px";
    box.style.background = "#d24dff";

    document.querySelector("#downloadButton").onclick = function () {
      var a = document.createElement("a");
      a.href = img.src;
      a.download = "download";
      a.click();
    };
  };
};
///setting options

////download button
