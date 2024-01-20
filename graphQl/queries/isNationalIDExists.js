const { GraphQLBoolean, GraphQLString } = require("graphql");
//* types
const User_type = require("../types/Users/User");
//* DB schema
const Users_schema = require("../../models/Users/Users");
// exports
module.exports = {
	type: GraphQLBoolean,
	args: { nationalID: { type: GraphQLString } },
	async resolve(_, { nationalID }) {
		return !!(await Users_schema.exists({ nationalID }));
	},
};
