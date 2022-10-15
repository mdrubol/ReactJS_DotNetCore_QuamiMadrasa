import React, { useEffect, useState } from "react";
import studentService from "../../../../services/student.service";
import { Button, Card, Col, Container, Form, InputGroup, ListGroup, Row, Stack } from "react-bootstrap";
import Student from "../../../../models/student.model";
import Loader from "../../../../components/loader/Loader";

function StudentAttendence(props: any) {
  const [rowData, setRowData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    studentService.getAllStudents().then(resp => {
      if (resp && resp.status == 200) {
        setRowData(resp.data);
        setIsLoading(false);
        console.log(resp.data);
      }
    })

  }, []);


  return (
    <Form className="mt-3">
      <div className="d-flex align-content-start flex-wrap">
        {
          rowData.map((st: any, index: number) => {
            return (
              <Card key={index+'_card'} style={{ width: '12rem' }}>
                <Card.Body>
                  <Card.Title>{st.admNo}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{st.fullName}</Card.Subtitle>
                  <Form.Check inline label="P" name="group1" type="radio" id={`inline-radio-${index}`}/>
                  <Form.Check inline label="A" name="group1" type="radio" id={`inline-radio-2`}/>
                  <Form.Check inline label="L" name="group1" type="radio" id={`inline-radio-3`}/>
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