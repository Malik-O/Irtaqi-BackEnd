const {
	GraphQLID,
	GraphQLObjectType,
	GraphQLList,
	GraphQLInt,
	GraphQLString,
	GraphQLSchema,
	GraphQLBoolean,
} = require("graphql");
const { PubSub } = require("graphql-subscriptions");
//* types
// ...
const User_type = require("./types/Users/User");
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
//
const NEW_USER = "NEW_USER";
const pubsub = new PubSub();
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
		createUser: {
			type: User_type,
			args: {
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
			},
			async resolve(_, args) {
				pubsub.publish(NEW_USER, {
					newUserSubscription: args,
				});
				return args;
				// return await User_Schema.create(args);
			},
		},
		updateUser,
		removeUser,
	},
});

const subscription = new GraphQLObjectType({
	name: "subscription",
	fields: {
		newUserSubscription: {
			type: User_type,
			subscribe(_, args) {
				return pubsub.asyncIterator(NEW_USER);
			},
		},
	},
});
// exports
module.exports = new GraphQLSchema({ query, mutation, subscription });
