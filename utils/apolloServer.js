const { ApolloServer } = require("@apollo/server");
const {
	ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const { createServer } = require("http");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
// Schema definition
const schema = require("../graphQl/schema");

module.exports = (app) => {
	const httpServer = createServer(app);
	// Set up WebSocket server.
	const wsServer = new WebSocketServer({
		server: httpServer,
		path: "/subscriptions",
	});
	const serverCleanup = useServer({ schema }, wsServer);
	const server = new ApolloServer({
		schema,
		introspection: true,
		plugins: [
			// Proper shutdown for the HTTP server.
			ApolloServerPluginDrainHttpServer({ httpServer }),
			// Proper shutdown for the WebSocket server.
			{
				async serverWillStart() {
					return {
						async drainServer() {
							await serverCleanup.dispose();
						},
					};
				},
			},
		],
	});
	return { server, httpServer };
};
