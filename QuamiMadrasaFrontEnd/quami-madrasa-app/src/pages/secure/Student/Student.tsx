import React from "react";
import { TableColumn } from "react-data-table-component";
import movies from "./movies";
import DataGrid, { GridParams } from "../../../components/datagrid/DataGrid";
import Toolbar,{DataColumn, ToolbarParams} from '../../../components/datagrid/Toolbar';

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

function getExcelColDefs<T>(colDefs:TableColumn<T>[]){

  let excelColDefs:DataColumn[] = [];

  colDefs.forEach(colDef => {
    let propertyName:string = "";
    let selector = colDef.selector?.toString();
    if(selector)
    {
      let start:number = selector.indexOf('row.');
      let end:number = selector.lastIndexOf('.');
      let dotCount = (selector.split(".").length - 1);
      if(end>4 && dotCount > 1)
      {
        propertyName = selector.substring(start+4,end);
      }
      else
      {
        propertyName = selector.substring(start+4,selector.length);
      }
      
    }
    
    let col:DataColumn = {header:colDef.name? colDef.name.toString() : "" ,key:propertyName};
    excelColDefs.push(col);

  });

  return excelColDefs;
}


function Student() {

  const onRowClicked = (row: Movie, e: React.MouseEvent<Element, MouseEvent>) => {
    console.log("row",row, e);
  }

  const onSelectedRowsChange = (selected: { allSelected: boolean; selectedCount: number; selectedRows: Movie[]}) => {
    console.log("selected",selected)
  }

  let toolbarParams:ToolbarParams = {
     ExportExcelSettings:{
      fileName:'movies',
      dataSet:movies,
      //excelColDefs:[{header:"ID",key:"id"},{header:"Title",key:"title"},{header:"Director",key:"director"}] //or
       excelColDefs: getExcelColDefs(columns) //or pass null or undefined to get automatic excel
    },
    ExportCSVSettings:{
      fileName:'movies',
      dataSet: movies,
      header : [{label:"ID",key:"id"},{label:"Title",key:"title"},{label:"Director",key:"director"}] //or
    }
  }

  let params: GridParams<Movie> = {
    gridTitle: "Students",
    defaultSortFieldId: 2,
    data: movies,
    columnDefs: columns,
    selectableRows: true,
    pagination: true,
    paginationRowsPerPageOptions:[10,20,50,100,500,1000],
    paginationPerPage:10,
    selectableRowsSingle:false,
    onRowClicked: onRowClicked,
    onSelectedRowsChange: onSelectedRowsChange,
    toolbarParams: toolbarParams
  };

  

  return (
    DataGrid<Movie>(params)
  );
}

export default Student;


