export default function (data: object) {
    let errorContainer = document.querySelector(".error-container");
    let errorText = document.querySelector(".error-container > i");
    for (let key in data) {
        console.log(data[key]);
        errorContainer.classList.add("error-container-visible");
        errorText.innerHTML = data[key];
    }

}