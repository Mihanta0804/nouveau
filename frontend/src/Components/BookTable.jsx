import React from "react";
import DataTable from "react-data-table-component";
import { useAuth } from "../Context/AuthContext";
import { useBook } from "../Context/BookContext";

function BookTable({ data, handleSwitchEdit }) {
  const { user } = useAuth();
  const { handleDelete } = useBook();

  const columns = [
    {
      name: "Id livre",
      selector: (row) => row.id_livre,
      sortable: true,
    },
    {
      name: "Titre",
      selector: (row) => row.titre,
      sortable: true,
    },
    {
      name: "Auteur",
      selector: (row) => row.auteur,
      sortable: true,
    },
    {
      name: "Genre",
      selector: (row) => row.genre,
      sortable: true,
    },
    {
      name: "Pages",
      selector: (row) => row.pages,
      sortable: true,
    },
    {
      name: "Tome",
      selector: (row) => row.tome,
      sortable: true,
    },
    {
      name: "Options",
      cell: (row) => (
        <div className="flex gap-6">
          {user?.role === 0 && (
            <div className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md">
              <button onClick={() => handleSwitchEdit(row.id_livre)}>
                Modif
              </button>
            </div>
          )}
          {user?.role === 0 && (
            <div className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md">
              <button onClick={() => handleDelete(row.id_livre)}>Suppr</button>
            </div>
          )}
          {user?.role === 1 && <div>vous n'avez pas accès a ces options</div>}
        </div>
      ),
    },
  ];

  return (
    <DataTable
      title="Liste des livres"
      columns={columns}
      data={data}
      pagination
      paginationPerPage={8}
      paginationRowsPerPageOptions={[8, 16, 24]}
      paginationComponentOptions={{ rowsPerPageText: "Lignes par page" }}
      highlightOnHover
      responsive
    />
  );
}

export default BookTable;
