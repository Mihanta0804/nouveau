import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import sfx from "../Assets/images/sfx.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { isAuthenticated, login } = useAuth();

  function handleLogin(e) {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Tous les champs sont requises pour la connexion");
    }

    if (email && password) login(email, password);
  }

  useEffect(
    function () {
      if (isAuthenticated) navigate("/app");
    },
    [isAuthenticated, navigate]
  );

  return (
    <div className="flex justify-center items-center bg-slate-100 w-full h-screen">
      <form
        onSubmit={handleLogin}
        className="flex flex-col justify-start items-start bg-white shadow-md gap-2 w-1/4 px-4 py-4 rounded-md"
      >
        <h1 className="text-2xl font-semibold text-gray-700 flex items-center justify-center gap-4">
          <img src={sfx} alt="logo sfx" className="w-[35px] h-[35px]" />
          <span>Bibliothèque sfx</span>
        </h1>
        <div className="flex flex-col justify-start items-start w-full gap-2 py-2">
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-gray-600 border-[1px] border-green-500 rounded-md py-1 px-2 outline-none"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold text-gray-700">Mot de passe</label>
            <input
              type="password"
              placeholder="Mot de passe..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-gray-600 border-[1px] border-green-500 rounded-md py-1 px-2 outline-none"
            />
          </div>
        </div>
        <div className="flex justify-start items-start bg-green-500 px-2 py-1 rounded-md hover:bg-green-600">
          <button className="text-white font-semibold">Connexion</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
