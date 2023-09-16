const {
	GraphQLID,
	GraphQLObjectType,
	GraphQLList,
	GraphQLString,
	GraphQLSchema,
} = require("graphql");
//* types
const User_type = require("./types/Users/User");
//* DB schema
const Users_schema = require("../models/Users/Users");
//* mutations
const // Users
	createUser = require("./mutations/Users/createUser"),
	updateUser = require("./mutations/Users/updateUser"),
	removeUser = require("./mutations/Users/removeUser");
//? Query
const query = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		// get user info
		user: {
			type: User_type,
			args: {
				id: { type: GraphQLID },
			},
			async resolve(_, { id }) {
				// search and return
				return await Users_schema.findById(id);
			},
		},
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
