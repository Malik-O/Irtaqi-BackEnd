const app = require("express")();
// import utils
const connect = require("./utils/connect");
const appEndpoints = require("./utils/appEndpoints");
const apolloServer = require("./utils/apolloServer");
//
const { generatePlanDays } = require("./static/generatePlanDays");
const props = {
	title: "p 1",
	working_days: [0, 1, 2, 3, 4],
	from: 1,
	amount: 1,
	starting_at: new Date(new Date().setDate(20)),
	weeks: 1,
	order_reversed: false,
};
const PORT = 800;
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
		console.log(`🚀 Subscription endpoint ready at ws${local}/graphql`);
	});
});
