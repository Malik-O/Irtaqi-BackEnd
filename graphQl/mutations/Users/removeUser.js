const {
	GraphQLString,
	GraphQLInt,
	GraphQLID,
	GraphQLList,
	GraphQLBoolean,
} = require("graphql");
const // User
	User_Type = require("../../types/Users/User"),
	User_Schema = require("../../../models/Users/Users"),
	Users_Roles_Schema = require("../../../models/Users/Users_Roles"),
	// plan
	Plans_Schema = require("../../../models/Plans/Plans"),
	removePlanMutation = require("../Plans/removePlan");
// Function
module.exports = {
	type: User_Type,
	args: { id: { type: GraphQLID } },
	async resolve(_, { id }) {
		// return
		const userDeleted = await User_Schema.findByIdAndDelete(id);
		const rolesDeleted = await Users_Roles_Schema.deleteMany({
			user_id: id,
		});
		// remove user plans
		const plans = await Plans_Schema.find({ entity_id: id });
		let isAllPlansRemoved = await Promise.all(
			plans.map(async (plan) => {
				const { hasRemoved } = await removePlanMutation.resolve(null, {
					id: plan.id,
					force: true,
				});
				return hasRemoved;
			}),
		);
		console.log({ userDeleted, rolesDeleted, isAllPlansRemoved });
		isAllPlansRemoved = isAllPlansRemoved.every((hasRemoved) => hasRemoved);
		return userDeleted;
	},
};
