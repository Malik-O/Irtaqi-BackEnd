const { ObjectId, Schema } = require("mongoose");
const { organizationsConnection } = require("../../utils/connections");

const Groups = new Schema(
	{
		center_id: ObjectId,
		title: String,
		description: String,
		// working_days: Array,
	},
	{ timestamps: true, collection: "Groups" },
);

module.exports = organizationsConnection.model("Groups", Groups);

/**
    organizations {
        name: "genus",
    }
    user {
        name: "malik",
    }


    Users_Roles {
        user_id: "malik",
        role_id: "organization_owner"
        resource_id: "genus",
    }


    role {
        name: "organization_owner",
    }

    
    resource {
        type: "Organization",
    }

    permission {
        *? resource_id: "Organization",
        role_id: "organization_owner",
        actions: ["create", "update"],
    }
    permission {
        *? resource_id: "Center",
        role_id: "organization_owner",
        actions: ["all"],
    }
*/
