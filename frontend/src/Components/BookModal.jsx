import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useBook } from "../Context/BookContext";

function BookModal({ switchModal, isEdit }) {
  const { book, reloadData, PORT_API } = useBook();

  const [titre, setTitre] = useState(isEdit ? book?.titre : "");
  const [auteur, setAuteur] = useState(isEdit ? book?.auteur : "");
  const [genre, setGenre] = useState(isEdit ? book?.genre : "");
  const [pages, setPages] = useState(isEdit ? book?.pages : "");
  const [tome, setTome] = useState(isEdit ? book?.tome : "");

  async function handleAddBook(e) {
    e.preventDefault();

    if (titre === "" || auteur === "" || genre === "" || pages === "") {
      alert("veuillez remplir tous les champs");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const res = await axios.post(
        `${PORT_API}/book`,
        {
          titre,
          auteur,
          genre,
          pages,
          tome,
        },
        { headers }
      );

      setTitre("");
      setAuteur("");
      setGenre("");
      setPages("");
      setTitre("");

      reloadData();

      switchModal();

      alert("Un livre a été ajouter!");
    } catch (error) {
      console.error(error);
    }
  }

  async function handleEditBook(e) {
    e.preventDefault();

    if (titre === "" || auteur === "" || genre === "" || pages === "") {
      alert("veuillez remplir tous les champs");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const res = await axios.put(
        `${PORT_API}/book/${book?.id_livre}`,
        {
          titre,
          auteur,
          genre,
          pages,
          tome,
        },
        { headers }
      );

      setTitre("");
      setAuteur("");
      setGenre("");
      setPages("");
      setTitre("");

      reloadData();

      switchModal();

      alert("Le livre a été modifier!");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="absolute w-1/3 h-[600px] bg-white top-0 right-0 z-50 shadow-md border-[1px] border-gray-200">
      <div className="flex justify-end items-center mx-2">
        <button onClick={() => switchModal()} className=" text-green-500">
          <CloseIcon />
        </button>
      </div>
      <div className="mx-6">
        <h1 className="text-green-500 font-semibold text-[25px]">
          {isEdit ? "Modifier un livre" : "Ajouter un livre"}
        </h1>
        <form
          onSubmit={isEdit ? handleEditBook : handleAddBook}
          className="flex flex-col mt-6"
        >
          <div className="flex flex-col my-2">
            <label className="font-semibold text-gray-700">Titre</label>
            <input
              type="text"
              name="titre"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              placeholder="Entrer titre..."
              className="border-[1px] border-green-500 outline-none py-1 px-2 my-1 rounded-sm text-gray-700"
            />
          </div>
          <div className="flex flex-col my-2 text-gray-700">
            <label className="font-semibold">Auteur</label>
            <input
              type="text"
              name="auteur"
              value={auteur}
              onChange={(e) => setAuteur(e.target.value)}
              placeholder="Entrer auteur..."
              className="border-[1px] border-green-500 outline-none py-1 px-2 my-1 rounded-sm text-gray-700"
            />
          </div>
          <div className="flex flex-col my-2 text-gray-700">
            <label className="font-semibold">Genre</label>
            <input
              type="text"
              name="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              placeholder="Entrer genre..."
              className="border-[1px] border-green-500 outline-none py-1 px-2 my-1 rounded-sm text-gray-700"
            />
          </div>
          <div className="flex flex-col my-2 text-gray-700">
            <label className="font-semibold">Pages</label>
            <input
              type="number"
              name="pages"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              placeholder="Entrer pages..."
              className="border-[1px] border-green-500 outline-none py-1 px-2 my-1 rounded-sm text-gray-700"
            />
          </div>
          <div className="flex flex-col my-2 text-gray-700">
            <label className="font-semibold">Tome</label>
            <input
              type="number"
              name="tome"
              value={tome}
              onChange={(e) => setTome(e.target.value)}
              placeholder="Entrer Tome..."
              className="border-[1px] border-green-500 outline-none py-1 px-2 my-1 rounded-sm text-gray-700"
            />
          </div>

          <button className="text-white font-semibold text-center bg-green-500 px-4 py-2 mx-32 mt-6 rounded-sm hover:bg-green-600">
            {isEdit ? "Modifier" : "Ajouter"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookModal;
