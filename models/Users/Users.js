const { ObjectId, Schema } = require("mongoose");
const { usersConnection } = require("../../utils/connections");

const Users = new Schema(
	{
		id_number: Number,
		parent_id: ObjectId,
		// name
		first_name: String,
		parent_name: String,
		last_name: String,

		email: String,
		password: String,
		birth_day: Date,
		gender: Boolean,
		phone: String,
	},
	{ timestamps: true, collection: "Users" },
);

module.exports = usersConnection.model("Users", Users);
