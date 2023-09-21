//* DB schema
const Centers_schema = require.main.require("./models/Organizations/Centers");
const Groups_schema = require.main.require("./models/Organizations/Groups");
// add the role title to a list of groups
function addTheRoleAndMarge(allGroups, newGroups, roleTitle) {
	newGroups = newGroups.map((group) => {
		group.as = roleTitle;
		return group;
	});
	return [...allGroups, ...newGroups];
}
// extract groups from a center
async function groupsFromCenter(center) {
	return await Groups_schema.find({
		center_id: center.id,
	});
}
// extract groups from an organization
async function groupsFromOrganization(organization_id) {
	const centers = await Centers_schema.find({ organization_id });
	const groups = await Promise.all(centers.map(groupsFromCenter));
	return groups.flat();
}
//* exports module
exports.addTheRoleAndMarge = addTheRoleAndMarge;
exports.groupsFromCenter = groupsFromCenter;
exports.groupsFromOrganization = groupsFromOrganization;
