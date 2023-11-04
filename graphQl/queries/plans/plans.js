const { GraphQLID, GraphQLList } = require("graphql");
//* types
const Plan_type = require("../../types/Plans/Plan");
//* DB schema
const Plans_schema = require("../../../models/Plans/Plans");
// exports
module.exports = {
	type: new GraphQLList(Plan_type),
	args: {
		entity_id: { type: GraphQLID },
	},
	async resolve(_, { entity_id }) {
		return await Plans_schema.find({ entity_id });
	},
};
