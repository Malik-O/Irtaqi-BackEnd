const { GraphQLID, GraphQLList } = require("graphql");
const // Groups
    Group_type = require("../Groups/Group"),
    Groups_schema = require("../../../models/Groups/Groups");
module.exports = (isSelf) => {
    let args = { id: { type: GraphQLID } };
    args = isSelf ? {} : args;
    return {
        type: new GraphQLList(Group_type),
        args,
        async resolve(self, args) {
            let { group_ids } = isSelf ? self : args;
            return await Groups_schema.find({ _id: { $in: group_ids } });
        },
    };
};
