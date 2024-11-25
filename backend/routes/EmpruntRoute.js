const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/middleware");
const {
  getAllEmprunt,
  addEmprunt,
  searchEmprunts,
} = require("../controller/EmpruntController");

router.use(authenticateToken);

router.route("/emprunt").get(getAllEmprunt);
router.route("/emprunt").post(addEmprunt);
router.route("/emprunts/search").get(searchEmprunts);

module.exports = router;
