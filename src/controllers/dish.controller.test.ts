import axios from 'axios'
import server from '../test.server'
import IDish from '../interfaces/IDish'

describe('Test the dishes controller', () => {
  let serverPromise = new Promise(resolve => {
    resolve(server)
  })

  it('Should response the GET method', async () => {
    await serverPromise.then(async () => {
      await axios.get('http://localhost:3002/getdishes').then(res => {
        expect(res.status).toEqual(200)
      })
    })
  })

  it('Should response the GET method with passed locale with localized data', async () => {
    await serverPromise.then(async () => {
      await axios.get('http://localhost:3002/getdishes/ru').then(res => {
        res.data.dish.forEach((recipe: IDish) => {
          expect(recipe.language).toEqual('Russian')
        })
      })
    })
  })
})
