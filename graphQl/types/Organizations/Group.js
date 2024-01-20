const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLBoolean,
} = require("graphql");
// schema
const Courses_schema = require("../../../models/Organizations/Courses");
const Roles_Schema = require("../../../models/Users/Roles");
const aRoleFromGroup = require("../shared/aRoleFromGroup");
// types
const Course_type = require("./Course");
const User_type = require("../Users/User");
// User Type
module.exports = new GraphQLObjectType({
	name: "Group",
	fields: () => ({
		id: { type: GraphQLID },
		center_id: { type: GraphQLID },
		title: { type: GraphQLString },
		as: { type: GraphQLString },
		description: { type: GraphQLString },
		staff: {
			type: new GraphQLList(User_type),
			async resolve({ id: group_id }) {
				const staffRoles = ["teacher", "group_admin"];
				let staffUsers = [];
				for (let roleTitle of staffRoles) {
					let users = await aRoleFromGroup({ group_id, roleTitle });
					if (!users?.length) continue;
					users = users.map((user) => ({
						id: user.id,
						as: roleTitle,
						...user._doc,
					}));
					staffUsers = [...staffUsers, ...users];
				}
				return staffUsers;
			},
		},
		courses: {
			type: new GraphQLList(Course_type),
			async resolve({ id: group_id }) {
				return await Courses_schema.find({ group_id });
			},
		},
	}),
});
