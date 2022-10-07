import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.css";
import Toolbar, { ToolbarParams } from "./Toolbar";
import { Stack } from "react-bootstrap";

export interface GridParams<T> {
  gridTitle: string;
  defaultSortFieldId: number;
  pagination: boolean;
  data: T[];
  columnDefs: TableColumn<T>[];
  selectableRows: boolean;
  paginationPerPage: number;
  selectableRowsSingle: boolean;
  paginationRowsPerPageOptions: number[];
  toolbarParams:ToolbarParams;
  onRowClicked: ((row: T, e: React.MouseEvent<Element, MouseEvent>) => void) | undefined;
  onSelectedRowsChange: ((selected: { allSelected: boolean; selectedCount: number; selectedRows: T[]; }) => void) | undefined;
}

function DataGrid<T>(props: GridParams<T>) {
  return (
    <>
      <Stack gap={1} >
        <Toolbar AddPageLink={props.toolbarParams.AddPageLink} EditPageLink={props.toolbarParams.EditPageLink} ExportExcelSettings={props.toolbarParams.ExportExcelSettings} ExportCSVSettings={props.toolbarParams.ExportCSVSettings} ExportPDFSettings={props.toolbarParams.ExportPDFSettings} />
        <DataTable
          title={props.gridTitle}
          columns={props.columnDefs}
          data={props.data}
          defaultSortFieldId={props.defaultSortFieldId}
          pagination={props.pagination}
          selectableRows={props.selectableRows}
          paginationPerPage={props.paginationPerPage}
          onRowClicked={props.onRowClicked}
          onSelectedRowsChange={props.onSelectedRowsChange}
          paginationRowsPerPageOptions={props.paginationRowsPerPageOptions}
          striped={true}
          dense={true}
          selectableRowsSingle={true}
          selectableRowsHighlight={true}
          responsive={true}
          noHeader={true}
        />
      </Stack>

    </>
  );
};

export default DataGrid;
