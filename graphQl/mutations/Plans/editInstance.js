const {
	GraphQLString,
	GraphQLInt,
	GraphQLID,
	GraphQLBoolean,
	GraphQLList,
	GraphQLInputObjectType,
	GraphQLObjectType,
} = require("graphql");
const Plans_Instances_Schema = require("../../../models/Plans/Plans_Instances"),
	Input_Plan_Instance = require("../../types/Plans/Input_Plan_Instance");
// Function
module.exports = {
	type: GraphQLBoolean,
	args: {
		instance_id: { type: GraphQLID },
		newData: { type: Input_Plan_Instance },
	},
	async resolve(_, { instance_id, newData }) {
		if (!newData)
			return !!(await Plans_Instances_Schema.findByIdAndDelete(
				instance_id,
			));
		return !!(await Plans_Instances_Schema.findByIdAndUpdate(
			instance_id,
			newData,
		));
	},
};
