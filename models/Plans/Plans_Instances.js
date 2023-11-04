const { ObjectId, Schema } = require("mongoose");
const { plansConnection } = require("../../utils/connections");

const Plans_Instances = new Schema(
	{
		plan_id: ObjectId,
		from: String,
		to: String,

		date: Date,
		note: String,
	},
	{ timestamps: true, collection: "Plans_Instances" },
);

module.exports = plansConnection.model("Plans_Instances", Plans_Instances);
