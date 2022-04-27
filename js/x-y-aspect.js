const getScript = document.getElementById("get-value");
const aspect = (getScript.dataset.width_value/getScript.dataset.height_value)
const width = document.getElementById("width").value;
  const result = width/aspect
  document.getElementById("height").value= parseInt(result);
  document.getElementById("dimensions").style.display = "block";
  document.getElementById("dimensions").innerHTML=`<b style="color:#e83e8c;">Final Dimensions: ${width}x${parseInt(result)}</b>`;
function calculation(){
    const width = document.getElementById("width").value;
  const aspect = (getScript.dataset.width_value/getScript.dataset.height_value)
  const result = width/aspect
  document.getElementById("height").value= parseInt(result);
  document.getElementById("dimensions").style.display = "block";
  document.getElementById("dimensions").innerHTML=`<b style="color:#e83e8c;">Final Dimensions: ${width}x${parseInt(result)}</b>`;
}