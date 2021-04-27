var container = document.querySelector(".container2");
var inputbox = document.querySelector("#inputbox");
var content = document.querySelector("#content");
var file = document.querySelector("#file");
var box = document.querySelector(".box");

var input;
var styles = document.querySelectorAll("#bold,#italic,#underline");
var bold = "",
  italic = "",
  underline = "";
for (let i = 0; i < styles.length; i++) {
  styles[i].onclick = function () {
    if (styles[i].style.background == "red") {
      if (styles[i].id == "bold") {
        bold = "";
      }
      if (styles[i].id == "italic") {
        italic = "";
      }
      if (styles[i].id == "underline") {
        underline = "";
      }
      styles[i].style.background = "rgba(90, 90, 90, 0.466)";
    } else {
      if (styles[i].id == "bold") {
        bold = "bold";
      }
      if (styles[i].id == "italic") {
        italic = "italic";
      }
      if (styles[i].id == "underline") {
        underline = "underline";
      }
      styles[i].style.background = "red";
    }
  };
}

///canvasloading
document.querySelector("#generate").onclick = function () {
  var bgColor = document.querySelector("#bgColor").value || "white";
  var height = document.querySelector("#cheight").value || 500;
  var width = document.querySelector("#cwidth").value || 500;
  ///// styling button

  //////
  //additional text
  var t = document.querySelector("#memeText").value;
  var color = document.querySelector("#memeTextColor").value || "black";
  var finalOpacity = document.querySelector("#memeOpacity").value || 1;
  var shadowColor = document.querySelector("#memeShadowColor").value;
  var shadow = document.querySelector("#memeShadow").value;
  var strokeColor = document.querySelector("#memeStrokeColor").value;
  var stroke = document.querySelector("#memeStroke").value;
  var fontsize = document.querySelector("#fontSize").value || 100;

  canvas = new fabric.Canvas("final", {
    width: width,
    height: height,
    backgroundColor: bgColor,
    selection: true,
    allowTouchScrolling: true,
  });
  fabric.Object.prototype.set({
    transparentCorners: false,
    cornerColor: "yellow",
    borderColor: "rgba(88,42,114)",
    cornerSize: parseInt(canvas.width) * 0.1,
    cornerStrokeColor: "#000000",
    borderScaleFactor: 2,
    padding: 4,
  });

  var text = new fabric.Text(t, {
    top: 10,
    left: 10,
    fontSize: fontsize,
    fill: color,
    fontStyle: italic,
    fontWeight: bold,
    underline: underline,
    stroke: strokeColor,
    strokeWidth: stroke,
    shadow: "green",
    shadowWidth: 10,

    opacity: parseFloat(finalOpacity),
  });
  canvas.add(text).setActiveObject(text);
};
//additional image

// Custom control

///save button
document.querySelector("#save").onclick = function () {
  window.location.href = "#down";
  document.querySelector("#content").style.display = "none";
  document.querySelector(".thankyouBox").style.visibility = "visible";
  box.style.height = "300px";
  box.style.background = "#d24dff";
};
// Custom control

////download button

document.querySelector("#downloadButton").onclick = function () {
  var result = canvas.toDataURL();
  var a = document.createElement("a");
  a.href = result;
  a.download = "Meme";
  a.click();
};
