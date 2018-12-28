// dependencies
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectID

const URI_TO_CONNECT_MONGODB = "mongodb+srv://root:root123@anijitsmongo-mwm6l.mongodb.net/allapps";
const DB_NAME = "allapps"
const COLLECTION_RESTAURANTS = "restaurants"

// this function will connect db and based on API send response
let connectDbAndRunQueries = async (apiName, req, res) => {
	try {
		let client = await MongoClient.connect(URI_TO_CONNECT_MONGODB)
		// select the db, Collections are selected based on needs
		const db = client.db(DB_NAME)

		// default output
		const output = { "message": "SUCCESS" }

		// perform several db actions based on API names
		chooseApiAndSendResponse(apiName, db, req, res, client, output)
	} catch (err) {
		console.log('Some Error occurred ...', err)
	}
}


// choose the particular function for an API and process it
let chooseApiAndSendResponse = (apiName, db, req, res, client, output) => {

	// perform db specific ops based on API names
	switch (apiName) {

		case 'getRestaurants':
			makeGetRestaurants(db, req, res, client, output)
			break;

	}
}


let makeGetRestaurants = async (db, req, res, client, output) => {
	console.log('query parameters', req.params.item)
	let { item } = req.params
	let { body } = req
	let query = {}

	if (item) {
		// if searched from the search box
		query = {
			$or: [
				{ "name": { $regex: `${item}`, $options: 'i' } },
				{ "locality": { $regex: `${item}`, $options: 'i' } },
				{ "address": { $regex: `${item}`, $options: 'i' } },
				{ "cuisines": { $elemMatch: { $regex: `${item}`, $options: 'i' } } }
			]
		}
	} else if (body) {
		// if clicked from the list of restaurants

		let keys = Object.keys(body)
		console.log('body of the req is', body, ' having keys ', keys)
		keys.forEach((key) => {
			console.log('Key and its value :', key, body[key])
			query[key] = (key == 'cost') ? parseInt(body[key]) : { $regex: `${body[key]}`, $options: 'i' }
		})
	}
	console.log('Query is now\n', JSON.stringify(query, null, '\t'))
	try {

		// db call 
		let data = await db
			.collection(COLLECTION_RESTAURANTS)
			.find(query)
			.sort({ rating: -1 })
			.toArray()

		output = (data.length > 0) ? [...data] : []
		sendOutputAndCloseConnection(client, output, res)

	} catch (error) {
		console.log('unable to get all the users', error)
		sendOutputAndCloseConnection(client, output, res)
	}
}


// send the response and close the db connection
function sendOutputAndCloseConnection(client, output, res) {
	if (output && res) {
		console.log(`========================\nOUTPUT AS RECEIVED AND BEFORE SENDING\n==================\n`, output)
		res.json(output)
	}

	// close the database connection after sending the response
	client.close()
}

// exports
module.exports = {
	connectDbAndRunQueries
}