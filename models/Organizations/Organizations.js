const { ObjectId, Schema } = require("mongoose");
const { organizationsConnection } = require("../../utils/connections");

const Organizations = new Schema(
	{
		title: String,
		description: String,
	},
	{ timestamps: true, collection: "Organizations" },
);

module.exports = organizationsConnection.model("Organizations", Organizations);
