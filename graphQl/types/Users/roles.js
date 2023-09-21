const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLBoolean,
} = require("graphql");
// User Type
module.exports = new GraphQLObjectType({
	name: "Role",
	fields: () => ({
		id: { type: GraphQLID },
		resource_id: { type: GraphQLID },
		resource_type: { type: GraphQLString },
		title: { type: GraphQLString },
		description: { type: GraphQLString },
	}),
});
