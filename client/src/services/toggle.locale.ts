export default function() {
  let location = window.location.href
  let currentLocale = location.match(/(\/en\/|\/ru\/)/)[0]

  if (currentLocale === '/ru/') {
    location = location.replace(/(\/ru\/)/, '/en/')
    localStorage.setItem('locale', 'en')
    window.location.href = location
  } else if (currentLocale === '/en/') {
    location = location.replace(/(\/en\/)/, '/ru/')
    localStorage.setItem('locale', 'ru')
    window.location.href = location
  }
}
