const { GraphQLID } = require("graphql");
//* types
const User_type = require("../types/Users/User");
//* DB schema
const Users_schema = require("../../models/Users/Users");
// exports
module.exports = {
	type: User_type,
	args: {
		id: { type: GraphQLID },
	},
	async resolve(_, { id }) {
		// search and return
		return await Users_schema.findById(id);
	},
};
