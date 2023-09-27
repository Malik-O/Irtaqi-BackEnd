const { ObjectId, Schema } = require("mongoose");
const { organizationsConnection } = require("../../utils/connections");

const Subgroups = new Schema(
	{
		title: String,
		course_id: ObjectId,
		student_ids: Array,
	},
	{ timestamps: true, collection: "Subgroups" },
);

module.exports = organizationsConnection.model("Subgroups", Subgroups);
