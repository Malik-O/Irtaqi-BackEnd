const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLBoolean,
} = require("graphql");
// User Type
const ShortUser_type = new GraphQLObjectType({
	name: `shortUser`,
	fields: () => ({
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
	}),
});
// export
module.exports = ShortUser_type;
