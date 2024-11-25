import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full h-screen bg-slate-100">
      <h1 className="bg-white rounded-md px-4 py-2 text-3xl text-gray-800 font-semibold">
        404 page not found
      </h1>
      <Link
        to="/"
        className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-md font-semibold"
      >
        Revenir
      </Link>
    </div>
  );
}

export default NotFound;
