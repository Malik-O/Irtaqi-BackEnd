const {
	GraphQLString,
	GraphQLInt,
	GraphQLID,
	GraphQLList,
	GraphQLBoolean,
} = require("graphql");
const // User
	User_Schema = require("../../../models/Users/Users"),
	User_type = require("../../types/Users/User");
// Function
module.exports = {
	type: User_type,
	args: {
		id: { type: GraphQLID },
		// others
		email: { type: GraphQLString },
		phone: { type: GraphQLString },
		parentPhone: { type: GraphQLString },
	},
	async resolve(_, args) {
		return await User_Schema.findByIdAndUpdate(args.id, args, {
			new: true,
		});
	},
};
