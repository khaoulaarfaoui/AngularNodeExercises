/*creatig the node server */
const express = require('express')
const cors = require('cors')

const app = express()
var corsOptions = {
  origin: 'http://localhost:8081'
}
app.use(cors(corsOptions))
//parse requests
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const db = require('./App/Models')
//to auto make changes on DB
db.sequelize.sync()

db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and re-sync db.')
})

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the app' })
})
require('./app/routes/turorial.routes')(app)

// set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
