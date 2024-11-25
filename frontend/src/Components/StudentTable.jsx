import React from "react";
import DataTable from "react-data-table-component";
import { useStudent } from "../Context/StudentContext";

function StudentTable() {
  const { etudiants } = useStudent();
  const columns = [
    {
      name: "Num matr",
      selector: (row) => row.num_matr,
      sortable: true,
    },
    {
      name: "Nom",
      selector: (row) => row.nom,
      sortable: true,
    },
    {
      name: "Prénom",
      selector: (row) => row.prenom,
      sortable: true,
    },
    {
      name: "Sexe",
      selector: (row) => row.sexe,
      sortable: true,
    },
    {
      name: "Classe",
      selector: (row) => row.classe,
      sortable: true,
    },
    {
      name: "Annee scolaire",
      selector: (row) => row.annee_scolaire,
      sortable: true,
    },
  ];

  return (
    <DataTable
      title="Liste des eleves"
      columns={columns}
      data={etudiants}
      pagination
      paginationPerPage={8}
      paginationRowsPerPageOptions={[8, 16, 24]}
      paginationComponentOptions={{ rowsPerPageText: "Lignes par page" }}
      highlightOnHover
      responsive
    />
  );
}

export default StudentTable;
