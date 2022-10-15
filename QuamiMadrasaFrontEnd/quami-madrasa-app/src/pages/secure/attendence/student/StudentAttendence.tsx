import React, { useEffect, useState } from "react";
import studentService from "../../../../services/student.service";
import { Button, Card, Col, Container, Form, InputGroup, ListGroup, Row, Stack } from "react-bootstrap";
import Student from "../../../../models/student.model";
import Loader from "../../../../components/loader/Loader";
import './StudentAttendence.css';

function StudentAttendence(props: any) {
  const [rowData, setRowData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    studentService.getAllStudents().then(resp => {
      if (resp && resp.status == 200) {
        if(resp.data && resp.data.length)
        {
          let arr:[] = resp.data;
          arr.forEach((v:any,index:number)=>{
              v.attendenceStatus = 'P';
              v.isDirty = false;
          });
          
          setRowData(arr);
        }
        else{
          setRowData(resp.data);
        }

        setIsLoading(false);
      }
    })

  }, []);

  const handleClickOnCard = (index:number) => {
    let arr:any[] = [];
    rowData.forEach((v:any,i:number)=>{
      if(i==index)
        v.isDirty = true;

        let item = Object.assign({},v);
        arr.push(item);
    });
  
    setRowData(arr as []);
  }


  return (
    <Form className="mt-3">
      <div className="d-flex align-content-start flex-wrap">
        {
          rowData.map((st: any, index: number) => {
            return (
              <Card className="custom-card mr-3" key={index+'_card'} style={{ width: '12rem' }}>
                <Card.Body onClick={(event:any) =>{
                handleClickOnCard(index)
              }} className={`${st.isDirty ? 'dirty' : ''}`}>
                  <Card.Title>{st.admNo}</Card.Title>
                  <Card.Subtitle className="mb-2">{st.fullName? st.fullName : 'No Name'}</Card.Subtitle>
                  <Form.Check inline label="P" name={`regNo_${st.admNo}`} type="radio" defaultChecked={st.attendenceStatus === 'P'} value="P" id={`inline-radio-${index}`}/>
                  <Form.Check inline label="A" name={`regNo_${st.admNo}`} type="radio" defaultChecked={st.attendenceStatus === 'A'}  value="A" id={`inline-radio-${index}`}/>
                  <Form.Check inline label="L" name={`regNo_${st.admNo}`} type="radio" defaultChecked={st.attendenceStatus === 'L'}  value="L" id={`inline-radio-${index}`}/>
                </Card.Body>
              </Card>
            )
          })
        }
      </div>
    </Form>
  );
}

export default StudentAttendence;