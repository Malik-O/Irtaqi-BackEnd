const {
	GraphQLString,
	GraphQLInt,
	GraphQLID,
	GraphQLList,
	GraphQLBoolean,
} = require("graphql");
const // User
	User_Schema = require("../../../models/Users/Users"),
	Users_Roles_Schema = require("../../../models/Users/Users_Roles"),
	Roles_Schema = require("../../../models/Users/Roles");
// Function
//? this applies to teacher and students only
module.exports = {
	type: GraphQLBoolean,
	args: {
		user_id: { type: GraphQLID },
		group_id: { type: GraphQLID },
		role_title: { type: GraphQLString },
		move: { type: GraphQLBoolean },
		update: { type: GraphQLBoolean },
		remove: { type: GraphQLBoolean },
	},
	async resolve(
		_,
		{
			user_id,
			group_id,
			role_title = "student",
			move = true,
			update,
			remove,
		},
	) {
		const selectedRole = await Roles_Schema.findOne({ title: role_title });
		if (!selectedRole)
			throw new Error(`there is no role called ${role_title}`);
		// remove from groups as student
		if (move) {
			const removedRole = await Users_Roles_Schema.deleteMany({
				user_id,
				role_id: selectedRole.id,
			});
			if (!removedRole?.deletedCount)
				throw new Error(`the user is not ${role_title} in any group`);
		} else if (remove) {
			const removedRole = await Users_Roles_Schema.deleteMany({
				user_id,
				resource_id: group_id,
			});
			if (!removedRole?.deletedCount)
				throw new Error(
					`the user ${user_id} is not assigned to ${group_id}`,
				);
		}
		// update existing role
		if (update) {
			var newUserRole = await Users_Roles_Schema.findOneAndUpdate(
				{
					user_id,
					resource_id: group_id,
				},
				{ user_id, role_id: selectedRole.id, resource_id: group_id },
			);
		} else {
			// add new role (if move && !update)
			var newUserRole = await Users_Roles_Schema.create({
				user_id,
				role_id: selectedRole.id,
				resource_id: group_id,
			});
		}
		return !!newUserRole;
	},
};
