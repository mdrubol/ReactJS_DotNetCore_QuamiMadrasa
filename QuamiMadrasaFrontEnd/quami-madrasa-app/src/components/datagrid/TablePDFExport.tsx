import React, { useEffect, useRef, useState } from 'react';
import { capitalizeFirstLetter, ExportPDFParams, PDFHeader } from './Toolbar';
import * as _ from 'underscore';
import parse from 'html-react-parser';
import './TablePDFExport.css';


const CreateTable= (tableRows:any[],pdfHeaderData:PDFHeader[]):string =>
{
    let tableBody = "";
    if(tableRows && tableRows.length && tableRows[0].title)
    {
        for(let i=0; i< tableRows.length ; i++)
        {
            let thisObj = tableRows[i];
            
            tableBody +="<tr>";
            for(let j=0;j<pdfHeaderData.length;j++)
            {
                let val = tableRows[i][pdfHeaderData[j].key];
                tableBody += `<td>${val}</td>`;
            }
            tableBody +="</tr>";
        }
    }
    



    return tableBody;
}

function TablePDFExport(props: {exportPDFSettings:ExportPDFParams}) {
    const fileName = props.exportPDFSettings.fileName;
    const divToPrintPDF = useRef(null);
    const dataSet = props.exportPDFSettings.dataSet;
    const [pdfHead, SetPdfHead] = useState([] as PDFHeader[]);
    const [rows, setRows] = useState([] as any[]);
    const [body,setBody] = useState('');

    let pdfHeaderData: PDFHeader[] = [];


        if (props?.exportPDFSettings.header) {
            pdfHeaderData = props?.exportPDFSettings.header;
        }
        else {
            if(dataSet && dataSet.length)
            {
                let keys: string[] = Object.keys(props.exportPDFSettings.dataSet[0]);
                keys.forEach(k => {
                    let pdfHeader: PDFHeader = { label: capitalizeFirstLetter(k), key: k };
                    pdfHeaderData.push(pdfHeader);
                });
        
            }

        }
    


    let tableRows: any[] = [];

    if (dataSet && dataSet.length) {
        let keys: string[] = Object.keys(props.exportPDFSettings.dataSet[0]);

        if (pdfHead.length == keys.length) {
            tableRows = dataSet;
        }
        else {
            props.exportPDFSettings.dataSet.forEach((row) => {
                let newRow = _.pick(row, _.pluck(pdfHead, 'key'));
                tableRows.push(newRow);
            });

        }

       
    }

    useEffect(() => {
        setRows(tableRows);
        SetPdfHead(pdfHeaderData);
        setBody(CreateTable(tableRows,pdfHeaderData));

        if(divToPrintPDF)
        {
           props.exportPDFSettings.refPDF = divToPrintPDF;
        }
        
    },[]);

    
    


    return (
        
        <>
            <div  id='divToPrintPDF' ref={divToPrintPDF} >
                <table className="table table-striped table-responsive">
                    <thead>
                        <tr>
                            {
                                pdfHead.map((header: PDFHeader, index: number) => {
                                    return (
                                        <th key={index.toString()+"_key"}>{header.label}</th>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody> 
                       {
                           parse(body)
                       }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default TablePDFExport;