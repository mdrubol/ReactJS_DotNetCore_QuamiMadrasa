import React, { useState } from 'react';
import { Alert, Button, ButtonGroup, Card, Col, Container, Form, InputGroup, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import { CSVLink } from "react-csv";
import { TableColumn } from 'react-data-table-component';


export interface PDFHeader {
    label: string;
    key: string;
}
export interface ExportPDFParams {
    fileName: string;
    dataSet: any[];
    header?: PDFHeader[];
}

export interface DataColumn {
    header: string;
    key: string;
}

export interface ExportExcelParams {
    fileName: string;
    dataSet: any[];
    excelColDefs?: DataColumn[];
    onExportClick?: () => Promise<void>;
}

export interface CSVHeader {
    label: string;
    key: string;
}

export interface ExportCSVParams {
    fileName: string;
    dataSet: any[];
    header?: CSVHeader[];
}

export interface ToolbarParams {
    ExportExcelSettings: ExportExcelParams;
    ExportCSVSettings: ExportCSVParams;
    ExportPDFSettings: ExportPDFParams;
}

const getMaxCellWidth = (minWidth: number, data: any[], propertyName?: string) => {
    let maxWidth = minWidth + 5;
    if (propertyName) {
        data.forEach((row: any, i) => {
            let cellWidth = row[propertyName].toString().length;
            if (row[propertyName] && cellWidth > maxWidth) {
                maxWidth = cellWidth + 5;
            }
        });
    }


    return maxWidth;
}

const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const workSheetName = 'Worksheet1';
const workBookName = 'WorkBook1';


function Toolbar(props: ToolbarParams) {

    const workbook = new Excel.Workbook();

    const saveAsExcel = async () => {

        try {
            const fileName = props.ExportExcelSettings.fileName || workBookName;

            // creating one worksheet in workbook
            const worksheet = workbook.addWorksheet(workSheetName);

            // add worksheet columns
            // each columns contains header and its mapping key from data
            if (props.ExportExcelSettings?.excelColDefs && props.ExportExcelSettings.dataSet && props.ExportExcelSettings.dataSet.length) {
                worksheet.columns = props.ExportExcelSettings.excelColDefs;
            }
            else {
                let excelColDefs: DataColumn[] = [];
                let keys: string[] = Object.keys(props.ExportExcelSettings.dataSet[0]);
                keys.forEach(k => {
                    let columnDef: DataColumn = { header: capitalizeFirstLetter(k), key: k };
                    excelColDefs.push(columnDef);
                });

                worksheet.columns = excelColDefs;
            }


            // updated the font for first row.
            worksheet.getRow(1).font = { bold: true };

            // loop through all of the columns and set the alignment with width.
            worksheet.columns.forEach(column => {

                column.width = getMaxCellWidth(column && column.header ? (column.header as any).length + 5 : 10, props.ExportExcelSettings.dataSet, column.key);
                column.alignment = { horizontal: 'center' };

            });

            // loop through data and add each one to worksheet
            props.ExportExcelSettings.dataSet.forEach(singleData => {
                worksheet.addRow(singleData);
            });

            // loop through all of the rows and set the outline style.
            worksheet.eachRow({ includeEmpty: false }, row => {
                // store each cell to currentCell
                const currentCell = (row as any)._cells;

                // loop through currentCell to apply border only for the non-empty cell of excel
                currentCell.forEach((singleCell: any) => {
                    // store the cell address i.e. A1, A2, A3, B1, B2, B3, ...
                    const cellAddress = singleCell._address;

                    // apply border
                    worksheet.getCell(cellAddress).border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' }
                    };
                });
            });

            // write the content using writeBuffer
            const buf = await workbook.xlsx.writeBuffer();

            // download the processed file
            saveAs(new Blob([buf]), `${fileName}.xlsx`);
        } catch (error) {
            console.error('<<<ERRROR>>>', error);
            console.error('Something Went Wrong', (error as any).message);
        } finally {
            // removing worksheet's instance to create new one
            workbook.removeWorksheet(workSheetName);
        }
    };

    const onExcelExportClick = () => {
        if (props.ExportExcelSettings && props.ExportExcelSettings.dataSet
            && props.ExportExcelSettings.excelColDefs && props.ExportExcelSettings.fileName) {
            saveAsExcel();
        }
    }

    const [csvHead, SetCsvHead] = useState([] as CSVHeader[]);
    const [pdfHead, SetPdfHead] = useState([] as PDFHeader[]);
    const [rows,setRows] = useState([] as any[]);

    const onCSVExportClick = () => {
        const fileName = props.ExportCSVSettings.fileName;
        const dataSet = props.ExportCSVSettings.dataSet;

        if (props.ExportCSVSettings?.header) {
            SetCsvHead(props.ExportCSVSettings?.header);
        }
        else {
            let csvHeader: CSVHeader[] = [];
            let keys: string[] = Object.keys(props.ExportCSVSettings.dataSet[0]);
            keys.forEach(k => {
                let columnDef: CSVHeader = { label: capitalizeFirstLetter(k), key: k };
                csvHeader.push(columnDef);
            });

            SetCsvHead(csvHeader);
        }
    }

    const onPDFExportClick = () => {
        const fileName = props.ExportPDFSettings.fileName;
        const dataSet = props.ExportPDFSettings.dataSet;

        if (props.ExportPDFSettings?.header) {
            SetPdfHead(props.ExportPDFSettings?.header);
        }
        else {
            let pdfHeaders: PDFHeader[] = [];
            let keys: string[] = Object.keys(props.ExportPDFSettings.dataSet[0]);
            keys.forEach(k => {
                let pdfHeader: PDFHeader = { label: capitalizeFirstLetter(k), key: k };
                pdfHeaders.push(pdfHeader);
            });

            SetPdfHead(pdfHeaders);
        }

        if(dataSet && dataSet.length)
        {
            let keys: string[] = Object.keys(props.ExportPDFSettings.dataSet[0]);

            if(pdfHead.length == keys.length)
            {
                setRows(dataSet);
            }
            else{

                let tableRows:any[] = [];

                dataSet.map((r)=>{
                    //let row = {}
                })
            }
            
        }
    }

    return (
        <>
            <Container>
                <Row>
                    <Col sm={12}>
                        <div className="mt-2">

                            <nav className="navbar navbar-light" >
                                <div className='pull-left'>
                                    <InputGroup>
                                        <Form.Control
                                            placeholder="Filter records ..."
                                            aria-label="any keyword that matches in any records"
                                            aria-describedby="basic-addon2"
                                        />
                                        <InputGroup.Text id="basic-addon2">Search</InputGroup.Text>
                                    </InputGroup>
                                </div>
                                <ButtonGroup aria-label="Basic example" className='pull-right'>
                                    <OverlayTrigger
                                        key="top-1"
                                        placement="top"
                                        overlay={
                                            <Tooltip id={'tooltip-add'}>
                                                Add New
                                            </Tooltip>
                                        }
                                    >
                                        <Button className='btn-space btn-primary'> <span className="bi bi-file-earmark-plus"></span></Button>
                                    </OverlayTrigger>

                                    <OverlayTrigger
                                        key="top-2"
                                        placement="top"
                                        overlay={
                                            <Tooltip id={'tooltip-edit'}>
                                                Edit
                                            </Tooltip>
                                        }
                                    >
                                        <Button className='btn-space btn-info'> <span className="bi bi-pencil-square"></span></Button>
                                    </OverlayTrigger>

                                    <OverlayTrigger
                                        key="top-3"
                                        placement="top"
                                        overlay={
                                            <Tooltip id={'tooltip-delete'}>
                                                Delete
                                            </Tooltip>
                                        }
                                    >
                                        <Button className='btn-space btn-danger'> <span className="bi bi-trash3"></span></Button>
                                    </OverlayTrigger>


                                    <OverlayTrigger
                                        key="top-4"
                                        placement="top"
                                        overlay={
                                            <Tooltip id={'tooltip-pdf'}>
                                                Export As PDF
                                            </Tooltip>
                                        }
                                    >
                                        <Button className='btn-space btn-success'> <span className="bi bi-file-earmark-pdf"></span></Button>
                                    </OverlayTrigger>

                                    <OverlayTrigger
                                        key="top-5"
                                        placement="top"
                                        overlay={
                                            <Tooltip id={'tooltip-excel'}>
                                                Export As Excel
                                            </Tooltip>
                                        }
                                    >
                                        <Button onClick={onExcelExportClick} className='btn-space btn-success'> <span className="bi bi-file-earmark-excel"></span></Button>
                                    </OverlayTrigger>

                                    <OverlayTrigger
                                        key="top-6"
                                        placement="top"
                                        overlay={
                                            <Tooltip id={'tooltip-csv'}>
                                                Export As CSV
                                            </Tooltip>
                                        }
                                    >
                                        <Button className='btn-space btn-success'><CSVLink className='text-white' filename={props.ExportCSVSettings.fileName} data={props.ExportCSVSettings.dataSet} headers={csvHead} onClick={onCSVExportClick} ><span className="bi bi-filetype-csv"> </span></CSVLink></Button>
                                    </OverlayTrigger>
                                </ButtonGroup>
                            </nav>
                        </div>
                        <div>
                            <table className="table table-striped table-responsive">
                                <thead>
                                    {
                                        pdfHead.map((header:PDFHeader,index:number)=>{
                                            return (
                                                <th>{header.label}</th>
                                            )
                                        })
                                    }
                                    
                                </thead>
                                <tbody>
                                    <tr></tr>
                                </tbody>
                            </table>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Toolbar;