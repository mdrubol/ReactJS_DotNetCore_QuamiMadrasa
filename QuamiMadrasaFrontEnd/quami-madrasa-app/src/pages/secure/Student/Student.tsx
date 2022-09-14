import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const products:any = [
    {id:1,name:"Anisuzzaman",price:0},
    {id:2,name:"Anis",price:0},
    {id:3,name:"Anisu",price:0},
    {id:4,name:"Anisuz",price:0},
    {id:5,name:"Anisuzza",price:0},
    {id:6,name:"Anisuzz",price:0},
];
const columns = [{
    dataField: 'id',
    text: 'Product ID'
}, {
    dataField: 'name',
    text: 'Product Name'
}, {
    dataField: 'price',
    text: 'Product Price'
}];


class Student extends Component {
    render() {
        return (
            <div>
                <BootstrapTable keyField='id' data={products} columns={columns} />
            </div>
        );
    }
}

export default Student;