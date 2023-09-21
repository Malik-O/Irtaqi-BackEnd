const { ObjectId, Schema } = require("mongoose");
const { organizationsConnection } = require("../../utils/connections");

const Centers = new Schema(
	{
		organization_id: ObjectId,
		title: String,
		description: String,
		// working_days: Array, // encode like [sat, sun, mon, tue, wed, thu, fri]
	},
	{ timestamps: true, collection: "Centers" },
);

module.exports = organizationsConnection.model("Centers", Centers);
