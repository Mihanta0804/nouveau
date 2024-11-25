const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/middleware");
const { login, userData } = require("../controller/AuthController");

router.route("/login").post(login);
router.route("/utilisateurconnecter").get(authenticateToken, userData);

module.exports = router;
