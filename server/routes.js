// imports dependencies
const express = require('express')
const cors = require('cors')

const morgan = require('morgan')
const bodyParser = require('body-parser')


// local file dependencies
const dbOps = require('./dbOps')
let router = express.Router()


// middlewares
router.use(cors())
router.use(bodyParser.json({ type: 'application/json' }))
router.use(morgan('dev'))

// most important to serve static pages don't forget
// router.use(express.static('../public'))

router.post('/getrestaurants/:item?', (req, res)=>{
	dbOps.connectDbAndRunQueries('getRestaurants', req, res)

})



 
module.exports = router