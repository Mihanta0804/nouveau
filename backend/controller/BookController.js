const db = require("../db/db");

function getAllBooks(req, res) {
  db.query("SELECT * FROM livres", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Une erreur est survenue" });
    }
    res.json(results);
  });
}

function getBookById(req, res) {
  const id = req.params.id_book;
  db.query("SELECT * FROM livres WHERE id_livre = ?", id, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ mesage: "Une erreur est survenue" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Livre non trouvé" });
    }
    res.json(results[0]);
  });
}

function createBook(req, res) {
  const { titre, auteur, pages, tome, genre } = req.body;
  const query =
    "INSERT INTO livres (titre, auteur, pages, tome, genre) VALUES (?, ?, ?, ?, ?)";
  db.query(query, [titre, auteur, pages, tome, genre], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Une erreur est survenue lors de la création du livre",
      });
    }
    res
      .status(201)
      .json({ message: "Livre créé avec succès", id_livre: result.insertId });
  });
}

function updateBook(req, res) {
  const id = req.params.id_book;
  const { titre, auteur, pages, tome, genre } = req.body;
  const query =
    "UPDATE livres SET titre = ?, auteur = ?, pages = ?, tome = ?, genre = ? WHERE id_livre = ?";
  db.query(query, [titre, auteur, pages, tome, genre, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Une erreur est survenue lors de la mise à jour du livre",
      });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Livre non trouvé" });
    }
    res.json({ message: "Livre mis à jour avec succès", id_livre: id });
  });
}

function deleteBook(req, res) {
  const id = req.params.id_book;
  const query = "DELETE FROM livres WHERE id_livre = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Une erreur est survenue lors de la suppression du livre",
      });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Livre non trouvé" });
    }
    res.json({ message: "Livre supprimé avec succès", id_livre: id });
  });
}

function getLastFiveBooks(req, res) {
  const query = "SELECT * FROM livres ORDER BY id_livre DESC LIMIT 5";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Une erreur est survenue" });
    }
    res.json(results);
  });
}

function searchBooks(req, res) {
  const searchTerm = req.query.titre;

  if (!searchTerm) {
    return res
      .status(400)
      .json({ message: "Le terme de recherche est requis" });
  }

  const query = "SELECT * FROM livres WHERE titre LIKE ?";
  const searchTermWithWildcards = `%${searchTerm}%`;
  db.query(query, [searchTermWithWildcards], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Une erreur est survenue" });
    }
    res.json(results);
  });
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getLastFiveBooks,
  searchBooks,
};
