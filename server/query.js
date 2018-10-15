// do the query to the db
var ObjectId = require('mongodb').ObjectID;
var sendResponse = function (db, req, res) {



}
var findRestaurants = function (req, res, db, callback) {
	console.log('from query:', req.params)

	var cursor = db.collection('restaurants').find()

	// if id of a particular restaurant is given
	if (req.params['_id']) {
		cursor = db.collection('restaurants').find({ "_id": ObjectId(req.params['_id']) })
	}

	if (req.params['value']) {
		var value = req.params['value']
		cursor = db.collection('restaurants').find({
			$or: [{ "cuisine": new RegExp(value, 'i') }, { "name": new RegExp(value, 'i') }, { "address": new RegExp(value, 'i') }]
		})
	}

	// console.log('Cursor is now: ', cursor)
	var docs = []
	cursor.each(function (err, doc) {
		// assert.equal(err, null);
		if (doc != null) {
			// add to list of docs
			docs.push(doc)
			// res.json(doc)
		} else {
			// console.log('results are:', docs)
			res.json(docs)
			callback()
		}
	})
	console.log('results are:', docs)
	// res.json(docs)
}

// add a table in the Restaurant
let insertDocument = (res, data, db, callback) => {
	console.log('data from frontend: ', data)
	db.collection('restaurants').insertOne(data, (err, result) => {
		console.log("Inserted a document into the restaurants collection.")
		res.json('table added successfully')
		callback()
	})
}

// remove a restaurant
let removeRestaurant = function (id, res, db, callback) {
	db.collection('restaurants').deleteOne(
		{ "_id": ObjectId(id) },
		function (err, results) {
			//  console.log(results);
			res.json('deleted successfully')
			callback();
		}
	);
};

// update the restaurant after table modify
let updateRestaurant = function (id, data, res, db, callback) {
	db.collection('restaurants').updateOne(
		{ "_id": ObjectId(id) },
		{
			$set: { "tables": data }

		}, function (err, results) {
			res.json('table updated successfully')
			callback();
		});
};

// updates review
let updateReview = function (id, data, res, db, callback) {
	db.collection('restaurants').updateOne(
		{ "_id": ObjectId(id) },
		{
			$set: { "reviews": data }

		}, function (err, results) {
			res.json('review updated successfully')
			callback();
		});
}

// updates bookings
let updateBooking = function (id, data, res, db, callback) {
	db.collection('restaurants').updateOne(
		{ "_id": ObjectId(id) },
		{
			$set: { "bookings": data }

		}, function (err, results) {
			res.json({"msg": 'booking updated successfully'})
			callback();
		});
}


module.exports = {
	sendResponse: sendResponse,
	findRestaurants: findRestaurants,
	insertDocument: insertDocument,

	removeRestaurant: removeRestaurant,
	updateRestaurant: updateRestaurant,

	updateReview: updateReview,
	updateBooking: updateBooking
}