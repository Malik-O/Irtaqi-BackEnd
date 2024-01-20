const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const authAPIRout = require("../routes/users");
//
const multer = require("multer");
const path = require("path");

// Set up storage using Multer
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/"); // The folder where the uploaded file will be stored
	},
	filename: function (req, file, cb) {
		cb(
			null,
			file.fieldname + "-" + Date.now() + path.extname(file.originalname),
		);
	},
});

const upload = multer({ storage: storage });

module.exports = (app, server) => {
	app.use(cors());
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	// auth endpoint
	app.use("/auth", authAPIRout);
	// auth endpoint
	app.post("/img", upload.single("profilePicture"), (req, res) => {
		console.log("img:", req.file);
		res.json(req.file);
	});
	// graphql endpoint
	app.use("/graphql", cors(), bodyParser.json(), expressMiddleware(server));
};
