const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const authAPIRout = require("../routes/users");

module.exports = (app, server) => {
	app.use(cors());
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	// auth endpoint
	app.use("/auth", authAPIRout);
	// graphql endpoint
	app.use("/graphql", cors(), bodyParser.json(), expressMiddleware(server));
};
