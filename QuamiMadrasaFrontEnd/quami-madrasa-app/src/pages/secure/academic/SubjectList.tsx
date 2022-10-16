import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { TableColumn } from "react-data-table-component";
import { useNavigate,Link } from "react-router-dom";
import DataGrid, { GridParams } from "../../../components/datagrid/DataGrid";
import Toolbar,{DataColumn, ToolbarParams} from '../../../components/datagrid/Toolbar';
import Loader from "../../../components/loader/Loader";
import Subject from "../../../models/subject.model";
import academicService from "../../../services/academic.service";

const columns: TableColumn<Subject>[] = [
  {
    name: "Id",
    selector: (row: Subject) => row.id,
    sortable: true
  },
  {
    name: "Name",
    selector: (row: Subject) => row.name,
    sortable: true,
  },
  {
    button: true,
    cell: (row, index, column, id) => (
      <>
    <Link to={"/admin-dashboard/Subject/"+row.id}> <span className="bi bi-pencil-square"></span></Link>
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



function SubjectList() {

  const [rowData,setRowData] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  let selectedItemId:number =0;

  useEffect(()=>{

    academicService.getAllSubjects().then(resp=>{
      if(resp && resp.status == 200)
      {
        setRowData(resp.data);
        setIsLoading(false);
      }
    })
    
  },[]);
  

 

  const onRowClicked = (row: Subject, e: React.MouseEvent<Element, MouseEvent>) => {
    console.log("row",row, e);
  }

  const onSelectedRowsChange = (selected: { allSelected: boolean; selectedCount: number; selectedRows: Subject[]}) => {
    console.log("selected",selected);
    if(selected && selected.selectedRows.length)
    selectedItemId = selected.selectedRows[0].id;
  }

  let toolbarParams:ToolbarParams = {
     ExportExcelSettings:{
      fileName:'teachers',
      dataSet:rowData,
      //excelColDefs:[{header:"ID",key:"id"},{header:"Title",key:"title"},{header:"Director",key:"director"}] //or
       excelColDefs: getExcelColDefs(columns) //or pass null or undefined to get automatic excel
    },
    ExportCSVSettings:{
      fileName:'teachers',
      dataSet: rowData,
      //header : [{label:"ID",key:"id"},{label:"Title",key:"title"},{label:"Director",key:"director"}] //or
    },
    ExportPDFSettings:{
      fileName:'teachers',
      dataSet:rowData,
      //header: [{label:"ID",key:"id"},{label:"Title",key:"title"},{label:"Director",key:"director"}] //or leave blank
      refPDF:undefined,
    },
    AddPageLink: '/admin-dashboard/teacher',
    EditPageLink: '/admin-dashboard/teacher/'+selectedItemId
    
  }

  let params: GridParams<Subject> = {
    gridTitle: "Teachers",
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
      isLoading ? <Loader/> : DataGrid<Subject>(params)
  );
}

export default SubjectList;


