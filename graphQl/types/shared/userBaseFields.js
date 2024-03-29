const {
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLBoolean,
} = require("graphql");
// User Type
module.exports = {
	id: { type: GraphQLID },
	as: { type: GraphQLString },
	// personal info
	first_name: { type: GraphQLString },
	parent_name: { type: GraphQLString },
	rest_of_name: { type: GraphQLString },
	gender: { type: GraphQLBoolean, default: true },
	//
	dateOfBirth: { type: GraphQLString },
	nationalID: { type: GraphQLString },
	// others
	email: { type: GraphQLString },
	phone: { type: GraphQLString },
	parentPhone: { type: GraphQLString },
};
