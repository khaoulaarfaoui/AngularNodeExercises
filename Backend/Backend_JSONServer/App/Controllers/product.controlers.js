//require modules
const fs = require('fs')
const path = require('path')

//relative path to the source
const source = path.join(__dirname, '../../Database/products.json')

//get the user data from json file
const getProductData = () => {
  const jsonData = fs.readFileSync(source)
  return JSON.parse(jsonData)
}
//read the user data from json file
const saveProductData = data => {
  const stringifyData = JSON.stringify(data)
  fs.writeFileSync(source, stringifyData)
}

// Create and Save a new Product
exports.create = (req, res) => {
  //get the new user data from post request
  const ProductData = req.body
  if (
    ProductData.id == null &&
    ProductData.title == null &&
    ProductData.price == null &&
    ProductData.description == null &&
    ProductData.category == null
  ) {
    res.status(400).send({ message: 'Product missing informations' })
    return
  }
  //get the existing users data
  const existProducts = getProductData()

  //check if the username exist already
  const findExist = existProducts.find(product => product.id === ProductData.id)
  if (findExist) {
    return res.status(409).send({ error: true, msg: 'id already exist' })
  }
  //you should push the element into the existant object then save it
  existProducts.push(ProductData)
  saveProductData(ProductData)
  res.send({ success: true, msg: 'Product data added successfully' })
}

// Update and Save a Product
exports.update = async (req, res) => {
  const ProductID = req.params.id
  const ProductData = req.body
  const existProducts = getProductData()
  const findExist = await existProducts.find(
    product => product.id === parseInt(ProductID)
  )
  if (!findExist) {
    return res.status(409).send({ error: false, msg: 'id doesnt exist' })
  }
  //filter the userdata
  const updateProduct = existProducts.filter(
    product => product.id !== parseInt(ProductID)
  )
  //push the updated data
  updateProduct.push(ProductData)
  //finally save it
  saveProductData(updateProduct)
  res.send({ success: true, msg: 'Product data updated successfully' })
}

//get all function
exports.readAll = (req, res) => {
  const products = getProductData()
  res.send(products)
}

//Find one Product
exports.FindOne = async (req, res) => {
  const ProductID = req.params.id
  const existProducts = getProductData()
  const findExist = await existProducts.find(
    product => product.id === parseInt(ProductID)
  )

  res.send(findExist)
}
// Delete - Delete method
exports.delete = async (req, res) => {
  const ProductID = req.params.id
  //get the existing userdata
  const existProducts = getProductData()
  //filter the userdata to remove it
  const findExist = await existProducts.filter(
    product => product.id !== parseInt(ProductID)
  )
  console.log(findExist)
  if (existProducts.length === findExist.length) {
    return res.status(409).send({ error: true, msg: 'Product does not exist' })
  }
  //save the filtered data
  saveProductData(findExist)
  res.send({ success: true, msg: 'Product removed successfully' })
}
