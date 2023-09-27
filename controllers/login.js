const usersSchema = require("../models/Users/Users");
const jwt = require("jsonwebtoken");
// SECRET_KEY variable
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;
// login
module.exports = async function (req, res) {
	let auth = await usersSchema.findOne({
		email: req.body.email,
		password: req.body.password,
	});
	if (auth) {
		// create a token
		res.json({
			token: await jwt.sign(
				{
					user: {
						_id: auth._id,
						name: auth.name,
					},
				},
				SECRET_KEY,
			),
		});
	} else res.sendStatus(403);
};
