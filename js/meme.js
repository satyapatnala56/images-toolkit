const getScript = document.currentScript;
const pageTool = getScript.dataset.tool;
const lang = getScript.dataset.lang;
var container = document.querySelector(".container2");
var inputbox = document.querySelector("#inputbox");
var content = document.querySelector("#content");
var file = document.querySelector("#file");
var box = document.querySelector(".box");
var input;
var boxContainer = document.querySelector(".container2");
const gdrive = document.querySelector("#filepicker");
const getFile = (file) => {
  onFileDrop(file, 1);
};
const showLoader = () => {
  document.querySelector("#inputbox").style.display = "none";
  var loaderbox = document.createElement("div");
  loaderbox.id = "loader-box";
  var mainDiv = document.querySelector("#loaderDiv .col");
  mainDiv.insertBefore(loaderbox, mainDiv.childNodes[1]);
  document.querySelector("#loader").innerHTML = '<p id="loadingMessage"></p>';
  document.querySelector("#loadingMessage").innerHTML =
    "Please Wait ,Loading Your file ";
};
const closeLoader = () => {};
const mimeTypes = "image/png,image/jpg,image/jpeg,image/webp";
const filemimes = [".png", ".webp", ".jpg", ".jpeg"];
gdrive.addEventListener(
  "click",
  (getFile, mimeTypes, showLoader, closeLoader) => {
    const data = loadPicker();
  }
);
const getDropBoxFile = (file) => {
  onFileDrop(file, 1);
};
const dropbox = document.getElementById("dropbox");
dropbox.addEventListener(
  "click",
  async (getDropBoxFile, showLoader, closeLoader) => {
    const getFile = chooseFromDropbox();
  }
);
boxContainer.ondrop = (e) => {
  e.preventDefault();
  onFileDrop(e.dataTransfer.files[0]);
};
document.querySelector("#Inputbox").onclick = function () {
  document.querySelector("#file").click();
};
container.ondragover = function (e) {
  e.preventDefault();
};
const onFileDrop = (file, flag = 0) => {
  input = file;
  var extension = input.name.replace(/^.*\./, "");
  if (
    extension == "webp" ||
    extension == "jpg" ||
    extension == "jpeg" ||
    extension == "png" ||
    extension == "svg"
  ) {
    if (flag == 0) {
      showLoader();
    }

    container.style.height = "300px";

    inputbox.style.display = "none";
    memeProcessing();
  } else {
    console.log("error");
    document.querySelector("#error").style.visibility = "visible";

    container.style.height = "350px";
    document.querySelector("#error").innerHTML = "File format not supported";
  }
};
const fileOnChange = () => {
  showLoader();

  input = file.files[0];

  memeProcessing();
};
//

