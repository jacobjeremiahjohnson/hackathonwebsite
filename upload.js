const input = document.querySelector("input")
const output = document.querySelector("output")
let imagesArray = []

input.addEventListener("change", function() {
    const file = input.files
    imagesArray.push(file[0])
    display()
})

function display() {
    let images = ""
    imagesArray.forEach((image, index) => {
        images += `<div class="image">
        <img src="${URL.createObjectURL(image)}" alt="image">
        <span onclick="deleteImage(${index})">&times;</span>
      </div>`
    })
    output.innerHTML = images
}