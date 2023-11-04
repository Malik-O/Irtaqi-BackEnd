const {
	GraphQLString,
	GraphQLInt,
	GraphQLID,
	GraphQLBoolean,
} = require("graphql");
const History_Schema = require("../../../models/Plans/Plan_History");
// Function
module.exports = {
	type: GraphQLBoolean,
	args: {
		// student_id: { type: GraphQLID },
		plan_instance_id: { type: GraphQLID },
		updated_by: { type: GraphQLID },
		amount_done: { type: GraphQLInt },
		date: { type: GraphQLString },
		grade: { type: GraphQLInt },
		// rabt: { type: GraphQLBoolean },
		note: { type: GraphQLString },
	},
	async resolve(_, args) {
		// Update User record
		const exists = await History_Schema.findOneAndUpdate(
			{ plan_instance_id: args.plan_instance_id, date: args.date },
			args,
		);
		return !(!exists && !(await History_Schema.create(args)));
	},
};
