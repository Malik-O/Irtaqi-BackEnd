const { ObjectId, Schema } = require("mongoose");
const { usersConnection } = require("../../utils/connections");

const Users = new Schema(
	{
		id_number: Number,
		parent_id: ObjectId,
		// name
		first_name: String,
		parent_name: String,
		rest_of_name: String,
		gender: Boolean,

		dateOfBirth: Date,
		nationalID: String,

		email: String,
		password: String,
		phone: String,
		parentPhone: String,
	},
	{ timestamps: true, collection: "Users" },
);

module.exports = usersConnection.model("Users", Users);
