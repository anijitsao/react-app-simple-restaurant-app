// imports dependencies
let express = require('express')
let app = express()
const morgan = require('morgan')

// router
const route = require('./routes')

// PORT 3000
const PORT = 3000

// serve the static pages
app.use(morgan("dev"))
app.use(express.static('../dist'))


app.use('/services', route)
app.listen(PORT, () => {
	console.log('Server is running on ', PORT)
})