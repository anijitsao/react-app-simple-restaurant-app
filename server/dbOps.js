// dependencies
import mongodb from "mongodb"
const { MongoClient, ObjectID } = mongodb

const {
	URI_TO_CONNECT_MONGODB,
	DB_NAME,
	COLLECTION_RESTAURANTS,
	SERVER_ERR,
	SUCCESS,
} = process.env

// this function will connect db and based on API send response
const connectDbAndRunQueries = async (apiName, req, res) => {
	try {
		const client = await new MongoClient(URI_TO_CONNECT_MONGODB, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}).connect()
		// select the db, Collections are selected based on needs
		const db = client.db(DB_NAME)

		// default output
		const output = { message: "SUCCESS" }

		// perform several db actions based on API names
		chooseApiAndSendResponse(apiName, db, req, res, client, output)
	} catch (err) {
		console.log("Some Error occurred ...", err)
		res.status(SERVER_ERR).json({ msg: "Internal Server Error" })
	}
}

// choose the particular function for an API and process it
const chooseApiAndSendResponse = (apiName, db, req, res, client, output) => {
	// perform db specific ops based on API names
	switch (apiName) {
		case "getRestaurants":
			makeGetRestaurants(db, req, res, client, output)
			break
	}
}

const makeGetRestaurants = async (db, req, res, client, output) => {
	console.log("query parameters", req.params.item)
	const { item } = req.params
	const { body } = req
	let query = {}

	if (item) {
		// if searched from the search box
		query = {
			$or: [
				{ name: { $regex: `${item}`, $options: "i" } },
				{ locality: { $regex: `${item}`, $options: "i" } },
				{ address: { $regex: `${item}`, $options: "i" } },
				{
					cuisines: {
						$elemMatch: { $regex: `${item}`, $options: "i" },
					},
				},
			],
		}
	} else if (body) {
		// if clicked from the list of restaurants
		const keys = Object.keys(body)
		console.log("body of the req is", body, " having keys ", keys)

		keys.forEach((key) => {
			console.log("Key and its value :", key, body[key])
			query[key] =
				key == "cost"
					? parseInt(body[key])
					: { $regex: `${body[key]}`, $options: "i" }
		})
	}
	console.log("Query is now\n", JSON.stringify(query, null, "\t"))

	// db call
	try {
		const data = await db
			.collection(COLLECTION_RESTAURANTS)
			.find(query)
			.sort({ rating: -1 })
			.toArray()

		output = data.length > 0 ? [...data] : []
	} catch (error) {
		console.log("unable to get all the users", error)
	} finally {
		sendResponseAndCloseConnection(client, output, res)
	}
}

// send the response and close the db connection
function sendResponseAndCloseConnection(client, output, res) {
	if (output && res) {
		console.log(
			`========================\nOUTPUT AS RECEIVED AND BEFORE SENDING\n==================\n`,
			output
		)
		res.status(SUCCESS).json(output)
	} else {
		res.status(SERVER_ERR).json({ msg: "Internal Server Error" })
	}

	// close the database connection after sending the response
	client.close()
}

// exports
export { connectDbAndRunQueries }
