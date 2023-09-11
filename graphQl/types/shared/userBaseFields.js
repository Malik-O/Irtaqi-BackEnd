const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
} = require("graphql");
const // shared function
    //Attendance
    Attendance_type = require("../Users/Attendance"),
    Attendances_schema = require("../../../models/Users/Attendances"),
    // rules
    Rule_type = require("../Users/Rule"),
    // Plans
    Plan_type = require("../Plans/Plan"),
    Plans_schema = require("../../../models/Plans/Plans"),
    // Advancements
    Plan_History_type = require("../Plans/Plan_History"),
    Plans_History_schema = require("../../../models/Plans/Plan_History"),
    // rule convert function
    rulesConverter = require("./rulesConverter");

module.exports = {
    id: { type: GraphQLID },
    id_number: { type: GraphQLInt },
    group_ids: { type: new GraphQLList(GraphQLString) },
    // group_id: { type: GraphQLID },
    organization_id: { type: GraphQLID },
    first_name: { type: GraphQLString },
    parent_name: { type: GraphQLString },
    email: { type: GraphQLString },
    gender: { type: GraphQLBoolean },
    phone: { type: GraphQLString },
    rule_ids: { type: new GraphQLList(GraphQLID) },
    rules: {
        type: new GraphQLList(Rule_type),
        async resolve({ rule_ids }) {
            return await rulesConverter({ rule_ids });
        },
    },
    attendance_Date: { type: GraphQLString },
    attendance: {
        type: Attendance_type,
        async resolve(args) {
            let { id: user_id, attendance_Date } = args;
            return await Attendances_schema.findOne({
                user_id,
                date: attendance_Date,
            });
        },
    },
    plans_history: {
        type: new GraphQLList(Plan_History_type),
        async resolve({ id: student_id }) {
            return await Plans_History_schema.find({ student_id });
        },
    },
    plans: {
        type: new GraphQLList(Plan_type),
        async resolve({ id }) {
            return await Plans_schema.find({ subgroup_id: id });
        },
    },
};
