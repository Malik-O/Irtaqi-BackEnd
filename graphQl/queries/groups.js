const { GraphQLID, GraphQLList } = require("graphql");
//* types
const Groups_type = require("../types/Organizations/Group");
//* resolvers
const groupsResolver = require("./resolvers/groupsResolver");
// exports
module.exports = {
	type: new GraphQLList(Groups_type),
	args: {
		user_id: { type: GraphQLID },
	},
	resolve: groupsResolver,
};
