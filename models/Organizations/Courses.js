const { ObjectId, Schema } = require("mongoose");
const { organizationsConnection } = require("../../utils/connections");

const Courses = new Schema(
	{
		group_id: ObjectId,
		title: String,
		description: String,
	},
	{ timestamps: true, collection: "Courses" },
);

module.exports = organizationsConnection.model("Courses", Courses);
