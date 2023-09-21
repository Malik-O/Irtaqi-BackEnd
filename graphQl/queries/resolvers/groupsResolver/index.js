//* DB schema
const Groups_schema = require.main.require("./models/Organizations/Groups");
//* resolvers
const rolesResolver = require.main.require(
	"./graphQl/types/Users/resolvers/rolesResolver",
);
const {
	groupsFromOrganization,
	addTheRoleAndMarge,
	groupsFromCenter,
} = require("./utils");

async function organization_owner_Resolver(groups, role) {
	let organizationGroups = await groupsFromOrganization(role.resource_id);
	groups = addTheRoleAndMarge(groups, organizationGroups, role.title);
}
// main resolver
module.exports = async (_, { user_id }) => {
	const roles = await rolesResolver({ id: user_id });
	let groups = [];
	for (let role of roles) {
		// organization_owner
		if (role.title == "organization_owner") {
			let organizationGroups = await groupsFromOrganization(
				role.resource_id,
			);
			groups = addTheRoleAndMarge(groups, organizationGroups, role.title);
		}
		// center_admin
		if (role.title == "center_admin") {
			const center = { id: role.resource_id };
			let centerGroups = await Promise.all(
				[center].map(groupsFromCenter),
			);
			groups = addTheRoleAndMarge(
				groups,
				centerGroups.flat(),
				role.title,
			);
		}
		// group_admin
		if (role.title == "group_admin") {
			const group = await Groups_schema.findById(role.resource_id);
			groups = addTheRoleAndMarge(groups, [group], role.title);
		}
	}
	return groups;
};
