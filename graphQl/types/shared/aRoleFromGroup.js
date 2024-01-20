// Schemas
const Users_Schema = require("../../../models/Users/Users");
const Users_Roles_Schema = require("../../../models/Users/Users_Roles");
const Roles_Schema = require("../../../models/Users/Roles");
// map through all the relationships and extract users data
async function mapThroughUsers({ user_id }) {
	return await Users_Schema.findById(user_id);
}

module.exports = async ({ group_id, roleTitle = "student" }) => {
	// get role id
	const studentRole = await Roles_Schema.findOne({
		title: roleTitle,
	});
	// get user relationships with the course
	const userGroupRelation = await Users_Roles_Schema.find({
		resource_id: group_id,
		role_id: studentRole.id,
	});
	// get users from relationship
	return await Promise.all(userGroupRelation.map(mapThroughUsers));
};
