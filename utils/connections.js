// createConnection util function
const createConnection = require("./createConnection");
// all connections
exports.usersConnection = createConnection("users");
exports.organizationsConnection = createConnection("organizations");
exports.plansConnection = createConnection("plans");
