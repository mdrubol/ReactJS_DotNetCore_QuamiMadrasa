import React from "react";
import { TableColumn } from "react-data-table-component";
import movies from "./movies";
import DataGrid, { GridParams } from "../../../components/datagrid/DataGrid";

interface Movie {
  id: number;
  title: string;
  year: string;
  runtime: string;
  genres: string[],
  director: string;
  actors: string,
  plot: string;
  posterUrl: string;
}

const columns: TableColumn<Movie>[] = [
  {
    name: "Id",
    selector: (row: Movie) => row.id,
    sortable: true
  },
  {
    name: "Title",
    selector: (row: Movie) => row.title,
    sortable: true,
  },
  {
    name: "Directior",
    selector: (row: Movie) => row.director,
    sortable: true
  },
  {
    name: "Runtime (m)",
    selector: (row: Movie) => row.runtime,
    sortable: true,
    right: true
  },
  {
    name: "Genres",
    selector: (row: Movie) => row.genres.join(','),
    sortable: true,
    right: true,

  },
  {
    button: true,
    cell: () => (
      <>
        <div className="openbtn text-center">
          <button
            type="button"
            className="btn btn-primary"
          >
            Download
          </button>
        </div>
      </>
    )
  }
];



function Student() {

  const onRowClicked = (row: Movie, e: React.MouseEvent<Element, MouseEvent>) => {
    console.log("row",row, e);
  }

  const onSelectedRowsChange = (selected: { allSelected: boolean; selectedCount: number; selectedRows: Movie[]}) => {
    console.log("selected",selected)
  }

  let params: GridParams<Movie> = {
    gridTitle: "Movies",
    defaultSortFieldId: 2,
    data: movies,
    columnDefs: columns,
    selectableRows: true,
    pagination: true,
    paginationRowsPerPageOptions:[10,20,50,100,500,1000],
    paginationPerPage:10,
    selectableRowsSingle:false,
    onRowClicked: onRowClicked,
    onSelectedRowsChange: onSelectedRowsChange
  };



  return (
    DataGrid<Movie>(params)
  );
}

export default Student;


