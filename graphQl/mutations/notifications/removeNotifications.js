const { GraphQLID, GraphQLBoolean } = require("graphql");
const Notifications_Schema = require("../../../models/Notifications/Notifications");
// Function
module.exports = {
	type: GraphQLBoolean,
	args: {
		id: { type: GraphQLID },
		userID: { type: GraphQLID },
	},
	async resolve(_, { id, userID }) {
		if (userID) await Notifications_Schema.deleteMany({ userID });
		else await Notifications_Schema.findByIdAndRemove(id);
		return;
	},
};
