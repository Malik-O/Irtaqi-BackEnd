const { ObjectId, Schema } = require("mongoose");
const { usersConnection } = require("../../utils/connections");

const Attendances = new Schema(
	{
		user_id: ObjectId,
		updated_by: ObjectId,
		status: String,
		date: Date,
		note: String,
	},
	{ timestamps: true, collection: "Attendances" },
);

module.exports = usersConnection.model("Attendances", Attendances);
