import validateInformationInputData from './admin.info.validation'

interface IValidity {
  errors: object
  isValid: boolean
}

interface IFakeData {
  name?: string
  email?: string
}

it('Should correctly validate incoming data', () => {
  const validFakeData: IFakeData = {
    name: 'fakeName',
    email: 'fake@email.com',
  }

  const validFakeDataToo: IFakeData = {
    name: 'newFakeName',
    email: '',
  }

  const invalidFakeData: IFakeData = {
    name: '',
    email: '',
  }

  const validatedData: IValidity = validateInformationInputData(validFakeData)
  const validatedDataToo: IValidity = validateInformationInputData(validFakeDataToo)
  const invalidatedData: IValidity = validateInformationInputData(invalidFakeData)

  expect(validatedData['isValid']).toBe(true)
  expect(validatedDataToo['isValid']).toBe(true)
  expect(invalidatedData['isValid']).toBe(false)
})
