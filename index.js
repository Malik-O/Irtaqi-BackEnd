const express = require("express");
const app = express();
// import utils
const connect = require("./utils/connect");
const appEndpoints = require("./utils/appEndpoints");

const schema = require("./graphQl/schema");
const { ApolloServer } = require("@apollo/server");
// connect to mongo and serve GraphQL
connect(app).then(async () => {
	const server = new ApolloServer({ schema });
	await server.start();
	appEndpoints(app, server);
	// listening
	const port = 3000;
	app.listen(port, () => {
		console.log(`App at => http://localhost:${port}`);
		console.log(`graphql at => http://localhost:${port}/graphql`);
	});
});
