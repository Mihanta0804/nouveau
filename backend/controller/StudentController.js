const db = require("../db/db");

function getAllStudents(req, res) {
  const qr = "SELECT * FROM eleves ORDER BY nom";
  db.query(qr, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Une erreur est survenue" });
    }
    res.json(results);
  });
}

function searchStudent(req, res) {
  const searchTerm = req.query.nom;

  if (!searchTerm) {
    return res
      .status(400)
      .json({ message: "Le terme de recherche est requis" });
  }

  const query = "SELECT * FROM eleves WHERE nom LIKE ?";
  const searchTermWithWildcards = `%${searchTerm}%`;
  db.query(query, [searchTermWithWildcards], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Une erreur est survenue" });
    }
    res.json(results);
  });
}

module.exports = { getAllStudents, searchStudent };
