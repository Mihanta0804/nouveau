const db = require("../db/db");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

function login(req, res) {
  const { email, password } = req.body;
  const qr = "SELECT * FROM utilisateur WHERE email = ? AND password = ?";

  db.query(qr, [email, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Une erreur est survenue" });
    }
    if (results.length > 0) {
      const utilisateur = results[0];
      const token = jwt.sign(
        {
          id: utilisateur.id_utilisateur,
          nom: utilisateur.nom,
          email: utilisateur.email,
          role: utilisateur.role,
        },
        JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );
      res.json({ token });
    } else {
      res.status(401).json({ message: "Credential invalide" });
    }
  });
}

function userData(req, res) {
  res.json(req.user);
}

module.exports = { login, userData };
