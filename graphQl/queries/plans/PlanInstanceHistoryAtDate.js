const { GraphQLID, GraphQLList, GraphQLString } = require("graphql");
//* types
const Plan_type = require("../../types/Plans/Plan");
const Plan_History_type = require("../../types/Plans/Plan_History");
//* DB schema
const Plan_History_schema = require("../../../models/Plans/Plan_History");
// exports
module.exports = {
	type: new GraphQLList(Plan_History_type),
	args: {
		plan_instance_id: { type: GraphQLID },
		date: { type: GraphQLString },
	},
	async resolve(_, { plan_instance_id }) {
		return await Plan_History_schema.find({ plan_instance_id });
	},
};
