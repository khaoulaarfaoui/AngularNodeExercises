module.exports = app => {
  const products = require('../Controllers/product.controlers')

  var router = require('express').Router()

  // Create a new Product
  router.get('/get/all', products.readAll)
  router.get('/getdetail/:id', products.FindOne)
  router.put('/update/:id', products.update)
  router.delete('/delete/:id', products.delete)
  router.post('/', products.create)
  app.use('/api/products', router)
}
