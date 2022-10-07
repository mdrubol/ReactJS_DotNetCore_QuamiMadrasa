import React, { useState } from 'react';
import { Alert, Button, ButtonGroup, Card, Col, Container, Form, InputGroup, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import { CSVLink } from "react-csv";
import TablePDFExport from './TablePDFExport';
import domToPdf from 'dom-to-pdf';
import jsPDF, { jsPDFOptions } from 'jspdf';
import { useNavigate } from "react-router-dom";

const printPDF = (ref: React.ClassAttributes<HTMLDivElement> | React.LegacyRef<HTMLDivElement> | undefined) => {
    const element = ref as any;

    let options: jsPDFOptions = {};
    options.orientation = "p";
    options.unit = "px";
    options.format = "letter";
    let input: HTMLDivElement = element.current;

    const pdf = new jsPDF(options);
    pdf.html(input, { html2canvas: { scale: 0.57 } }).then(() => {
        pdf.save("test.pdf");
    });

};



export interface PDFHeader {
    label: string;
    key: string;
}
export interface ExportPDFParams {
    fileName: string;
    dataSet: any[];
    header?: PDFHeader[];
    refPDF: React.ClassAttributes<HTMLDivElement> | React.LegacyRef<HTMLDivElement> | undefined;
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
    AddPageLink:string;
    EditPageLink:string;
}

const getMaxCellWidth = (minWidth: number, data: any[], propertyName?: string) => {
    let maxWidth = minWidth + 5;
    if (propertyName) {
        data.forEach((row: any, i) => {
            if(row[propertyName])
            {
                let cellWidth = row[propertyName].toString().length;
                if (row[propertyName] && cellWidth > maxWidth) {
                    maxWidth = cellWidth + 5;
                }
            }

        });
    }


    return maxWidth;
}

export const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const workSheetName = 'Worksheet1';
const workBookName = 'WorkBook1';


function Toolbar(props: ToolbarParams) {

    const navigate = useNavigate();
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
        if (props.ExportPDFSettings.refPDF) {
            printPDF(props.ExportPDFSettings.refPDF);
        }

    }

    const onAddNewClicked = () => {
        if(props.AddPageLink)
        {
         navigate(props.AddPageLink);   
        }
    }

    const onEditClicked = () => {
        if(props.EditPageLink)
        {
         navigate(props.EditPageLink);   
        }
    }


    return (

        <>
            <Container >
                <Row className='cursor'>
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
                                        <Button onClick={onAddNewClicked} className='btn-space btn-primary'> <span className="bi bi-file-earmark-plus"></span></Button>
                                    </OverlayTrigger>

{/*                                     <OverlayTrigger
                                        key="top-2"
                                        placement="top"
                                        overlay={
                                            <Tooltip id={'tooltip-edit'}>
                                                Edit
                                            </Tooltip>
                                        }
                                    >
                                        <Button onClick={onEditClicked} className='btn-space btn-info'> <span className="bi bi-pencil-square"></span></Button>
                                    </OverlayTrigger>
 */}
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
                                        <Button onClick={onPDFExportClick} className='btn-space btn-success'> <span className="bi bi-file-earmark-pdf"></span></Button>
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
                    </Col>
                </Row>
                {<Row style={{visibility:'collapse',cursor:'pointer'}}>
                    <Col md="12">
                        <TablePDFExport exportPDFSettings={props.ExportPDFSettings} />
                    </Col>
                </Row>}
            </Container>
        </>
    );
}

export default Toolbar;

