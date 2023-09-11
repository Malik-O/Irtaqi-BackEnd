const express = require("express");
const app = express();
const authAPIRout = require("./routes/users");
// import utils
const connect = require("./utils/connect");
const graphQlStartStandaloneServer = require("./utils/graphQlStandaloneServer");
// connect to mongo and serve GraphQL
connect().then(graphQlStartStandaloneServer);
// bodyParser
app.use(express.json());
// auth rout
app.use("/auth", authAPIRout);
// listen
const port = 3300;
app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
// Exports
// module.exports = app;
