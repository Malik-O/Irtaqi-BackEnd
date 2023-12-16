const { GraphQLString, GraphQLID, GraphQLBoolean } = require("graphql");
//
const Attendances_Schema = require("../../../models/Users/Attendances");
const Attendance_Type = require("../../types/Users/Attendance");
// Function
module.exports = {
	type: Attendance_Type,
	args: {
		user_id: { type: GraphQLID },
		updated_by: { type: GraphQLID },
		status: { type: GraphQLString },
		date: { type: GraphQLString },
		note: { type: GraphQLString },
	},
	async resolve(_, args) {
		// exists
		const exists = await Attendances_Schema.findOneAndUpdate(
			{
				user_id: args.user_id,
				date: args.date,
			},
			args,
			{ returnOriginal: false, returnDocument: "after" },
		);
		return exists || (await Attendances_Schema.create(args));
	},
};
