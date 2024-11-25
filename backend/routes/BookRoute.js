const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/middleware");
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getLastFiveBooks,
  searchBooks,
} = require("../controller/BookController");

router.use(authenticateToken);

router.route("/book").get(getAllBooks);
router.route("/book/:id_book").get(getBookById);
router.route("/book").post(createBook);
router.route("/book/:id_book").put(updateBook);
router.route("/book/:id_book").delete(deleteBook);
router.route("/fivebook").get(getLastFiveBooks);
router.route("/books/search").get(searchBooks);

module.exports = router;
