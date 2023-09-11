const {
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLBoolean,
    GraphQLList,
} = require("graphql");
const Groups_Schema = require("../../../models/Groups/Groups"),
    Group_type = require("../../types/Groups/Group");
// Function
module.exports = {
    type: Group_type,
    args: {
        teacher_id: { type: GraphQLID },
        center_id: { type: GraphQLID },
        title: { type: GraphQLString },
        working_days: { type: new GraphQLList(GraphQLInt) },
        description: { type: GraphQLString },
    },
    async resolve(_, args) {
        return await Groups_Schema.create(args);
    },
};
