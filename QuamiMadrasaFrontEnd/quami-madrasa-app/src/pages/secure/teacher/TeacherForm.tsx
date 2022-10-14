import React, { Component, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import staffService from '../../../services/staff.service';
import { useFormik } from 'formik';

const StaffForm=() =>{
    const [employeeTypeList,setEmployeeTypeList]  = useState([]);

    useEffect(() => {
        staffService.getEmployeeTypes().then(resp=>{
            setEmployeeTypeList(resp.data);
        });
    
    },[]);
    


    const formik = useFormik({
        initialValues: {
            id: 0,
            fullName:'',
            code:'',
            employeeTypeId:0,
            empDate:'',
            userId:0
        },
        onSubmit: values => {
          staffService.addStaff(values).then(resp=>{
                console.log('successfully saved',resp.data);
          });
        },
      });


        return (
            <>
                <Container>
                    <Row>
                        <Col md={6} >
                            <Form onSubmit={formik.handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Class</Form.Label>
                                    <Form.Select name='employeeTypeId' aria-label="Default select example" onChange={formik.handleChange}
                                    value={formik.values.employeeTypeId}>
                                        <option>Please Select </option>
                                        {
                                            employeeTypeList.map((v:any,i:number)=>{
                                                return <option key={i+'_empType'} value={v.id}>{v.name}</option>
                                            })
                                        }
                                    
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>FullName</Form.Label>
                                    <Form.Control name='fullName' type="text" placeholder="fullName" onChange={formik.handleChange}
                                    value={formik.values.fullName}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Code</Form.Label>
                                    <Form.Control name='code' type="text" placeholder="code" onChange={formik.handleChange}
                                    value={formik.values.code}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Emp Date</Form.Label>
                                    <Form.Control type="text" name='empDate' placeholder="empDate" onChange={formik.handleChange}
                                    value={formik.values.empDate}/>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                    </Row>

                </Container>
            </>
        );
    }


export default StaffForm;