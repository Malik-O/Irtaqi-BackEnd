const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLBoolean,
} = require("graphql");
// User Type
module.exports = {
	id: { type: GraphQLID },
	rabt_for_plan_id: { type: GraphQLID },
	entity_id: { type: GraphQLID },
	entity_type: { type: GraphQLString }, // [student, subgroup]

	title: { type: GraphQLString },
	color: { type: GraphQLString },
	order_reversed: { type: GraphQLBoolean },

	from: { type: GraphQLInt },
	amount: { type: GraphQLInt },
	weeks: { type: GraphQLInt },

	rabt_amount: { type: GraphQLInt },

	working_days: { type: new GraphQLList(GraphQLInt) },
	starting_at: { type: GraphQLString },

	custom: { type: GraphQLBoolean },
	note: { type: GraphQLString },
};
