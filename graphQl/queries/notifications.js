const { GraphQLID, GraphQLList, GraphQLNonNull } = require("graphql");
//* types
const Notifications_type = require("../types/Notifications");
//* DB schema
const Notifications_schema = require("../../models/Notifications/Notifications");
// exports
module.exports = {
	type: new GraphQLList(Notifications_type),
	args: {
		userID: { type: new GraphQLNonNull(GraphQLID) },
	},
	async resolve(_, { userID }) {
		// search and return
		return await Notifications_schema.find({ userID });
	},
};
