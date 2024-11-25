const db = require("../db/db");

function getAllEmprunt(req, res) {
  db.query("SELECT * FROM emprunt", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Une erreur est survenue" });
    }
    res.json(results);
  });
}

function addEmprunt(req, res) {
  try {
    const { id_livre, num_matr, date_retour } = req.body;
    const date_emprunt = new Date();

    const sql =
      "INSERT INTO emprunt (id_livre, num_matr, date_emprunt, date_retour) VALUES (?, ?, ?, ?)";

    db.query(sql, [id_livre, num_matr, date_emprunt, date_retour]);

    res.status(201).json({ message: "Emprunt ajouté avec succès" });
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'emprunt :", error);
    res.status(500).json({
      message: "Une erreur est survenue lors de l'ajout de l'emprunt",
    });
  }
}

function searchEmprunts(req, res) {
  const searchTerm = req.query.num_matr;

  if (!searchTerm) {
    return res
      .status(400)
      .json({ message: "Le terme de recherche est requis" });
  }

  const query = "SELECT * FROM emprunt WHERE num_matr LIKE ?";
  const searchTermWithWildcards = `%${searchTerm}%`;
  db.query(query, [searchTermWithWildcards], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Une erreur est survenue" });
    }
    res.json(results);
  });
}

module.exports = { getAllEmprunt, addEmprunt, searchEmprunts };
