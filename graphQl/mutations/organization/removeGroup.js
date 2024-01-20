const { GraphQLBoolean, GraphQLID } = require("graphql");
const Group_Schema = require("../../../models/Organizations/Groups"),
	Group_type = require("../../types/Organizations/Group");
const Users_Roles_schema = require("../../../models/Users/Users_Roles");
// Function
module.exports = {
	type: Group_type,
	args: { id: { type: GraphQLID } },
	async resolve(_, { id }) {
		await Users_Roles_schema.deleteMany({ resource_id: id });
		return await Group_Schema.findByIdAndDelete(id);
	},
};
