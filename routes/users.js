const express = require("express");
const router = express.Router();
const login = require("../controllers/login");
const logout = require("../controllers/logout");
const { verification, user } = require("../controllers/user");
// login
router.post("/login", login);
// user
router.get("/user", verification, user);
// logout
router.delete("/logout", logout);
// Export
module.exports = router;
