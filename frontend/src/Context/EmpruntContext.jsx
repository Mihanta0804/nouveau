import axios from "axios";
import { createContext, useContext, useState } from "react";

const EmpruntContext = createContext();

function EmpruntProvider({ children }) {
  const [emprunts, setEmprunts] = useState([]);
  const [search, setSearch] = useState("");

  const PORT_API = "http://localhost:5000";

  async function getAllEmprunts() {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const res = await axios.get(`${PORT_API}/emprunt`, { headers });
      const data = await res.data;
      setEmprunts(data);
    } catch (error) {
      console.log(error);
    }
  }

  function reloadData() {
    getAllEmprunts();
  }

  async function searchEmprunts() {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const res = await axios.get(
        `${PORT_API}/emprunts/search?num_matr=${search}`,
        {
          headers,
        }
      );
      setEmprunts(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <EmpruntContext.Provider
      value={{
        emprunts,
        getAllEmprunts,
        reloadData,
        search,
        setSearch,
        searchEmprunts,
        PORT_API,
      }}
    >
      {children}
    </EmpruntContext.Provider>
  );
}

function useEmprunt() {
  const context = useContext(EmpruntContext);
  if (context === undefined)
    throw new Error("Context use outside the provider");
  return context;
}

export { EmpruntProvider, useEmprunt };
