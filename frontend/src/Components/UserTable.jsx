import React from "react";
import DataTable from "react-data-table-component";
import { useUser } from "../Context/UserContext";
function UserTable() {
  const { users } = useUser();

  const mapRoleToText = (role) => {
    return role === 0 ? "Administrateur" : "Utilisateur";
  };

  const columns = [
    {
      name: "Id utilisateur",
      selector: (row) => row.id_utilisateur,
      sortable: true,
    },
    {
      name: "Nom",
      selector: (row) => row.nom,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => mapRoleToText(row.role),
      sortable: true,
    },
  ];
  return (
    <DataTable
      title="Liste des utilisateur"
      columns={columns}
      data={users}
      pagination
      paginationPerPage={8}
      paginationRowsPerPageOptions={[8, 16, 24]}
      paginationComponentOptions={{ rowsPerPageText: "Lignes par page" }}
      highlightOnHover
      responsive
    />
  );
}

export default UserTable;
