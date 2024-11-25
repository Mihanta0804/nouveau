import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import BookTable from "../Components/BookTable";
import BookModal from "../Components/BookModal";
import { useBook } from "../Context/BookContext";

function Book() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const { books, setBook, search, setSearch, searchBooks, getAllBooks } =
    useBook();

  function handleSwitchModal() {
    setIsOpen(!isOpen);
    setIsEdit(false);
  }

  function handleSwitchEdit(id) {
    setIsOpen(!isOpen);
    setIsEdit(true);

    const editedBook = books.find((book) => book.id_livre === id);
    setBook(editedBook);
  }

  useEffect(function () {
    getAllBooks();
  }, []);

  useEffect(
    function () {
      if (search === "" || search === null) {
        getAllBooks();
        return;
      }
      searchBooks();
    },
    [search]
  );

  return (
    <div className="relative mx-28">
      <div className={`${isOpen ? "w-full h-auto blur-md" : "w-full h-auto"}`}>
        <div className="flex justify-end gap-5 items-center mt-4">
          <div className="flex justify-center">
            <input
              type="text"
              name="search"
              placeholder="recherche par titre..."
              onChange={(e) => setSearch(e.target.value)}
              className="border-[1px] border-green-500 outline-none rounded-l-md pl-5 pr-2 py-1 z-50 text-gray-700"
            />
            <div className="bg-green-500 px-2 py-1 rounded-r-md text-white">
              <SearchIcon />
            </div>
          </div>

          <button
            onClick={() => handleSwitchModal()}
            className="bg-green-500 hover:bg-green-600 text-white px-1 py-1 rounded-md"
          >
            <AddIcon />
            <span className="px-2">Ajouter</span>
          </button>
        </div>
      </div>
      {books && (
        <div className={`${isOpen ? "blur-md" : ""}`}>
          <BookTable data={books} handleSwitchEdit={handleSwitchEdit} />
        </div>
      )}

      {isOpen && <BookModal isEdit={isEdit} switchModal={handleSwitchModal} />}
    </div>
  );
}

export default Book;
