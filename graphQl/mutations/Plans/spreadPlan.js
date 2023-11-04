const {
	GraphQLString,
	GraphQLInt,
	GraphQLID,
	GraphQLBoolean,
	GraphQLList,
	GraphQLInputObjectType,
} = require("graphql");
const Plans_Instances_Schema = require("../../../models/Plans/Plans_Instances"),
	Input_Plan_Instance = require("../../types/Plans/Input_Plan_Instance"),
	Output_Plan_Instance = require("../../types/Plans/Output_Plan_Instance");
// Function
module.exports = {
	type: new GraphQLList(Output_Plan_Instance),
	args: {
		plan_id: { type: GraphQLID },
		instances: { type: new GraphQLList(Input_Plan_Instance) },
	},
	async resolve(_, { plan_id, instances }) {
		// delete the old days
		await Plans_Instances_Schema.deleteMany({ plan_id });
		// create all days
		instances = instances.map((instance) => {
			instance.plan_id = plan_id;
			return instance;
		});
		return await Plans_Instances_Schema.create(instances);
	},
};
