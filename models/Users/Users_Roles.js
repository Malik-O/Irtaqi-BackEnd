const { ObjectId, Schema } = require("mongoose");
const { usersConnection } = require("../../utils/connections");

const Users_Roles = new Schema(
	{
		user_id: ObjectId,
		role_id: ObjectId,
		resource_id: ObjectId,
	},
	{ timestamps: true, collection: "Users_Roles" },
);

module.exports = usersConnection.model("Users_Roles", Users_Roles);
