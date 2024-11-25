const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/middleware");
const {
  getAllStudents,
  searchStudent,
} = require("../controller/StudentController");

router.use(authenticateToken);

router.route("/etudiant").get(getAllStudents);
router.route("/etudiants/search").get(searchStudent);

module.exports = router;
