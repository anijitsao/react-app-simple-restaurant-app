// imports dependencies
let express = require('express')
let app = express()

// router
const router = require('./routes')

// PORT 3000
const PORT = 3000

// serve the static pages
app.use(express.static('../public'))

app.use('/services', router)
app.listen(PORT, () => {
	console.log('Server is running on ', PORT)
})