const { ObjectId, Schema } = require("mongoose");
const { plansConnection } = require("../../utils/connections");

const Plan_History = new Schema(
	{
		custom_plan_id: ObjectId,
		student_id: ObjectId,
		updated_by: ObjectId,
		amount_done: Number,
		grade: Number,

		rabt: Boolean,
		note: String,
		// date: Date,
		// rabt_amount_done: Number,
		// rabt_grade: Number,
	},
	{ timestamps: true, collection: "Plan_History" },
);

module.exports = plansConnection.model("Plan_History", Plan_History);
