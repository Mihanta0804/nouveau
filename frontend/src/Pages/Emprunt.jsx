import { useEffect, useState } from "react";
import { useEmprunt } from "../Context/EmpruntContext";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EmpruntTable from "../Components/EmpruntTable";
import EmpruntModal from "../Components/EmpruntModal";

function Emprunt() {
  const [isOpen, setIsOpen] = useState(false);

  const { emprunts, getAllEmprunts, search, setSearch, searchEmprunts } =
    useEmprunt();

  function handleSwitchModal() {
    setIsOpen(!isOpen);
  }

  useEffect(function () {
    getAllEmprunts();
  }, []);

  useEffect(
    function () {
      if (search === "" || search === null) {
        getAllEmprunts();
        return;
      }
      searchEmprunts();
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
              placeholder="recherche par n° matr..."
              onChange={(e) => setSearch(e.target.value)}
              className="border-[1px] border-green-500 outline-none rounded-l-md pl-5 pr-2 py-1 z-50 text-gray-700"
            />
            <div className="bg-green-500 px-2 py-1 rounded-r-md text-white">
              <SearchIcon />
            </div>
          </div>

          <button
            onClick={handleSwitchModal}
            className="bg-green-500 hover:bg-green-600 text-white px-1 py-1 rounded-md"
          >
            <AddIcon />
            <span className="px-2">Ajouter</span>
          </button>
        </div>
      </div>
      {emprunts && (
        <div className={`${isOpen ? "blur-md" : ""}`}>
          <EmpruntTable />
        </div>
      )}
      {isOpen && <EmpruntModal switchModal={handleSwitchModal} />}
    </div>
  );
}

export default Emprunt;
