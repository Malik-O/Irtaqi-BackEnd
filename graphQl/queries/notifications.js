const {
	GraphQLID,
	GraphQLList,
	GraphQLNonNull,
	GraphQLString,
} = require("graphql");
//* types
const Notifications_type = require("../types/Notifications");
//* DB schema
const Notifications_schema = require("../../models/Notifications/Notifications");
// exports
module.exports = {
	type: new GraphQLList(Notifications_type),
	args: {
		userID: { type: new GraphQLNonNull(GraphQLID) },
		seenIds: { type: new GraphQLList(GraphQLString) },
	},
	async resolve(_, { userID, seenIds }) {
		// search and return
		return await Notifications_schema.find({
			userID,
			_id: { $nin: seenIds },
		})
			.sort("createdAt")
			.limit(4);
	},
};
