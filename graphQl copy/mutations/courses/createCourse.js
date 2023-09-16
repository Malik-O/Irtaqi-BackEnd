const {
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLBoolean,
    GraphQLList,
} = require("graphql");
const Courses_Schema = require("../../../models/Courses/Courses"),
    Course_type = require("../../types/Groups/Course");
// Function
module.exports = {
    type: Course_type,
    args: {
        group_id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
    },
    async resolve(_, args) {
        return await Courses_Schema.create(args);
    },
};
