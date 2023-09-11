const express = require("express");
const { expressMiddleware } = require("@apollo/server/express4");
const authAPIRout = require("../routes/users");

module.exports = (app, server) => {
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	// auth endpoint
	app.use("/auth", authAPIRout);
	// graphql endpoint
	app.use("/graphql", expressMiddleware(server));
	return app;
};
