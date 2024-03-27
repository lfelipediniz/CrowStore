const express = require('express')
const cors = require('cors')

const app = express()

const Upimgs = require ("./routes/Upimgs")

app.use("/imgs", Upimgs)
// Config JSON response
app.use(express.json())


// Public folder for images
app.use(express.static('public'))

// Routes

app.use('/users', require('./routes/UserRoutes'))
app.use('/products', require('./routes/ProductRoutes'))
app.use('/categories', require('./routes/CategoryRoutes'))


app.listen(5001)
