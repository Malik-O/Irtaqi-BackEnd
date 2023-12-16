const {
	organization_owner_Resolver,
	center_admin_Resolver,
	group_admin_Resolver,
} = require("./rolesResolvers");

module.exports = async function (groups, role) {
	switch (role.title) {
		case "organization_owner":
			groups = await organization_owner_Resolver(groups, role);
			break;
		case "center_admin":
			groups = await center_admin_Resolver(groups, role);
			break;
		case "group_admin":
		case "teacher":
			groups = await group_admin_Resolver(groups, role);
			break;
	}
	return groups;
};
