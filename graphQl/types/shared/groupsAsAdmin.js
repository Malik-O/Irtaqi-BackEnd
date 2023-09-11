const { GraphQLID, GraphQLList } = require("graphql");
const Users_schema = require("../../../models/Users/Users"),
    // center
    Organizations_schema = require("../../../models/Organizations"),
    Centers_schema = require("../../../models/Centers"),
    //
    rulesConverter = require("./rulesConverter"),
    // Groups
    Group_type = require("../Groups/Group"),
    Groups_schema = require("../../../models/Groups/Groups");
module.exports = (isSelf) => {
    let args = { id: { type: GraphQLID } };
    args = isSelf ? {} : args;
    // query
    return {
        type: new GraphQLList(Group_type),
        args,
        async resolve(self, args) {
            let { id: owner_id, rule_ids } = isSelf ? self : args;
            if (!isSelf)
                rule_ids = (await Users_schema.findById(owner_id)).rule_ids;
            let rules = await rulesConverter({ rule_ids });
            rules = rules.map((rule) => rule.title);
            // organization admin
            if (rules.indexOf("OWNER_organization") !== -1) {
                let organizations = await Organizations_schema.find({
                        owner_id,
                    }),
                    $in = organizations.map((organization) => organization.id);
                var centers = await Centers_schema.find({
                    organization_id: { $in },
                });
            }
            // center admin
            else if (rules.indexOf("OWNER_center") !== -1) {
                var centers = await Centers_schema.find({ owner_id });
            } else return [];
            // return groups
            let $in = centers.map((center) => center.id);
            return await Groups_schema.find({ center_id: { $in } });
        },
    };
};
