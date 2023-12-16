const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLBoolean,
} = require("graphql");
const userBaseFields = require("../shared/userBaseFields");
//
const Role_type = require("./roles");
const rolesResolver = require("./resolvers/rolesResolver");
// User Type
module.exports = new GraphQLObjectType({
	name: `User`,
	fields: () => ({
		...userBaseFields,
		// role
		roles: {
			type: new GraphQLList(Role_type),
			resolve: rolesResolver,
		},
	}),
});
