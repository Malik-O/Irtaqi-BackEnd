//* resolvers
const rolesResolver = require("../../../types/Users/resolvers/rolesResolver");
const { removeRepetitionGroups } = require("./utils");
const roleSwitches = require("./roleSwitches");
//* Schema
const Groups_schema = require("../../../../models/Organizations/Groups");
//
const removeGroup = require("../../../mutations/organization/removeGroup");

// main resolver
module.exports = async (_, { user_id }) => {
	const roles = await rolesResolver({ id: user_id });
	let groups = [];
	// loop through all roles and get groups of each one
	for (let role of roles) {
		// check if group exists then remove it's trace if it does
		// const exists = await Groups_schema.exists({ _id: role.resource_id });
		// if (!exists) continue;
		// get group
		groups = await roleSwitches(groups, role);
	}
	// remove repetition
	// groups = removeRepetitionGroups(groups)
	return groups;
};
