// create the schema for the database

// imports dependencies
var constants = require('./constants')

// db dependencies
let MongoClient = require('mongodb').MongoClient
let url = constants.DB_URL

let insertDocument = (db, callback) => {
	db.collection('restaurants').insertOne({
		"address": "HSR layout",

		"cuisine": "Italian, North Indian, South Indian",
		"tables": [
			{
				"id": 11,
				"capacity": 4,
				"booked": [
					{
						"bookedOn": new Date(),
						"bookedBy": "Anijit"
					}
				]
			},
			{
				"id": 12,
				"capacity": 3
			}
		],
		"name": "Spicy Kitchen"
	}, (err, result) => {
		console.log("Inserted a document into the restaurants collection.")
		callback()
	})
}
// initialize
// insertDocument()

let callback = () => {
	console.log('everything is fine..')
}

MongoClient.connect(constants.DB_URL, function(err, db) {
  // assert.equal(null, err);
  insertDocument(db, function() {
      db.close();
  });
});