const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLBoolean,
} = require("graphql");
//
const Role_type = require("./roles");
const rolesResolver = require("./resolvers/rolesResolver");
// User Type
module.exports = new GraphQLObjectType({
	name: `User`,
	fields: () => ({
		id: { type: GraphQLID },
		id_number: { type: GraphQLInt },
		// name
		first_name: { type: GraphQLString },
		parent_name: { type: GraphQLString },
		last_name: { type: GraphQLString },
		// others
		email: { type: GraphQLString },
		gender: { type: GraphQLBoolean },
		phone: { type: GraphQLString },
		birth_day: { type: GraphQLString },
		// role
		roles: {
			type: new GraphQLList(Role_type),
			resolve: rolesResolver,
		},
	}),
});
