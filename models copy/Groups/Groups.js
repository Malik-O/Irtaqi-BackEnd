const mongoose = require("mongoose"),
	Schema = mongoose.Schema;
const Groups = new Schema(
	{
		// admin_id: mongoose.ObjectId,
		center_id: mongoose.ObjectId,
		teacher_id: mongoose.ObjectId,
		title: String,
		working_days: Array,
		description: String,
		createdAt: Date,
	},
	{ timestamps: true, collection: "Groups" },
);

module.exports = mongoose.model("Groups", Groups);

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
