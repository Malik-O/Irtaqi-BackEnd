const Users_Roles_schema = require("../../../../models/Users/Users_Roles");
const Roles_schema = require("../../../../models/Users/Roles");

async function findRole({ role_id, resource_id }) {
	const role = await Roles_schema.findById(role_id);
	role.resource_id = resource_id;
	return role;
}
module.exports = async ({ id: user_id }) => {
	const user_roles = await Users_Roles_schema.find({ user_id });
	console.log("user_roles:", user_roles);
	const out = await Promise.all(user_roles.map(findRole));
	console.log("out:", out);
	return out;
};
