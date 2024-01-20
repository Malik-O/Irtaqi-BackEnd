const {
	GraphQLString,
	GraphQLInt,
	GraphQLID,
	GraphQLList,
	GraphQLBoolean,
} = require("graphql");
// const { PubSub } = require("graphql-subscriptions");
const userBaseFields = require("../../types/shared/userBaseFields");
// user
const User_Schema = require("../../../models/Users/Users"),
	User_type = require("../../types/Users/User");
// roles
const Roles_Schema = require("../../../models/Users/Roles");
const Users_Roles_Schema = require("../../../models/Users/Users_Roles");

// const pubsub = new PubSub();

// Function
module.exports = {
	type: User_type,
	args: {
		...userBaseFields,
		role_title: { type: GraphQLString },
		resource_ids: { type: new GraphQLList(GraphQLString) },
	},
	async resolve(_, args) {
		const doseExists = !!(await User_Schema.exists({
			nationalID: args.nationalID,
		}));
		//? pubsub.publish("NEW_USER", { user: { first_name: "666" } });
		// if the national ID is exists then throw an error
		if (doseExists)
			throw new Error(`User ${args.nationalID} already exists`);
		//* add new user
		const newUser = await User_Schema.create(args);
		//* connect role to user
		const role = await Roles_Schema.findOne({ title: args.role_title });
		//* add role to each resource
		console.log("args:", args);
		if (args.resource_ids.length)
			await Promise.all(
				args.resource_ids?.map(
					async (resource_id) =>
						await Users_Roles_Schema.create({
							user_id: newUser.id,
							role_id: role.id,
							resource_id,
						}),
				),
			);
		return newUser;
	},
};
const COLORS = {
	background: "#FFFFFF",
	surface: "#FFFFFF",
	primary: "#6200EE",
	"primary-darken-1": "#3700B3",
	secondary: "#03DAC6",
	"secondary-darken-1": "#018786",
	error: "#B00020",
	error: "#CF6679",
	info: "#2196F3",
	success: "#4CAF50",
	warning: "#FB8C00",
};
