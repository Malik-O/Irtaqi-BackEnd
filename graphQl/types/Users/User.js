const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
} = require("graphql");
const userBaseFields = require("../shared/userBaseFields"),
    getGroupFromStudentId = require("../shared/getGroupFromStudentId"),
    groupsAsAdmin = require("../shared/groupsAsAdmin"),
    groupsAsTeacher = require("../shared/groupsAsTeacher"),
    groupsAsParticipant = require("../shared/groupsAsParticipant"),
    // Groups
    Group_type = require("../Groups/Group"),
    Groups_schema = require("../../../models/Groups/Groups"),
    // Subgroups
    Subgroup_type = require("../Groups/Subgroup"),
    Subgroups_schema = require("../../../models/Groups/Subgroups"),
    // center
    Organizations_schema = require("../../../models/Organizations"),
    Centers_schema = require("../../../models/Centers"),
    //
    Rule_type = require("../Users/Rule"),
    rulesConverter = require("../shared/rulesConverter");
// prepare group as admin query
const groupsAsAdminQuery = groupsAsAdmin(true);
const groupsAsTeacherQuery = groupsAsTeacher(true);
const groupsAsParticipantQuery = groupsAsParticipant(true);
// User Type
const User_type = new GraphQLObjectType({
    name: `User`,
    fields: () => ({
        ...userBaseFields,
        // admin
        groupsAsAdmin: groupsAsAdminQuery,
        // teachers
        groupsAsTeacher: groupsAsTeacherQuery,
        // students or parents
        groupsAsParticipant: groupsAsParticipantQuery,
        //
        subgroups: {
            type: new GraphQLList(Subgroup_type),
            async resolve({ id }) {
                return await Subgroups_schema.find({ student_ids: id });
            },
        },
        // children: {
        //     type: new GraphQLList(User_type),
        //     async resolve({ id, rule_ids }) {
        //         const parentRule = await rulesConverter({ rules: ["parent"] });
        //         if (!rule_ids?.some((r) => r == parentRule[0])) return;
        //         return await Users_schema.find({
        //             parent_id: id,
        //         });
        //     },
        // },
    }),
});
// export
module.exports = User_type;
