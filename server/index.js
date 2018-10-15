// imports dependencies
let express = require('express')
let app = express()
let bodyParser = require('body-parser')

var constants = require('./constants')

// db dependencies
var MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectID
var url = constants.DB_URL

var query = require('./query')

app.use(bodyParser.json())
app.use(express.static('../public'))

// serve the home page
app.get('/', function (req, res) {
	res.send('index.html')
})

// find restaurant api
app.get('/restaurants/:_id?', (req, res) => {
	console.log(req.params)

	var criteria = (req.params) ? { "_id": ObjectId(req.params['_id']) } : ''
	console.log(criteria)
	console.log('restaurants api reached.. ')
	MongoClient.connect(url, function (err, db) {
		// assert.equal(null, err);
		query.findRestaurants(req, res, db, function () {
			db.close()
		})
	})
})

// add restaurant api
app.post('/addRestaurant', (req, res) => {
	console.log(req.body)
	var data = req.body
	MongoClient.connect(url, function (err, db) {
		// assert.equal(null, err);
		query.insertDocument(res, data, db, function () {
			db.close()
		})
	})
})

// delete restaurant api
app.delete('/deleterestaurant/:id', (req, res) => {
	console.log(req.params)
	var id = req.params['id']
	MongoClient.connect(url, function (err, db) {

		query.removeRestaurant(id, res, db, function () {
			db.close();
		});
	});
})

// update restaurant api
app.put('/updaterestaurant/:id', (req, res) => {
	console.log('update api reached')
	console.log('_id:', req.params['id'])
	console.log('update body', req.body)

	var id = req.params['id']
	var data = req.body
	MongoClient.connect(url, function (err, db) {
		query.updateRestaurant(id, data, res, db, function () {
			db.close();
		});
	});
})

// search api
app.get('/search/:value', (req, res) => {

	var searchItem = req.params['value']
	console.log(searchItem)
	// res.json('search api reached...')
	MongoClient.connect(url, function (err, db) {
		// assert.equal(null, err);
		query.findRestaurants(req, res, db, function () {
			db.close()
		})
	})
})


// review api
app.put('/review/:id', (req, res) => {
	console.log('review api reached.. ')

	let id = req.params['id']
	let data = req.body

	console.log('body: ', data)
	console.log('Restaurabt Id: ', id)

	MongoClient.connect(url, function (err, db) {
		query.updateReview(id, data, res, db, function () {
			db.close();
		});
	});
})

// update booking
app.put('/updatebooking/:id', (req, res) => {
	let id = req.params['id']
	let data = req.body

	console.log('body: ', data)
	console.log('Restaurabt Id: ', id)

	MongoClient.connect(url, function (err, db) {
		query.updateBooking(id, data, res, db, function () {
			db.close();
		});
	});
})

// listen
app.listen(3000, function () {
	console.log('Server is running')
})