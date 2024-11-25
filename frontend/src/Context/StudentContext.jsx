import axios from "axios";
import { createContext, useContext, useState } from "react";

const StudentContext = createContext();

function StudentProvider({ children }) {
  const [etudiants, setEtudiants] = useState([]);
  const [search, setSearch] = useState("");

  const PORT_API = "http://localhost:5000";

  async function getAllStudents() {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const res = await axios.get(`${PORT_API}/etudiant`, { headers });
      const data = await res.data;
      setEtudiants(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function searchStudents() {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const res = await axios.get(
        `${PORT_API}/etudiants/search?nom=${search}`,
        {
          headers,
        }
      );
      setEtudiants(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <StudentContext.Provider
      value={{
        etudiants,
        getAllStudents,
        PORT_API,
        searchStudents,
        setSearch,
        search,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

function useStudent() {
  const context = useContext(StudentContext);
  if (context === undefined)
    throw new Error("Context use outside the provider");
  return context;
}

export { StudentProvider, useStudent };
