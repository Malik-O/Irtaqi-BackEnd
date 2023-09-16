// Mongoose Setup
const mongoose = require("mongoose");
// get the secret url from environment variables
require("dotenv").config();
const MONGO_URL = process.env.MONGO_URL;
// export the function
module.exports = (db) => {
	mongoose.set("strictQuery", true);
	return mongoose.createConnection(MONGO_URL.concat(db), {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
};
