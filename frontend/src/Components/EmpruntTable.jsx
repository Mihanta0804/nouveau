import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useEmprunt } from "../Context/EmpruntContext";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

function formatDate(dateString) {
  const options = { day: "numeric", month: "long", year: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", options);
}

function formatTimeRemaining(dateString) {
  const now = new Date();
  const dueDate = new Date(dateString);
  const timeRemaining = dueDate - now;
  const seconds = Math.floor((timeRemaining / 1000) % 60);
  const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
  const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

  if (timeRemaining <= 0) {
    return "Livre à remettre";
  } else {
    return `${days}j ${hours}h ${minutes}m ${seconds}s`;
  }
}

function EmpruntTable() {
  const { emprunts } = useEmprunt();

  const [timeRemainingColumns, setTimeRemainingColumns] = useState([]);

  useEffect(() => {
    const columns = [
      {
        name: "Id emprunt",
        selector: (row) => row.id_emprunt,
        sortable: true,
      },
      {
        name: "Id livre",
        selector: (row) => row.id_livre,
        sortable: true,
      },
      {
        name: "Numero matricule",
        selector: (row) => row.num_matr,
        sortable: true,
      },
      {
        name: "Date emprunt",
        selector: (row) => formatDate(row.date_emprunt),
        sortable: true,
      },
      {
        name: "Date retour",
        selector: (row) => formatDate(row.date_retour),
        sortable: true,
      },
      {
        name: "Temps restant",
        selector: (row) => formatTimeRemaining(row.date_retour),
        sortable: true,
      },
    ];
    setTimeRemainingColumns(columns);
  }, [emprunts]);

  const handleExportToPdf = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [timeRemainingColumns.map((column) => column.name)],
      body: emprunts.map((row) =>
        timeRemainingColumns.map((column) => {
          if (typeof column.selector === "function") {
            return column.selector(row);
          }

          return row[column.selector];
        })
      ),
    });
    doc.save("emprunts.pdf");
  };

  return (
    <div>
      <div>
        <DataTable
          title="Liste des livres"
          columns={timeRemainingColumns}
          data={emprunts}
          pagination
          paginationPerPage={8}
          paginationRowsPerPageOptions={[8, 16, 24]}
          paginationComponentOptions={{ rowsPerPageText: "Lignes par page" }}
          highlightOnHover
          responsive
        />
      </div>
      <div className="flex justify-end items-end">
        <button
          onClick={handleExportToPdf}
          className="text-white bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded-sm"
        >
          <span>
            <FileUploadIcon />
          </span>{" "}
          Exporter en PDF
        </button>
      </div>
    </div>
  );
}

export default EmpruntTable;
