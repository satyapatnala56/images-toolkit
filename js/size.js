var container = document.querySelector(".container2");
var inputbox = document.querySelector("#inputbox");
var content = document.querySelector("#content");
var file = document.querySelector("#file");
var box = document.querySelector(".box");

var input;
function nav_click() {
  document.querySelector("#nav_button").click();
}
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
    resize_loader();
  } else {
    console.log("error");
    container.style.height = "350px";
    document.querySelector("#error").innerHTML = "File format not supported";
  }
};
file.onchange = function () {
  inputbox.style.display = "none";
  input = file.files[0];
  resize_loader();
};

function resize_loader() {
  $("#file").remove();
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
      container.style.height = "auto";
      resizing_function();
      clearInterval(ans);
    }
  }, 300);
}

function resizing_function() {
  var flag = 0;

  var resized_url, resized_height, resized_width;
  var reader = new FileReader();
  reader.onload = function () {
    document.querySelector("#input_img_div img").src = reader.result;
    resizing();
    function resizing() {
      document.querySelector("#resize_img").onclick = function () {
        var changes_height =
          document.querySelector("#changed_height").value || undefined;
        var changes_width =
          document.querySelector("#changed_width").value || undefined;
        if (changes_width == undefined || changes_height == undefined) {
          document.querySelector("#Save_button").style.marginTop = "49px";

          document.querySelector("#resize_err").style.color = "yellow";
          document.querySelector("#resize_err").innerHTML =
            "Enter both height and width";
        } else {
          var img = new Image(changes_width, changes_height);
          img.onload = function () {
            var canvas = document.createElement("canvas"),
              ctx = canvas.getContext("2d");
            canvas.width = changes_width;
            canvas.height = changes_height;
            ctx.drawImage(img, 0, 0, changes_width, changes_width);
            document.querySelector("#resize_err").style.color = "green";
            document.querySelector("#resize_err").innerHTML = "Image Resized";
            document.querySelector("#Save_button").style.marginTop = "49px";

            document.querySelector("#Save_button").onclick = function () {
              document.querySelector("#content").style.display = "none";
              window.location.href = "#";
              document.querySelector(".thankyouBox").innerHTML =
                ' <div class="row"> <div class="col col-md-12 col-sm-12 col-lg-12 col-xl-12"> <img src="/trust.svg" alt="" id="thankyouImage" /> <p id="thankyouText">Thanks for your patience</p> <a class="btn" id="downloadButton">DOWNLOAD</a> </div> </div>';
              container.style.height = "300px";
              box.style.background = "#00b8e6";
              ////download button
              var downloadButton = document.getElementById("downloadButton");
              downloadButton.onclick = function () {
                var a = document.createElement("a");
                a.href = canvas.toDataURL();
                a.download = "download";
                a.click();
              };
            };

            document.querySelector("#nav_button").onclick = function () {
              resized_url = canvas.toDataURL();
              resized_height = changes_height;
              resized_width = changes_width;
              if (flag == 0) {
                window.location.href = "#";
                document.querySelector("#content").innerHTML =
                  '<div class="row" style="margin: auto; margin-top: 10px"> <div class="col col-md-12 col-sm-12 col-lg-12 col-xl-12"> <div id="prev_back_container"> <a class="btn" id="prev_back"  onclick="nav_click()">Back</a> </div> <div id="prev_heading_div"> <p>Output Image</p> </div> <div id="prev_img_div"> <br /> <img src="" alt="" /> <br /><br/> </div> <div id="prev_info_div"> <div id="prev_info_container"> <p class="prev_info_heading" id="prev_heading_height">Height</p> <p id="prev_height" class="prev_info_value">1000px</p> <p class="prev_info_heading">Width</p> <p id="prev_width" class="prev_info_value">1000px</p> <p class="prev_info_heading">Mimetype</p> <p id="prev_mimetype" class="prev_info_value"></p> </div> <br /> </div> </div> </div>';
                document.querySelector("#prev_mimetype").innerHTML = input.type;
                document.querySelector("#prev_height").innerHTML =
                  resized_height + "px";
                document.querySelector("#prev_width").innerHTML =
                  resized_width + "px";
                document.querySelector("#prev_img_div img").src = resized_url;

                flag = 1;
              } else if (flag == 1) {
                window.location.href = "#";

                document.querySelector("#content").innerHTML =
                  '<div class="row" style="margin: auto"> <div class="col col-md-12 col-sm-12 col-lg-12 col-xl-12"> <div id="image_div"> <div id="alternative_save_div"> <a href="" class="btn" id="alternative_save_button">Save</a> </div> <div id="input_div"> <br /><br /> <div id="input_img_div"><img src="" alt="" /></div> <br /><br /> <div id="input_info_div"></div> </div> </div> <div id="options_div"> <div id="input_container"> <input type="number" name="" id="changed_width" class="resizing_inputs" placeholder="Enter &nbsp;width" /> <input type="number" name="" id="changed_height" class="resizing_inputs" placeholder="Enter&nbsp; height" /> <a id="preview" class="btn resize_btns" onclick="nav_click()" >Preview</a > <a id="resize_img" class="btn resize_btns">Resize</a><br /> <p id="resize_err"></p> <a id="Save_button">Save</a> </div> </div> </div> </div>';
                document.querySelector("#input_img_div img").src =
                  reader.result;
                document.querySelector("#changed_height").value = resized_width;
                document.querySelector("#changed_width").value = resized_width;
                resizing();
                document.querySelector("#resize_img").click();

                flag = 0;
              }
            };
          };
          img.src = reader.result;
        }
      };
    }
  };
  reader.readAsDataURL(input);
}
document.querySelector(".container2").onclick = function () {
  document.querySelector("#file").click();
};
