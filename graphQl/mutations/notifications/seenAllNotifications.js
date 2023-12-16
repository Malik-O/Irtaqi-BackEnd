const { GraphQLID, GraphQLBoolean, GraphQLNonNull } = require("graphql");
const Notifications_Schema = require("../../../models/Notifications/Notifications");
// Function
module.exports = {
	type: GraphQLBoolean,
	args: { userID: { type: new GraphQLNonNull(GraphQLID) } },
	async resolve(_, { userID }) {
		return !!(await Notifications_Schema.updateMany(
			{ userID },
			{ seen: true },
		));
	},
};
