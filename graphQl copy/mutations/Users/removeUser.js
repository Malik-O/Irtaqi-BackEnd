const {
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
    GraphQLBoolean,
} = require("graphql");
const // User
    User_Schema = require("../../../models/Users/Users"),
    Group_Schema = require("../../../models/Groups/Groups"),
    Subgroup_Schema = require("../../../models/Groups/Subgroups");
// Function
module.exports = {
    type: GraphQLBoolean,
    args: { id: { type: GraphQLID } },
    async resolve(_, { id }) {
        // delete connection to groups as a teacher
        const asTeacher = await Group_Schema.updateMany(
            { teacher_id: id },
            { teacher_id: null }
        );
        // delete as a student from subgroup
        const asStudent = await Subgroup_Schema.updateMany(
            {},
            { $pull: { student_ids: id } }
        );
        // delete user
        const asUser = await User_Schema.findByIdAndDelete(id);
        // return
        return !!(asTeacher || asStudent || asUser);
    },
};
