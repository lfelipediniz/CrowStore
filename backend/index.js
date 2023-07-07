const express = require('express')
const cors = require('cors')

const app = express()

const Upimgs = require("./routes/Upimgs")

app.use("/imgs", Upimgs)
// Config JSON response
app.use(express.json())

//Solve CORS
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

// Public folder for images
app.use(express.static('public'))

// Routes

app.use("/order", require('./routes/OrderRoutes'))
app.use('/users', require('./routes/UserRoutes'))
app.use('/products', require('./routes/ProductRoutes'))

app.listen(5000)
