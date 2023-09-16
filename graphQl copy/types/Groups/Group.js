const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
} = require("graphql");

const // courses
    Courses_schema = require("../../../models/Courses/Courses"),
    Course_type = require("./Course"),
    // user
    Users_schema = require("../../../models/Users/Users"),
    ShortUser_type = require("../Users/ShortUser");
// shared
const timestamps = require("../shared/timestamps");
// export Type
module.exports = new GraphQLObjectType({
    name: "Group",
    fields: () => ({
        id: { type: GraphQLID },
        teacher_id: { type: GraphQLID },
        center_id: { type: GraphQLID },
        title: { type: GraphQLString },
        working_days: { type: new GraphQLList(GraphQLInt) },
        description: { type: GraphQLString },
        teacher: {
            type: new GraphQLList(ShortUser_type),
            async resolve({ teacher_id }) {
                return [await Users_schema.findById(teacher_id)];
            },
        },
        courses: {
            type: new GraphQLList(Course_type),
            async resolve({ id: group_id }) {
                return await Courses_schema.find({ group_id });
            },
        },
        ...timestamps,
    }),
});
