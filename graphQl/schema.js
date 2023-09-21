const {
	GraphQLID,
	GraphQLObjectType,
	GraphQLList,
	GraphQLString,
	GraphQLSchema,
} = require("graphql");
//* types
// ...
//* DB schema
// ...
//* Queries
const userQuery = require("./queries/user");
const groupsQuery = require("./queries/groups");
//* mutations
const // Users
	createUser = require("./mutations/Users/createUser"),
	updateUser = require("./mutations/Users/updateUser"),
	removeUser = require("./mutations/Users/removeUser");
//? Query
const query = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		user: userQuery,
		groups: groupsQuery,
	},
});
//? Mutations
const mutation = new GraphQLObjectType({
	name: "mutation",
	fields: {
		// users
		createUser,
		updateUser,
		removeUser,
	},
});

// exports
module.exports = new GraphQLSchema({ query, mutation });
