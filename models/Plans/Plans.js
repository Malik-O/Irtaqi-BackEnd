const { ObjectId, Schema } = require("mongoose");
const { plansConnection } = require("../../utils/connections");

const Plans = new Schema(
	{
		rabt_for_plan_id: ObjectId,
		subgroup_id: ObjectId,
		title: String,
		color: String,
		order_reversed: Boolean,

		from: Number,
		amount: Number,
		weeks: Number,

		rabt_amount: Number,

		working_days: Array,
		starting_at: Date,

		custom: Boolean,
		note: String,
	},
	{ timestamps: true, collection: "Plans" },
);

module.exports = plansConnection.model("Plans", Plans);
