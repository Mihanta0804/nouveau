import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";

const PORT_API = "http://localhost:5000";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      localStorage.removeItem("token");
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unkwon action");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch({ type: "login", payload: null });
    }
  }, []);

  async function login(email, password) {
    try {
      const res = await axios.post(`${PORT_API}/login`, {
        email,
        password,
      });
      const token = res.data.token;
      localStorage.setItem("token", token);
      dispatch({ type: "login", payload: null });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Credential invalide");
      } else {
        console.error(error);
      }
    }
  }

  async function getUserData() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      // Inclure le token dans les en-têtes de la requête
      const res = await axios.get(`${PORT_API}/utilisateurconnecter`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "login", payload: res.data });
    } catch (error) {
      console.log(error);
    }
  }

  function logout() {
    const confirmDelete = window.confirm("Vous voulez se déconnecter ?");

    if (!confirmDelete) {
      return;
    }

    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, getUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Context use outside the provider");
  return context;
}

export { AuthProvider, useAuth };
