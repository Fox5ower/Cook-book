import localizeRoute from './localize.route'

it('Should return a modified route with current locale', () => {
  let locale = localStorage.getItem('locale')
  if (locale) {
    let recieved = localizeRoute('test_route')
    expect(recieved).toBe(`/${locale}/test_route`)
  } else {
    locale = navigator.language.substr(0, 2)
    let recieved = localizeRoute('test_route')
    expect(recieved).toBe(`/${locale}/test_route`)
  }
})
