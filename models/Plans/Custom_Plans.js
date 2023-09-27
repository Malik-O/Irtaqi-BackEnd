const { ObjectId, Schema } = require("mongoose");
const { plansConnection } = require("../../utils/connections");

const Custom_Plans = new Schema(
	{
		plan_id: ObjectId,
		from: String,
		to: String,

		date: Date,
		note: String,
	},
	{ timestamps: true, collection: "Custom_Plans" },
);

module.exports = plansConnection.model("Custom_Plans", Custom_Plans);
