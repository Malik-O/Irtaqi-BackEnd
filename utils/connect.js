// Mongoose Setup
const mongoose = require("mongoose");
// get the secret url from environment variables
require("dotenv").config();
const MONGO_URL = process.env.MONGO_URL;
// export the function
module.exports = () => {
	mongoose.set("strictQuery", true);
	return mongoose.connect(MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
};
