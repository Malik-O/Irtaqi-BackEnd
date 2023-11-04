const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLBoolean,
} = require("graphql");
//
const Plan_Fields = require("../shared/Plan_Fields");
const history_type = require("./Plan_History"),
	history_schema = require("../../../models/Plans/Plan_History"),
	Output_Plan_Instance = require("./Output_Plan_Instance"),
	Plans_Instances_schema = require("../../../models/Plans/Plans_Instances");
// User Type
module.exports = new GraphQLObjectType({
	name: "Plans",
	fields: () => ({
		...Plan_Fields,
		Plans_instances: {
			type: new GraphQLList(Output_Plan_Instance),
			// type: GraphQLBoolean,
			async resolve({ id, custom }) {
				// if (!custom) return [];
				return await Plans_Instances_schema.find({ plan_id: id });
			},
		},
		// history: {
		//     type: new GraphQLList(history_type),
		//     // async resolve({ id: plan_id }) {
		//     //     return await Plan_History.find({ plan_id });
		//     // },
		// },
	}),
});
