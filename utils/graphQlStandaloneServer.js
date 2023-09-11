const schema = require("../graphQl/schema");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

module.exports = async () => {
	const server = new ApolloServer({ schema });
	startStandaloneServer(server).then(({ url }) => {
		console.log(`🚀 Server listening at: ${url}`);
	});
};
