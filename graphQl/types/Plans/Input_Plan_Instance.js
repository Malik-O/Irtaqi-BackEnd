const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLBoolean,
	GraphQLInputObjectType,
} = require("graphql");
// User Type
module.exports = new GraphQLInputObjectType({
	name: "Input_Plan_Instance",
	fields: () => ({
		id: { type: GraphQLID },
		from: { type: GraphQLString },
		to: { type: GraphQLString },

		date: { type: GraphQLString },
		note: { type: GraphQLString },
	}),
});
