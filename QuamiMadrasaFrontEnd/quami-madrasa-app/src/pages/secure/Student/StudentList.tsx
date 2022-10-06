import React, { useEffect, useState } from "react";
import { TableColumn } from "react-data-table-component";
import DataGrid, { GridParams } from "../../../components/datagrid/DataGrid";
import Toolbar,{DataColumn, ToolbarParams} from '../../../components/datagrid/Toolbar';
import Student from "../../../models/student.model";
import studentService from "../../../services/student.service";

const columns: TableColumn<Student>[] = [
  {
    name: "Id",
    selector: (row: Student) => row.id,
    sortable: true
  },
  {
    name: "Class",
    selector: (row: Student) => row.myClass.name,
    sortable: true,
  },
  {
    name: "Section",
    selector: (row: Student) => row.section.name,
    sortable: true,
  },
  {
    name: "Admission No",
    selector: (row: Student) => row.admNo,
    sortable: true,
  },
  {
    name: "Age",
    selector: (row: Student) => row.age,
    sortable: true
  },
  {
    name: "Hostel",
    selector: (row: Student) => row.hostel?.name,
    sortable: true,
    right: true
  },
  {
    name: "Hostel Room",
    selector: (row: Student) => row.hostelRoomNo,
    sortable: true,
    right: true,

  },
/*   {
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
  } */
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


function StudentList() {

  const [rowData,setRowData] = useState([]);

  useEffect(()=>{

    studentService.getAllStudents().then(resp=>{
      if(resp && resp.status == 200)
      {
        setRowData(resp.data);
      }
    })
    
  },[rowData]);
  

 

  const onRowClicked = (row: Student, e: React.MouseEvent<Element, MouseEvent>) => {
    console.log("row",row, e);
  }

  const onSelectedRowsChange = (selected: { allSelected: boolean; selectedCount: number; selectedRows: Student[]}) => {
    console.log("selected",selected)
  }

  let toolbarParams:ToolbarParams = {
     ExportExcelSettings:{
      fileName:'students',
      dataSet:rowData,
      //excelColDefs:[{header:"ID",key:"id"},{header:"Title",key:"title"},{header:"Director",key:"director"}] //or
       excelColDefs: getExcelColDefs(columns) //or pass null or undefined to get automatic excel
    },
    ExportCSVSettings:{
      fileName:'students',
      dataSet: rowData,
      //header : [{label:"ID",key:"id"},{label:"Title",key:"title"},{label:"Director",key:"director"}] //or
    },
    ExportPDFSettings:{
      fileName:'students',
      dataSet:rowData,
      //header: [{label:"ID",key:"id"},{label:"Title",key:"title"},{label:"Director",key:"director"}] //or leave blank
      refPDF:undefined,
    }
  }

  let params: GridParams<Student> = {
    gridTitle: "Students",
    defaultSortFieldId: 2,
    data: rowData,
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
    DataGrid<Student>(params)
  );
}

export default StudentList;


