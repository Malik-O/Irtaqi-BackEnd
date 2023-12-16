const { ObjectId, Schema } = require("mongoose");
const { usersConnection } = require("../../utils/connections");

const Notifications = new Schema(
	{
		userID: ObjectId,
		message: String,
		type: String,
		icon: String,
		error: String,
		seen: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true, collection: "Notifications" },
);

module.exports = usersConnection.model("Notifications", Notifications);
