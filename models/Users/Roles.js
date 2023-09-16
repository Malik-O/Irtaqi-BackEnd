const { Schema } = require("mongoose");
const { usersConnection } = require("../../utils/connections");

const Roles = new Schema(
	{
		title: String,
		description: Array,
	},
	{ timestamps: true, collection: "Roles" },
);

module.exports = usersConnection.model("Roles", Roles);
