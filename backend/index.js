const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./db/db");
const auth = require("./routes/AuthRoute");
const book = require("./routes/BookRoute");
const student = require("./routes/StudentRoute");
const user = require("./routes/UserRoute");
const emprunt = require("./routes/EmpruntRoute");

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Route auth
app.use("/", auth);
app.use("/", book);
app.use("/", student);
app.use("/", user);
app.use("/", emprunt);

db.connect((err) => {
  err
    ? console.log(`La serveur mysql n'est pas encore demarrer ${err}`)
    : console.log(`Connexion mysql établie`);
});

app.listen(PORT, () => {
  console.log(`Le serveur est ecouter avec le port : ${PORT}`);
});
