const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
const Centers = new Schema(
    {
        organization_id: mongoose.ObjectId,
        owner_id: mongoose.ObjectId,
        title: String,
        working_days: Array, // encode like [sat, sun, mon, tue, wed, thu, fri]
        description: String,
    },
    { timestamps: true, collection: "Centers" }
);

module.exports = mongoose.model("Centers", Centers);
