import { useBook } from "../Context/BookContext";
import { useEffect } from "react";
import { useStudent } from "../Context/StudentContext";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { useAuth } from "../Context/AuthContext";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useUser } from "../Context/UserContext";
import { useEmprunt } from "../Context/EmpruntContext";

const data = [
  {
    name: "Janvier",
    empreint: 100,
  },
  {
    name: "Fevrier",
    empreint: 120,
  },
  {
    name: "Mars",
    empreint: 200,
  },
  {
    name: "Avril",
    empreint: 95,
  },
  {
    name: "Mai",
    empreint: 120,
  },
  {
    name: "Juin",
    empreint: 100,
  },
  {
    name: "Juillet",
    empreint: 80,
  },
];

function Dashboard() {
  const { user } = useAuth();
  const { books, getAllBooks, latestFiveBook, fiveBook } = useBook();
  const { etudiants, getAllStudents } = useStudent();
  const { users, getAllUsers } = useUser();
  const { emprunts, getAllEmprunts } = useEmprunt();

  useEffect(function () {
    getAllBooks();
    getAllStudents();
    getAllUsers();
    latestFiveBook();
    getAllEmprunts();
  }, []);

  return (
    <div className="mx-28">
      <div>
        <h1 className="text-md">
          Bonjour <span className="font-semibold">{user?.nom}</span> vous êtes{" "}
          <span className="font-semibold">
            {user?.role === 0 ? "Administrateur" : "utilisateur"}
          </span>
          .
        </h1>
      </div>
      <div className="w-full h-[180px] gap-10 flex items-center justify-center my-5">
        <div className="w-1/4 h-[180px] bg-yellow-500 flex flex-col items-center justify-center text-white rounded-md shadow-md">
          <h1 className="my-2 text-4xl">Livre</h1>
          <h2 className="flex items-center justify-center text-4xl">
            <p className="flex items-center justify-center px-4 py-4 rounded-full bg-white text-yellow-500">
              <MenuBookIcon />
            </p>
            <p className="px-4 py-4">{books?.length}</p>
          </h2>
        </div>
        <div className="w-1/4 h-[180px] bg-blue-500 flex flex-col items-center justify-center text-white rounded-md shadow-md">
          <h1 className="my-2 text-4xl">Etudiant</h1>
          <h2 className="flex items-center justify-center text-4xl">
            <p className="flex items-center justify-center px-4 py-4 rounded-full bg-white text-blue-500">
              <PeopleOutlineIcon />
            </p>
            <p className="px-4 py-4">{etudiants?.length}</p>
          </h2>
        </div>
        <div className="w-1/4 h-[180px] bg-red-500 flex flex-col items-center justify-center text-white rounded-md shadow-md">
          <h1 className="my-2 text-4xl">Administrateur</h1>
          <h2 className="flex items-center justify-center text-4xl">
            <p className="flex items-center justify-center px-4 py-4 rounded-full bg-white text-red-500">
              <PersonOutlineIcon />
            </p>
            <p className="px-4 py-4">
              {users?.length < 10 ? `0${users?.length}` : users?.length}
            </p>
          </h2>
        </div>
        <div className="w-1/4 h-[180px] bg-green-500 flex flex-col items-center justify-center text-white rounded-md shadow-md">
          <h1 className="my-2 text-4xl">Emprunt</h1>
          <h2 className="flex items-center justify-center text-4xl">
            <p className="flex items-center justify-center px-4 py-4 rounded-full bg-white text-green-500">
              <ShowChartIcon />
            </p>
            <p className="px-4 py-4">{emprunts?.length}</p>
          </h2>
        </div>
      </div>
      <div className="w-full h-[350px] gap-16 flex items-center justify-center my-10">
        <div className="w-3/4 h-[350px] rounded-md shadow-md border-[1px] border-gray-200 flex flex-col justify-center items-center">
          <h1 className="py-2 text-xl text-gray-700">
            Statistique d'emprunt livre
          </h1>
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="empreint"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="w-1/4 h-[350px] py-2 rounded-md shadow-md border-[1px] border-gray-200">
          <h1 className="py-4 text-xl text-gray-700 flex items-center justify-center">
            (5) Dernier livre ajouter
          </h1>
          <ul className="mx-2">
            {fiveBook.map((item, index) => {
              return (
                <li
                  key={index}
                  className="py-3 hover:bg-gray-300 px-1 rounded-sm cursor-pointer text-gray-700"
                >
                  {item.titre}/{item.auteur}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
