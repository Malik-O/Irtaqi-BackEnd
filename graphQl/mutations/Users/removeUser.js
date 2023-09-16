const {
	GraphQLString,
	GraphQLInt,
	GraphQLID,
	GraphQLList,
	GraphQLBoolean,
} = require("graphql");
const // User
	User_Schema = require("../../../models/Users/Users");
// Function
module.exports = {
	type: GraphQLBoolean,
	args: { id: { type: GraphQLID } },
	async resolve(_, { id }) {
		// return
		return await User_Schema.findByIdAndDelete(id);
	},
};
