import axios from "axios";
import { createContext, useContext, useState } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const PORT_API = "http://localhost:5000";

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  async function getAllUsers() {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const res = await axios.get(`${PORT_API}/utilisateur`, { headers });
      const data = await res.data;
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  }

  function reloadData() {
    getAllUsers();
  }

  async function searchUsers() {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const res = await axios.get(
        `${PORT_API}/utilisateurs/search?email=${search}`,
        {
          headers,
        }
      );
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <UserContext.Provider
      value={{
        users,
        getAllUsers,
        search,
        setSearch,
        searchUsers,
        PORT_API,
        reloadData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("Context use outside the provider");
  return context;
}

export { UserProvider, useUser };
