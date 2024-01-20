const { ObjectId, Schema } = require("mongoose");
const { usersConnection } = require("../../utils/connections");

const Roles = new Schema(
	{
		title: String,
		description: Array,
		resource_type: String,
	},
	{ timestamps: true, collection: "Roles" },
);

module.exports = usersConnection.model("Roles", Roles);
