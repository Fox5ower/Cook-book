export default function (data: any) {
  let errorContainer = document.querySelector('.error-container')
  let errorText = document.querySelector('.error-container > i')

  if (errorContainer && errorText && data) {
    for (let key in data) {
      errorContainer.classList.add('error-container-visible')
      errorText.innerHTML = data[key]
    }
  } else if (data === "") {
    errorContainer.classList.remove('error-container-visible')
  }
}
