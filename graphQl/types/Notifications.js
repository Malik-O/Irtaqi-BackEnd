const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLBoolean,
} = require("graphql");
// User Type
module.exports = new GraphQLObjectType({
	name: "notification",
	fields: () => ({
		id: { type: GraphQLID },
		userID: { type: GraphQLID },
		message: { type: GraphQLString },
		type: { type: GraphQLString },
		seen: { type: GraphQLBoolean },
		icon: { type: GraphQLString },
		createdAt: { type: GraphQLString },
		error: { type: GraphQLString },
	}),
});
