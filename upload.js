const fileInput = document.getElementById("input")
const output = document.getElementById("input-wrapper")
let imagesArray = []
var base64String;

input.onchange = () => {
    const selectedFile = fileInput.files[0];
  console.log(selectedFile);

  var reader = new FileReader();
  reader.onloadend = function() {
    console.log(reader.result)
    base64String = reader.result
  }
  reader.readAsDataURL(selectedFile)
  console.log(reader)
}
