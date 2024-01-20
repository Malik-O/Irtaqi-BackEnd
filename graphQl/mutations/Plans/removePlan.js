const {
	GraphQLString,
	GraphQLInt,
	GraphQLID,
	GraphQLBoolean,
	GraphQLList,
	GraphQLObjectType,
} = require("graphql");
// schemas
const Custom_Plans_Schema = require("../../../models/Plans/Plans_Instances"),
	Plan_History_Schema = require("../../../models/Plans/Plan_History"),
	Plans_Schema = require("../../../models/Plans/Plans");
// types
const Custom_Plans_Type = require("../../types/Plans/Output_Plan_Instance"),
	removeOutType = new GraphQLObjectType({
		name: "removePlanOut",
		fields: () => ({
			hasRemoved: { type: GraphQLBoolean },
			instancesRemainingId: { type: new GraphQLList(GraphQLID) },
		}),
	});
// delete plan
async function deletePlan(plan_id, force) {
	const customs = await Custom_Plans_Schema.find({ plan_id });
	// delete every instance that has no history
	let out = { hasRemoved: false, instancesRemainingId: [] };
	const [anyHistoryExists] = await Promise.all([
		await customs.reduce(async (acc, custom) => {
			acc = await acc;
			const custom_plan_id = custom.id;
			const historyExists = await Plan_History_Schema[
				force ? "deleteMany" : "exists"
			]({
				custom_plan_id,
			});
			if (force || !historyExists)
				await Custom_Plans_Schema.findByIdAndDelete(custom_plan_id);
			if (historyExists) out.instancesRemainingId.push(custom_plan_id);
			return acc || !!historyExists;
		}, false),
	]);
	// if all instances are deleted delete the plan
	if (force || !anyHistoryExists)
		out.hasRemoved = !!(await Plans_Schema.findByIdAndDelete(plan_id));
	return out;
}
// Function
module.exports = {
	type: new GraphQLList(removeOutType),
	args: {
		id: { type: GraphQLID },
		force: { type: GraphQLBoolean },
	},
	async resolve(_, { id: plan_id, force }) {
		let deleted = [];
		// delete rabt plan
		const rabtPlan = await Plans_Schema.findOne({
			rabt_for_plan_id: plan_id,
		});
		if (rabtPlan) deleted[1] = await deletePlan(rabtPlan.id, force);
		// delete main plan
		deleted[0] = await deletePlan(plan_id, force);
		return deleted;
	},
};
