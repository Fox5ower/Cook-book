const Dish = require('../models/Dish')
import dishData from '../../config/dish.json'

export default async () => {
  const dish = await Dish.find()
  if (dish.length >= 1) {
    console.log('Dish collection already exists')

    return
  } else {
    dishData.forEach(async dish => {
      const newDish = new Dish({
        name: dish.name,
        category: dish.category,
        method: dish.method,
        description: dish.description,
        engreediants: dish.engreediants,
        language: dish.language,
        image: dish.image,
      })
      const savedDish = await newDish.save()
      if (savedDish) {
        console.log('New dish created')
      } else {
        console.log({ message: 'Something went wrong' })
      }
    })
  }
}
