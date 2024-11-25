import CloseIcon from "@mui/icons-material/Close";
import { useStudent } from "../Context/StudentContext";
import { useBook } from "../Context/BookContext";
import { useState } from "react";
import axios from "axios";
import { useEmprunt } from "../Context/EmpruntContext";

function EmpruntModal({ switchModal }) {
  const [id_livre, setId_livre] = useState("");
  const [num_matr, setNum_matr] = useState("");
  const [date_retour, setDate_retour] = useState("");

  const { etudiants } = useStudent();
  const { books } = useBook();
  const { reloadData, PORT_API } = useEmprunt();

  async function handleAddEmprunt(e) {
    e.preventDefault();

    if (id_livre === "" || num_matr === "" || date_retour === "") {
      alert("veuillez remplir tous les champs");
      return;
    }

    const today = new Date();
    const selectedDate = new Date(date_retour);
    const timeDiff = Math.abs(selectedDate.getTime() - today.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (diffDays > 7) {
      alert("Vous ne pouvez pas emprunter un livre pendant plus de 7 jours");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const res = await axios.post(
        `${PORT_API}/emprunt`,
        {
          id_livre,
          num_matr,
          date_retour,
        },
        { headers }
      );

      setId_livre("");
      setNum_matr("");
      setDate_retour("");

      reloadData();

      switchModal();

      alert("Un livre a été ajouter!");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="absolute w-1/3 h-[600px] bg-white top-0 right-0 z-50 shadow-md border-[1px] border-gray-200">
      <div className="flex justify-end items-center mx-2">
        <button onClick={switchModal} className=" text-green-500">
          <CloseIcon />
        </button>
      </div>
      <div className="mx-6">
        <h1 className="text-green-500 font-semibold text-[25px]">
          Ajouter un emprunt
        </h1>
        <form onSubmit={handleAddEmprunt} className="flex flex-col mt-6">
          <div className="flex flex-col my-2 text-gray-700">
            <label className="font-semibold">Id livre</label>
            <select
              name="id_livre"
              onChange={(e) => setId_livre(e.target.value)}
              className="border-[1px] border-green-500 outline-none py-1 px-2 my-1 rounded-sm text-gray-700"
            >
              <option value="">Veuillez choisir l id du livre</option>
              {books?.map((book, index) => (
                <option key={index} value={book?.id_livre}>
                  {book?.id_livre}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col my-2 text-gray-700">
            <label className="font-semibold">Num matricule</label>
            <select
              name="num_matr"
              onChange={(e) => setNum_matr(e.target.value)}
              className="border-[1px] border-green-500 outline-none py-1 px-2 my-1 rounded-sm text-gray-700"
            >
              <option value="">Veuillez choisir le numero matricule</option>
              {etudiants?.map((etudiant, index) => (
                <option key={index} value={etudiant?.num_matr}>
                  {etudiant?.num_matr}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col my-2 text-gray-700">
            <label className="font-semibold">Date retour</label>
            <input
              name="date_retour"
              type="date"
              placeholder="choisir la date..."
              onChange={(e) => setDate_retour(e.target.value)}
              className="border-[1px] border-green-500 outline-none py-1 px-2 my-1 rounded-sm text-gray-700"
            />
          </div>
          <button className="text-white font-semibold text-center bg-green-500 px-4 py-2 mx-32 mt-6 rounded-sm hover:bg-green-600">
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
}

export default EmpruntModal;
