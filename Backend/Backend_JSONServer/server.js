/*creatig the node server */
const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
var corsOptions = {
  origin: 'http://localhost:8081'
}
app.use(cors(corsOptions))
//parse requests
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the app' })
})
require('./App/Routes/product.routes')(app)
// set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
  console.log(__dirname)
})
