import { useEffect } from "react";
import StudentTable from "../Components/StudentTable";
import SearchIcon from "@mui/icons-material/Search";
import { useStudent } from "../Context/StudentContext";

function Student() {
  const { etudiants, getAllStudents, searchStudents, search, setSearch } =
    useStudent();

  useEffect(function () {
    getAllStudents();
  }, []);

  useEffect(
    function () {
      if (search === "" || search === null) {
        getAllStudents();
        return;
      }
      searchStudents();
    },
    [search]
  );

  return (
    <div className="mx-28 mt-4">
      <div className="flex justify-end items-center">
        <input
          type="text"
          name="search"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="recherche par nom..."
          className="border-[1px] border-green-500 outline-none rounded-l-md pl-5 pr-2 py-1 z-50 text-gray-700"
        />
        <div className="bg-green-500 px-2 py-1 rounded-r-md text-white">
          <SearchIcon />
        </div>
      </div>
      {etudiants && <StudentTable />}
    </div>
  );
}

export default Student;
