const { GraphQLString, GraphQLID } = require("graphql");
const Group_Schema = require("../../../models/Organizations/Groups"),
	Group_type = require("../../types/Organizations/Group");
const Courses_Schema = require("../../../models/Organizations/Courses");
// Function
module.exports = {
	type: Group_type,
	args: {
		center_id: { type: GraphQLID },
		title: { type: GraphQLString },
		description: { type: GraphQLString },
	},
	async resolve(_, args) {
		const group = await Group_Schema.create(args);
		// add default course (quran)
		await Courses_Schema.create({ group_id: group.id, title: "quran" });
		return group;
	},
};
