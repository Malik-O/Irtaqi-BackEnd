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
	name: "Group",
	fields: () => ({
		id: { type: GraphQLID },
		title: { type: GraphQLString },
		as: { type: GraphQLString },
		description: { type: GraphQLString },
	}),
});
