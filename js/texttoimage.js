const getScript = document.currentScript;
const pageTool = getScript.dataset.tool;
const lang = getScript.dataset.lang;
var container = document.querySelector(".container2");
var inputbox = document.querySelector("#inputbox");
var content = document.querySelector("#content");
var file = document.querySelector("#file");
var box = document.querySelector(".box");

var input;

///canvasloading
///// styling button

//additional text

$("#reset_text").click(function () {
  location.reload();
});
var all_inputs = document.querySelectorAll(
  "#m_text,#m_color,#m_font_family,#m_bg,#stroke_number,#stroke_color,#m_line_height,#m_text_align,#m_font_size,.font_div .btn-group label .m_bold,.font_div .btn-group label .m_italic"
);
for (let i = 0; i < all_inputs.length; i++) {
  all_inputs[i].oninput = function () {
    var text = $("#m_text").val() || "please enter text";
    var font_style = $("#m_font_family").val() || "serif";
    var font_color = $("#m_color").val();
    var bg_color = $("#m_bg").val();
    var stroke = $("#stroke_number").val() || 0;
    var stroke_color = $("#stroke_color").val() || "null";
    var save_as = $(".save_as_div select").val() || "png";
    var line_height = $("#m_line_height").val() || 1.3;
    var align = $("#m_text_align").val();
    var font_size = $("#m_font_size").val() || 25;
    var bold = $(".font_div .btn-group label .m_bold").is(":checked");
    var italic = $(".font_div .btn-group label .m_italic").is(":checked");
    countWords();
    function countWords() {
      s = document.getElementById("m_text").value;
      s = s.replace(/(^\s*)|(\s*$)/gi, "");
      s = s.replace(/[ ]{2,}/gi, " ");
      s = s.replace(/\n /, "\n");
      document.querySelector(".m_header span").innerHTML = s.split(" ").length;
    }
    var style = {
      font: font_style,
      align: align,
      color: font_color,
      size: font_size,
      background: bg_color,
      stroke: stroke,
      strokeColor: stroke_color,
      lineHeight: line_height + "em",
      bold: bold,
      italic: italic,
    };

    var textImage2 = TextImage(style);
    console.log(textImage2);
    var img = textImage2.toImage(text);
    console.log(img);
    document.querySelector("#meme_img").src = img.src;
    // Custom control

    ///save button
    document.querySelector("#save").onclick = function () {
      window.location.href = "#";
      document.querySelector("#content_2").style.display = "none";
      document.querySelector(".thankyouBox").innerHTML =
        ' <div class="row"> <div class="col col-md-12 col-sm-12 col-lg-12 col-xl-12"> <img src="/trust.svg" alt="" id="thankyouImage" /> <p id="thankyouText">Thanks for your patience</p> <a class="btn" id="downloadButton">DOWNLOAD</a> </div> </div>';
      box.style.background = "#d24dff";

      document.querySelector(".thankyouBox").style.margin = "auto";
      $(".box").css({ "border-radius": "0px", background: "#ff8533" });
      $(".box-border").css({
        border: " 2px dashed rgba(0, 0, 0, 0.15)",
        background: "rgba(0, 0, 0, 0.1)",
      });

      document.querySelector("#downloadButton").onclick = function () {
        var extension = $(".save_as_div select").val();
        var src = img.src;
        var new_src = src.replace(/^.*\;/, "data:image/" + extension + ";");
        var a = document.createElement("a");
        a.href = new_src;
        a.download = "safeimagekit-texttoimage." + extension;
        a.click();
        if (lang === "en") {
          window.location.href = `/download?tool=${pageTool}`;
        } else {
          window.location.href = `/${lang}/download?tool=${pageTool}`;
        }
      };
    };
  };
}

///setting options

////download button