function memeProcessing() {
  $("#file").remove();

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
      document.querySelector(".box").style.background = "white";
      document.querySelector(".box-border").style.background = "none";
      document.querySelector(".box-border").style.border = "none";
      document.querySelector(".container2").style.height = "auto";

      document.querySelector(".container2_inner").style.paddingLeft = "10px";
      document.querySelector(".container2_inner").style.paddingTop = "11px";
      document.querySelector(".container2_inner").style.paddingRight = "15px";
      document.querySelector(".container2_inner").style.paddingBottom = "35px";
      document.querySelector(".box").style.borderRadius = "20px";
      document.querySelector(".container2_inner").style.borderRadius = "20px";

      clearInterval(ans);
    }
  }, 500);

  var reader2 = new FileReader();
  reader2.onload = function () {
    //canvas adding
    var img = new Image();
    img.onload = function () {
      var canvas = new fabric.Canvas("meme_canvas", {
        width: img.width,
        height: img.height,
        selection: true,
        allowTouchScrolling: true,
      });
      fabric.Image.fromURL(
        reader2.result,
        function (meme) {
          document.querySelector(".canvas-container").style.width = "100%";
          document.querySelector(".canvas-container").style.height = "auto";
          document.querySelector(".canvas-container").style.position =
            "relative";
          document.querySelector("#meme_canvas").style.width = "auto";
          document.querySelector("#meme_canvas").style.height = "auto";
          document.querySelector("#meme_canvas").style.position = "initial";
          document.querySelector(".upper-canvas").style.width = "auto";

          document.querySelector(".upper-canvas").style.height = "auto";

          canvas.setBackgroundImage(meme, canvas.renderAll.bind(canvas));
        },
        {
          crossOrigin: "anonymous",
        }
      );
      fabric.Object.prototype.set({
        transparentCorners: false,
        cornerColor: "yellow",
        borderColor: "rgba(88,42,114)",
        cornerSize: parseInt(canvas.width) * 0.02,
        cornerStrokeColor: "#000000",
        borderScaleFactor: 2,
        padding: 4,
      });
      var bg_color = "";
      document.querySelector(".bg_div_inner input").oninput = () => {
        bg_color = document.querySelector(".bg_div_inner input").value;
        alert(bg_color);
      };
      function createShadow(color, width) {
        return `${width} 0px 0px ${color}`;
      }
      function underline() {
        var underline_value;
        var underline = document.querySelector(
          ".font_div .btn-group label .m_underline"
        ).checked;

        if (underline == true) {
          underline_value = "underline";
        } else {
          underline_value = "";
        }
        return underline_value;
      }

      function bold() {
        var bold_value;

        var bold = document.querySelector(
          ".font_div .btn-group label .m_bold"
        ).checked;
        if (bold == true) {
          bold_value = "bold";
        } else {
          bold_value = "";
        }
        return bold_value;
      }

      function italic() {
        var italic_value;
        var italic = document.querySelector(
          ".font_div .btn-group label .m_italic"
        ).checked;

        if (italic == true) {
          italic_value = "italic";
        } else {
          italic_value = "";
        }
        return italic_value;
      }

      document.querySelector("#add_text").onclick = function () {
        console.log(document.querySelector(".bg_div_inner input").clicked);
        ////helper functions

        console.log(bg_color);
        var text = new fabric.Text(
          document.querySelector(".text_div .inputs_div textarea").value,
          {
            top: 50,
            left: 50,
            fontSize: 200,
            underline: underline(),
            fontWeight: bold(),
            fontStyle: italic(),
            fontFamily:
              document.querySelector(".font_family select").value || "Arial",
            fontSize:
              parseInt(document.querySelector(".font_size input").value) || 200,
            fill: document.querySelector(
              ".text_div .inputs_div input[type='color']"
            ).value,
            textBackgroundColor: bg_color,
            strokeWidth:
              parseInt(
                document.querySelector(".m_stroke div input[type='number']")
                  .value
              ) || 0,
            stroke: document.querySelector(".m_stroke div input[type='color']")
              .value,

            opacity:
              parseInt(
                document.querySelector(".opacity_div input[type='range']").value
              ) / 100 || 1,
            shadow: createShadow(
              document.querySelector(".m_shadow input[type='color']").value,
              document.querySelector(".m_shadow input[type='number']").value
            ),
          }
        );
        canvas.add(text).setActiveObject(text);
        document.querySelector(".opacity_div #m_opacity").value = 100;
      };

      document.querySelector("#add_image").onclick = () => {
        var input_file = document.createElement("input");
        input_file.id = "image_input";
        input_file.type = "file";
        input_file.click();
        input_file.onchange = () => {
          const reader = new FileReader();
          reader.onload = function () {
            var image = new Image();
            image.src = reader.result;
            image.onload = function () {
              fabric.Image.fromURL(
                reader.result,
                function (image) {
                  image.scaleToWidth(canvas.width / 2);
                  canvas.add(image).setActiveObject(image);
                },
                {
                  opacity:
                    parseInt(
                      document.querySelector(".opacity_div input[type='range']")
                        .value
                    ) / 100 || 1,
                }
              );
            };
          };
          reader.readAsDataURL(input_file.files[0]);
        };
      };
      function setValue(key, value) {
        if (canvas.getActiveObject() != null) {
          var activeText = canvas.getActiveObject();
          activeText.set(key, value);
          canvas.renderAll();
        }
      }
      loadObjectHandlers();
      function loadObjectHandlers() {
        var all_inputs = document.querySelectorAll(
          ".text_div .inputs_div #m_text,.font_size #m_font_size,.text_div .inputs_div #m_color,.bg_div_inner #m_bg,.opacity_div #m_opacity,.m_stroke #stroke_number,.m_stroke #stroke_color,.m_shadow #shadow_color,.m_shadow #shadow_number,.font_div .font_family #m_font_family,#style_btns label .m_underline,#style_btns label .m_bold,#style_btns label .m_italic"
        );

        for (let j = 0; j < all_inputs.length; j++) {
          all_inputs[j].oninput = () => {
            console.log(all_inputs[j].id);
            if (all_inputs[j].id == "m_text") {
              setValue("text", all_inputs[j].value);
            }
            if (all_inputs[j].id == "m_font_size") {
              setValue("fontSize", all_inputs[j].value);
            }
            if (all_inputs[j].id == "m_color") {
              setValue("fill", all_inputs[j].value);
            }
            if (all_inputs[j].id == "m_bg") {
              setValue("v", all_inputs[j].value);
            }
            if (all_inputs[j].id == "m_opacity") {
              setValue("opacity", parseInt(all_inputs[j].value) / 100);
            }
            if (all_inputs[j].id == "stroke_number") {
              setValue("strokeWidth", parseInt(all_inputs[j].value));
            }
            if (all_inputs[j].id == "stroke_color") {
              setValue("stroke", all_inputs[j].value);
            }
            if (all_inputs[j].id == "m_font_family") {
              setValue("fontFamily", all_inputs[j].value);
            }
            if (all_inputs[j].id == "option3") {
              setValue("underline", underline());
            }
            if (all_inputs[j].id == "option1") {
              setValue("fontWeight", bold());
            }
            if (all_inputs[j].id == "option2") {
              setValue("fontStyle", italic());
              console.log(setValue("fontStyle", italic()));
            }

            if (all_inputs[j].id == "shadow_color") {
              setValue(
                "shadow",
                createShadow(
                  $(".m_shadow #shadow_color").val(),
                  $(".m_shadow #shadow_number").val()
                )
              );
            }
            if (all_inputs[j].id == "shadow_number") {
              setValue(
                "shadow",
                createShadow(
                  $(".m_shadow #shadow_color").val(),
                  $(".m_shadow #shadow_number").val()
                )
              );
            }
          };
        }
      }

      function updateInputs() {
        var activeObject = canvas.getActiveObject();
        if (activeObject.get("type") == "text") {
          document.querySelector(".text_div .inputs_div #m_text").value =
            activeObject.text;
          document.querySelector(".font_size #m_font_size").value =
            activeObject.fontSize;
          document.querySelector(".text_div .inputs_div #m_color").value =
            activeObject.fill;
          document.querySelector(".bg_div_inner #m_bg").value =
            activeObject.textBackgroundColor;
          document.querySelector(".m_stroke #stroke_number").value =
            activeObject.strokeWidth;
          document.querySelector(".m_stroke #stroke_color").value =
            activeObject.stroke;
          document.querySelector(".opacity_div #m_opacity").value =
            activeObject.opacity;
          document.querySelector(".m_shadow #shadow_color").value =
            activeObject.shadow.color;
          document.querySelector(".m_shadow #shadow_number").value =
            activeObject.shadow.blur;
          document.querySelector(
            ".font_div .font_family #m_font_family"
          ).value = activeObject.fontFamily;
          document.querySelector("#style_btns label .m_underline").value =
            activeObject.underline;
          document.querySelector("#style_btns label .m_bold").value =
            activeObject.fontWeight;
          document.querySelector("#style_btns label .m_italic").value =
            activeObject.fontStyle;
          console.log(activeObject.fontStyle);
        } else {
        }
      }
      canvas.on({
        "selection:created": updateInputs,
        "selection:updated": updateInputs,
      });
      document.querySelector("#save").onclick = () => {
        window.location.href = "#";
        document.querySelector(".box").style.background = "red";
        document.querySelector(".container2").style.height = "300px";

        document.querySelector(".box-border").style.background =
          "rgba(0, 0, 0, 0.1)";
        document.querySelector(".box-border").style.background =
          "2px dashed rgba(0, 0, 0, 0.15)";

        document.querySelector("#content").style.display = "none";
        document.querySelector(".thankyouBox").innerHTML =
          ' <div class="row"> <div class="col col-md-12 col-sm-12 col-lg-12 col-xl-12"> <img src="/trust.svg" alt="" id="thankyouImage" /> <p id="thankyouText">Thanks for your patience</p> <span><a class="btn" id="downloadButton">DOWNLOAD</a></span> </div> </div>';

        document.querySelector(".box").style.borderRadius = "0px";
        ///download button

        document.querySelector("#downloadButton").onclick = function () {
          document.querySelector(".thankyouBox span").style.color = "white";
          document.querySelector(".thankyouBox span").style.fontWeight = "bold";

          document.querySelector(".thankyouBox span").innerHTML =
            "Downloading might take a while";
          var a = document.createElement("a");
          a.href = canvas.toDataURL();
          fetch(canvas.toDataURL())
            .then((res) => res.blob())
            .then(function (blob) {
              var url = window.URL.createObjectURL(blob);
              a.href = url;
              var complete_file_name =
                "safeimagekit-" + input.name.match(/^.*\./) + "png";
              console.log(complete_file_name);
              a.download = "safeimagekit-" + input.name.match(/^.*\./) + "png";
              a.click();
              setTimeout(() => {
                if (lang === "en") {
                  window.location.href = `/download?tool=${pageTool}`;
                } else {
                  window.location.href = `/${lang}/downlod?tool=${pageTool}`;
                }
              }, 200);
            });
        };
      };
    };
    img.src = reader2.result;
  };
  reader2.readAsDataURL(input);
}

const showDropDown = document.querySelector(".file-pick-dropdown");
const icon = document.querySelector(".arrow-sign");
const dropDown = document.querySelector(".file-picker-dropdown");
showDropDown.addEventListener("click", () => {
  addScripts();
  if (dropDown.style.display !== "none") {
    dropDown.style.display = "none";
    icon.classList.remove("fa-angle-up");
    icon.classList.add("fa-angle-down");
  } else {
    dropDown.style.display = "block";
    icon.classList.remove("fa-angle-down");
    icon.classList.add("fa-angle-up");
  }
});
