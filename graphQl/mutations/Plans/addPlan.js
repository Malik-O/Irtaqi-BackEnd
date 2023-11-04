const {
	GraphQLString,
	GraphQLInt,
	GraphQLID,
	GraphQLList,
	GraphQLBoolean,
} = require("graphql");
const Plan_Fields = require("../../types/shared/Plan_Fields");
const Plan_type = require("../../types/Plans/Plan"),
	Plans_Schema = require("../../../models/Plans/Plans");
const versesPerPage = require("./utils/versesPerPage");
const { generatePlanDays } = require("./utils/generatePlanDays");
//
const Plans_Instances_Schema = require("../../../models/Plans/Plans_Instances"),
	Input_Plan_Instance = require("../../types/Plans/Input_Plan_Instance"),
	Output_Plan_Instance = require("../../types/Plans/Output_Plan_Instance");
// Function
module.exports = {
	type: Plan_type,
	args: { ...Plan_Fields },
	async resolve(_, args) {
		// args = {
		// 	from: 1,
		// 	amount: 1,
		// 	weeks: 1,
		// 	entity_id: "6514396c1ffb2f1f855acff8",
		// 	order_reversed: false,
		// 	title: "new",
		// 	working_days: [3, 4, 5],
		// 	entity_type: "student",
		// 	starting_at: 1696762871948,
		// };
		const plan = await Plans_Schema.create(args);
		let { days: instances } = generatePlanDays({
			...args,
			id: plan.id,
		})[0];
		// delete the old days
		await Plans_Instances_Schema.deleteMany({ plan_id: plan.id });
		// create all days
		instances = instances.map((instance) => {
			instance.plan_id = plan.id;
			return instance;
		});
		// add them to DB
		await Plans_Instances_Schema.create(instances);
		return plan;
	},
};
