import { MongoClient } from "../lib/mongo.client.js";

import { closeConnection, connectDB, selectDB } from "../utils/db.utils.js";
import { sendResponse } from "../utils/response.utils.js";

const {
  URI_TO_CONNECT_MONGODB,
  DB_NAME,
  COLLECTION_RESTAURANTS,
  SERVER_ERR,
  SUCCESS,
} = process.env;

// fields the client is allowed to filter/search on
const ALLOWED_QUERY_FIELDS = ["cost", "locality", "cuisines", "name", "address"];

// escape regex metacharacters so user input cannot alter regex semantics
const escapeRegex = (value) =>
  String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// this function will connect db and based on API send response
const fetchRestaurants = async (req, res) => {
  let connection;
  let output = { message: "SUCCESS" };

  try {
    const client = MongoClient;
    connection = await connectDB(client, URI_TO_CONNECT_MONGODB);
    // select the db, Collections are selected based on needs
    const db = selectDB(connection, DB_NAME);

    console.log("query parameters", req.params.item);
    const { item } = req.params;
    const { body } = req;
    let query = {};

    if (item) {
      // if searched from the search box
      const safeItem = escapeRegex(item);
      query = {
        $or: [
          { name: { $regex: safeItem, $options: "i" } },
          { locality: { $regex: safeItem, $options: "i" } },
          { address: { $regex: safeItem, $options: "i" } },
          {
            cuisines: {
              $elemMatch: { $regex: safeItem, $options: "i" },
            },
          },
        ],
      };
    } else if (body) {
      // if clicked from the list of restaurants
      const keys = Object.keys(body).filter((key) =>
        ALLOWED_QUERY_FIELDS.includes(key)
      );
      console.log("body of the req is", body, " having keys ", keys);

      keys.forEach((key) => {
        console.log("Key and its value :", key, body[key]);
        query[key] =
          key == "cost"
            ? parseInt(body[key])
            : { $regex: escapeRegex(body[key]), $options: "i" };
      });
    }
    console.log("Query is now\n", JSON.stringify(query, null, "\t"));

    // db call
    const data = await db
      .collection(COLLECTION_RESTAURANTS)
      .find(query)
      .sort({ rating: -1 })
      .toArray();

    output = data.length > 0 ? [...data] : [];
    sendResponse(res, SUCCESS, output);
  } catch (err) {
    console.log("Some Error occurred ...", err);
    output = { msg: "Internal Server Error" };
    sendResponse(res, SERVER_ERR, output);
    // res.status(Number(SERVER_ERR)).json({ msg: "Internal Server Error" });
  } finally {
    closeConnection(connection);
  }
};


// exports
export { fetchRestaurants };
