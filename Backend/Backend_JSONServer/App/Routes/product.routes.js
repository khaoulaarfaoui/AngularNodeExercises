module.exports = app => {
  const products = require('../Controllers/product.controlers')

  var router = require('express').Router()

  // Create a new Product
  router.get('/get/:id', products.FindOne)
  router.get('/get/all', products.readAll)
  router.put('/update/:id', products.update)
  router.delete('/delete/:id', products.delete)
  router.post('/', products.create) 
  app.use('/api/products', router)
}
