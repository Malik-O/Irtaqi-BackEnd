const Users_Roles_schema = require("../../../../models/Users/Users_Roles");
const Roles_schema = require("../../../../models/Users/Roles");

async function findRole({ role_id, resource_id }) {
	const role = await Roles_schema.findById(role_id);
	role.resource_id = resource_id;
	return { ...role._doc, resource_id };
}
module.exports = async ({ id: user_id }) => {
	const user_roles = await Users_Roles_schema.find({ user_id });
	return await Promise.all(user_roles.map(findRole));
	return out;
};
