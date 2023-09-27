const jwt = require("jsonwebtoken");
// SECRET_KEY variable
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;
// verification
const verification = (req, res, next) => {
	const bearerHeader = req.headers.authorization;
	if (bearerHeader) {
		req.token = bearerHeader.split(" ")[1];
		next();
	} else {
		res.sendStatus(403);
	}
};
// user
const user = async (req, res) => {
	const data = await jwt.verify(req.token, SECRET_KEY);
	res.json(data);
};
// Export
module.exports = { verification, user };
