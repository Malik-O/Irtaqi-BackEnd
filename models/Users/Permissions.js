const { ObjectId, Schema } = require("mongoose");
const { usersConnection } = require("../../utils/connections");

const Permissions = new Schema(
	{
		title: String,
		resource_type: String,
		role_id: ObjectId,
		actions: Array,
	},
	{ timestamps: true, collection: "Permissions" },
);

module.exports = usersConnection.model("Permissions", Permissions);
