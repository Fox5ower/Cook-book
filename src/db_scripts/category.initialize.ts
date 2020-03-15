const Category = require('../models/Category')
import categoryData from '../../config/category.json'

export default async () => {
  const category = await Category.find()
  if (category.length >= 1) {
    console.log('Category collection already exists')

    return
  } else {
    categoryData.forEach(async category => {
      const newCategory = new Category({
        name: category.name,
        language: category.language,
      })
      const savedCategory = await newCategory.save()
      if (savedCategory) {
        console.log('New category created')
      } else {
        console.log({ message: 'Something went wrong' })
      }
    })
  }
}
