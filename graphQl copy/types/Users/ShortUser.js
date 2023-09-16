const { GraphQLObjectType } = require("graphql");
const userBaseFields = require("../shared/userBaseFields");
// User Type
const ShortUser_type = new GraphQLObjectType({
    name: `shortUser`,
    fields: () => userBaseFields,
});
// export
module.exports = ShortUser_type;
