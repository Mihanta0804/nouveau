import { NavLink } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import sfx from "../Assets/images/sfx.png";

function Navigation({ connectedUser }) {
  const { logout } = useAuth();

  function userLogout() {
    logout();
  }

  return (
    <div>
      <div className="flex justify-around items-center py-4">
        <h1 className="flex justify-center items-center gap-2">
          <img src={sfx} alt="logo sfx" className="w-[55px] h-[55px]" />
          <span>Bibliothèque</span>
        </h1>
        <ul className="flex gap-16 justify-around items-center font-semibold text-gray-700">
          <li className="hover:text-green-400">
            <NavLink
              to="dash"
              className={({ isActive }) =>
                isActive
                  ? "text-green-500 px-3 py-2 border-b-2 border-green-500"
                  : "px-2 py-1"
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li className="hover:text-green-400">
            <NavLink
              to="book"
              className={({ isActive }) =>
                isActive
                  ? "text-green-500 px-3 py-2 border-b-2 border-green-500"
                  : "px-2 py-1"
              }
            >
              Livres
            </NavLink>
          </li>
          <li className="hover:text-green-400">
            <NavLink
              to="emprunt"
              className={({ isActive }) =>
                isActive
                  ? "text-green-500 px-3 py-2 border-b-2 border-green-500"
                  : "px-2 py-1"
              }
            >
              Emprunt
            </NavLink>
          </li>
          <li className="hover:text-green-400">
            <NavLink
              to="student"
              className={({ isActive }) =>
                isActive
                  ? "text-green-500 px-3 py-2 border-b-2 border-green-500"
                  : "px-2 py-1"
              }
            >
              Etudiant
            </NavLink>
          </li>
          {connectedUser?.role === 0 && (
            <li className="hover:text-green-400">
              <NavLink
                to="user"
                className={({ isActive }) =>
                  isActive
                    ? "text-green-500 px-3 py-2 border-b-2 border-green-500"
                    : "px-2 py-1"
                }
              >
                Utilisateur
              </NavLink>
            </li>
          )}
        </ul>

        <button
          onClick={userLogout}
          className="text-white font-semibold py-2 px-3 bg-green-500 hover:bg-green-600 rounded-md"
        >
          Deconnexion
        </button>
      </div>
    </div>
  );
}

export default Navigation;
