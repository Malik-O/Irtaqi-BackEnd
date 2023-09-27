//* resolvers
const rolesResolver = require.main.require(
	"./graphQl/types/Users/resolvers/rolesResolver",
);
const { removeRepetitionGroups } = require("./utils");
const roleSwitches = require("./roleSwitches");
//role switches
// main resolver
module.exports = async (_, { user_id }) => {
	const roles = await rolesResolver({ id: user_id });
	let groups = [];
	// loop through all roles and get groups of each one
	for (let role of roles) groups = await roleSwitches(groups, role);
	// remove repetition
	// groups = removeRepetitionGroups(groups)
	return groups;
};
