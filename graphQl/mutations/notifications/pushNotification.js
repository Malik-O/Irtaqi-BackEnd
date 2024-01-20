const {
	GraphQLString,
	GraphQLID,
	GraphQLBoolean,
	GraphQLList,
} = require("graphql");
const Notifications_Schema = require("../../../models/Notifications/Notifications"),
	Notifications_Type = require("../../types/Notifications");
// subscription
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();
// Function
module.exports = {
	type: Notifications_Type,
	args: {
		userID: { type: GraphQLID },
		message: { type: GraphQLString },
		type: { type: GraphQLString },
		seen: { type: GraphQLBoolean },
		icon: { type: GraphQLString },
		error: { type: GraphQLString },
		data: { type: new GraphQLList(GraphQLString) },
	},
	async resolve(_, args) {
		const newNotification = await new Notifications_Schema(args).save();
		pubsub.publish("NewNotification", newNotification);
		return newNotification;
	},
};
