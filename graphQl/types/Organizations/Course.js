const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLBoolean,
} = require("graphql");
//
const User_type = require("../Users/User");
//
const studentsFromGroup = require("../shared/studentsFromGroup");
// const // User
//     Users_schema = require("../../../models/Users/Users"),
// Subgroups
const subgroup_type = require("./Subgroup");
const subgroups_schema = require("../../../models/Organizations/Subgroups");
// User Type
module.exports = new GraphQLObjectType({
	name: "Course",
	fields: () => ({
		id: { type: GraphQLID },
		group_id: { type: GraphQLID },
		title: { type: GraphQLString },
		description: { type: GraphQLString },
		floatingStudents: {
			type: new GraphQLList(User_type),
			resolve: studentsFromGroup,
		},
		subgroups: {
			type: new GraphQLList(subgroup_type),
			async resolve({ id: course_id }) {
				return await subgroups_schema.find({
					course_id,
				});
			},
		},
	}),
});
