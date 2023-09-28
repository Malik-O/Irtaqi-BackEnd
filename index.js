const app = require("express")();
// import utils
const connect = require("./utils/connect");
const appEndpoints = require("./utils/appEndpoints");
const apolloServer = require("./utils/apolloServer");
const PORT = 4000;
// connect to mongoDB then start server
connect(app).then(async () => {
	const { server, httpServer } = apolloServer(app);
	// start the server
	await server.start();
	// express endpoints
	appEndpoints(app, server);
	// listen to PORT
	httpServer.listen(PORT, () => {
		const local = `://localhost:${PORT}`;
		console.log(`🚀 Auth endpoint ready at http${local}/auth/`);
		console.log(`🚀 Query endpoint ready at http${local}/graphql`);
		console.log(`🚀 Subscription endpoint ready at ws${PORT}/graphql`);
	});
});
