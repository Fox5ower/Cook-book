import getLocale from './get.locale'

it('Should return a current locale', () => {
  global['window'] = Object.create(window)
  const ruUrl = 'http://ru/test.com'
  const enUrl = 'http://en/test.com'
  Object.defineProperty(window, 'location', {
    value: {
      href: enUrl,
    },
  })
  expect(getLocale()).toBe("en");
})
