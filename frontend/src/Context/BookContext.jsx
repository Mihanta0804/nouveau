import axios from "axios";
import { createContext, useContext, useState } from "react";

const BookContext = createContext();

function BookProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState(null);

  const [search, setSearch] = useState("");

  const [fiveBook, setFiveBook] = useState([]);

  const PORT_API = "http://localhost:5000";

  const getAllBooks = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const res = await axios.get(`${PORT_API}/book`, { headers });
      const data = await res.data;
      setBooks(data);
    } catch (error) {
      console.log(error);
    }
  };

  function reloadData() {
    getAllBooks();
  }

  async function handleDelete(id) {
    try {
      const confirmDelete = window.confirm(
        "Êtes-vous sûr de vouloir supprimer ce livre ?"
      );

      if (!confirmDelete) {
        return;
      }

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.delete(`${PORT_API}/book/${id}`, { headers });
      reloadData();
    } catch (error) {
      console.error("Erreur lors de la suppression du livre :", error);
    }
  }

  async function latestFiveBook() {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const res = await axios.get(`${PORT_API}/fivebook`, { headers });
      const data = await res.data;
      setFiveBook(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function searchBooks() {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const res = await axios.get(`${PORT_API}/books/search?titre=${search}`, {
        headers,
      });
      setBooks(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <BookContext.Provider
      value={{
        getAllBooks,
        reloadData,
        books,
        book,
        setBook,
        handleDelete,
        PORT_API,
        fiveBook,
        search,
        setSearch,
        latestFiveBook,
        searchBooks,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

function useBook() {
  const context = useContext(BookContext);
  if (context === undefined)
    throw new Error("Context use outside the provider");
  return context;
}

export { BookProvider, useBook };
