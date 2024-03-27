const express = require('express')
const cors = require('cors')

const app = express()

const Upimgs = require ("./routes/Upimgs")

app.use("/imgs", Upimgs)
// Config JSON response
app.use(express.json())

//Solve CORS
app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }));


// Public folder for images
app.use(express.static('public'))

// Routes

app.use('/users', require('./routes/UserRoutes'))
app.use('/products', require('./routes/ProductRoutes'))
app.use('/categories', require('./routes/CategoryRoutes'))


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
