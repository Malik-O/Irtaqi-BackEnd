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
		id_number: { type: GraphQLInt },
		// name
		first_name: { type: GraphQLString },
		parent_name: { type: GraphQLString },
		last_name: { type: GraphQLString },
		// others
		email: { type: GraphQLString },
		gender: { type: GraphQLBoolean },
		phone: { type: GraphQLString },
		birth_day: { type: GraphQLString },
	},
	async resolve(_, args) {
		return await User_Schema.findByIdAndUpdate(args.id, args);
	},
};
