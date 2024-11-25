const db = require("../db/db");

function getAllUsers(req, res) {
  const qr =
    "SELECT id_utilisateur, nom, email, role FROM utilisateur ORDER BY nom";
  db.query(qr, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Une erreur est survenue" });
    }
    res.json(results);
  });
}

async function createUser(req, res) {
  const { nom, email, password, role } = req.body;

  try {
    const query =
      "INSERT INTO utilisateur (nom, email, password, role) VALUES (?, ?, ?, ?)";
    db.query(query, [nom, email, password, role], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message:
            "Une erreur est survenue lors de la création de l'utilisateur",
        });
      }
      res.status(201).json({
        message: "Utilisateur créé avec succès",
      });
    });
  } catch (error) {
    console.error("Erreur lors du hachage du mot de passe:", error);
    return res.status(500).json({
      message: "Une erreur est survenue lors du hachage du mot de passe",
    });
  }
}

function searchUser(req, res) {
  const searchTerm = req.query.email;

  if (!searchTerm) {
    return res
      .status(400)
      .json({ message: "Le terme de recherche est requis" });
  }

  const query =
    "SELECT id_utilisateur, nom, email, role FROM utilisateur WHERE email LIKE ?";
  const searchTermWithWildcards = `%${searchTerm}%`;
  db.query(query, [searchTermWithWildcards], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Une erreur est survenue" });
    }
    res.json(results);
  });
}

module.exports = { getAllUsers, createUser, searchUser };
