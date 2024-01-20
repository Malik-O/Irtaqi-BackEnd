const {
	GraphQLString,
	GraphQLInt,
	GraphQLID,
	GraphQLList,
	GraphQLBoolean,
} = require("graphql");
const // User
	User_Schema = require("../../../models/Users/Users"),
	Users_Roles_Schema = require("../../../models/Users/Users_Roles");
// Function
module.exports = {
	type: GraphQLBoolean,
	args: { id: { type: GraphQLID } },
	async resolve(_, { id }) {
		const allUsersRules = await Users_Roles_Schema.find();
		const traceDeleted = await Promise.all(
			allUsersRules.map(async (user_rule) => {
				const exists = await User_Schema.exists(user_rule.user_id);
				return (
					!exists &&
					(await Users_Roles_Schema.deleteMany({
						user_id: user_rule.user_id,
					}))
				);
			}),
		);
		return traceDeleted.every((trace) => trace);
	},
};
