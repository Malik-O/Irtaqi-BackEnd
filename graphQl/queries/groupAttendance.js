const { GraphQLID, GraphQLList, GraphQLString } = require("graphql");
//* types
const Attendance_type = require("../types/Users/Attendance");
//* DB schema
const Attendances_schema = require("../../models/Users/Attendances");
//* Resolvers
const aRoleFromGroup = require("../types/shared/aRoleFromGroup");
// exports
module.exports = {
	type: new GraphQLList(Attendance_type),
	args: {
		group_id: { type: GraphQLID },
		date: { type: GraphQLString },
	},
	async resolve(_, { group_id, date }) {
		const students = await aRoleFromGroup({ group_id });
		// extract students attendance at date
		const attendanceExtractor = async (student) =>
			await Attendances_schema.findOne({ user_id: student.id, date });
		const studentsAttendances = await Promise.all(
			students.map(attendanceExtractor),
		);
		return studentsAttendances.filter((att) => att);
	},
};
