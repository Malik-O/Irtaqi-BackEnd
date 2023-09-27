//* DB schema
const Groups_schema = require("../../../../models/Organizations/Groups");
const {
	groupsFromOrganization,
	addTheRoleAndMarge,
	groupsFromCenter,
} = require("./utils");

async function organization_owner_Resolver(groups, role) {
	let organizationGroups = await groupsFromOrganization(role.resource_id);
	return addTheRoleAndMarge(groups, organizationGroups, role.title);
}
async function center_admin_Resolver(groups, role) {
	const center = { id: role.resource_id };
	let centerGroups = await Promise.all([center].map(groupsFromCenter));
	return addTheRoleAndMarge(groups, centerGroups.flat(), role.title);
}
async function group_admin_Resolver(groups, role) {
	const group = await Groups_schema.findById(role.resource_id);
	return addTheRoleAndMarge(groups, [group], role.title);
}
//* exports module
exports.organization_owner_Resolver = organization_owner_Resolver;
exports.center_admin_Resolver = center_admin_Resolver;
exports.group_admin_Resolver = group_admin_Resolver;
