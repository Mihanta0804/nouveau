import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useUser } from "../Context/UserContext";

function UserModal({ switchModal }) {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { PORT_API, reloadData } = useUser();

  async function handleAddUser(e) {
    e.preventDefault();

    if (nom === "" || email === "" || password === "" || role === "") {
      alert("veuillez remplir tous les champs");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const res = await axios.post(
        `${PORT_API}/utilisateur`,
        {
          nom,
          email,
          password,
          role,
        },
        { headers }
      );

      setNom("");
      setEmail("");
      setPassword("");
      setRole("");

      reloadData();

      switchModal();

      alert("Un utilisateur ajouté");
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
          Ajouter un utilisateur
        </h1>
        <form onSubmit={handleAddUser} className="flex flex-col mt-6">
          <div className="flex flex-col my-2">
            <label className="font-semibold text-gray-700">Nom</label>
            <input
              type="text"
              placeholder="Entrer nom..."
              onChange={(e) => setNom(e.target.value)}
              className="border-[1px] border-green-500 outline-none py-1 px-2 my-1 rounded-sm text-gray-700"
            />
          </div>
          <div className="flex flex-col my-2 text-gray-700">
            <label className="font-semibold">Email</label>
            <input
              type="mail"
              placeholder="Entrer email..."
              onChange={(e) => setEmail(e.target.value)}
              className="border-[1px] border-green-500 outline-none py-1 px-2 my-1 rounded-sm text-gray-700"
            />
          </div>
          <div className="flex flex-col my-2 text-gray-700">
            <label className="font-semibold">Mot de passe</label>
            <input
              type="password"
              placeholder="Entrer mot de passe..."
              onChange={(e) => setPassword(e.target.value)}
              className="border-[1px] border-green-500 outline-none py-1 px-2 my-1 rounded-sm text-gray-700"
            />
          </div>
          <div className="flex flex-col my-2 text-gray-700">
            <label className="font-semibold">Role</label>
            <select
              name="role"
              onChange={(e) => setRole(e.target.value)}
              className="border-[1px] border-green-500 outline-none py-1 px-2 my-1 rounded-sm text-gray-700"
            >
              <option value="">Selectionner le role</option>
              <option value={0}>Administrateur</option>
              <option value={1}>Utilisateur</option>
            </select>
          </div>
          <button className="text-white font-semibold text-center bg-green-500 px-4 py-2 mx-32 mt-6 rounded-sm hover:bg-green-600">
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserModal;
