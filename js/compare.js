var container = document.querySelector(".container2");
var inputbox = document.querySelector("#inputbox");
var content = document.querySelector("#content");
var file = document.querySelector("#file");

var input;
container.ondragover = function (e) {
  e.preventDefault();
};
container.ondrop = function (e) {
  e.preventDefault();
  input = e.dataTransfer.files[0];
  container.style.height = "1100px";
  inputbox.style.display = "none";
  content.style.visibility = "visible";
  compare();
};
file.onchange = function () {
  container.style.height = "1100px";
  inputbox.style.display = "none";
  content.style.visibility = "visible";
  input = file.files[0];
  compare();

  function compare() {
    var flie2 = document.querySelector("#file2");
    file2.onchange = function () {
      var reader = new FileReader();
      reader.onload = function () {
        var reader2 = new FileReader();
        reader2.onload = function () {
          document.querySelector("#split").onclick = function () {
            //split image comparison
            split(reader.result, reader2.result);
          };
          ////fade image comparison
          document.querySelector("#fade").onclick = function () {
            fade(reader.result, reader2.result);
          };
          document.querySelector("#slide").onclick = function () {
            slider(reader.result, reader2.result);
          };
        };
        reader2.readAsDataURL(file2.files[0]);
      };
      reader.readAsDataURL(input);
    };

    ////functionalities
    function split(value1, value2) {
      document.querySelector("#compResult").innerHTML =
        '<img src="' +
        value1 +
        '" alt="" id="splitcomp1" /><img  src="' +
        value2 +
        '"  alt=""  id="splitcomp2"/>';
    }
    function fade(value1, value2) {
      document.querySelector("#compResult").innerHTML = "<div  id='pt'></div>";
      document.querySelector("#pt").style.backgroundImage =
        "url('" + value1 + "')";
      document.querySelector("#pt").innerHTML =
        "<img src='" + value2 + "' id='fadecomp1'>";
    }

    function slider() {
      document.querySelector("#compResult").innerHTML =
        '<div class="cocoen"> <img src="ot.jpg" alt="" id="img1" /> <img src="log.png" alt="" id="img1" /> </div> ';
      Cocoen.create(document.querySelector(".cocoen"));
    }
  }
};
