const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/middleware");
const {
  getAllUsers,
  createUser,
  searchUser,
} = require("../controller/UserController");

router.use(authenticateToken);

router.route("/utilisateur").get(getAllUsers);
router.route("/utilisateur").post(createUser);
router.route("/utilisateurs/search").get(searchUser);

module.exports = router;
