const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLBoolean,
} = require("graphql");
// courses
const Courses_schema = require("../../../models/Organizations/Courses");
const Course_type = require("./Course");
// User Type
module.exports = new GraphQLObjectType({
	name: "Group",
	fields: () => ({
		id: { type: GraphQLID },
		center_id: { type: GraphQLID },
		title: { type: GraphQLString },
		as: { type: GraphQLString },
		description: { type: GraphQLString },
		courses: {
			type: new GraphQLList(Course_type),
			async resolve({ id: group_id }) {
				return await Courses_schema.find({ group_id });
			},
		},
	}),
});
