import React, { Component, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import studentService from '../../../services/student.service';
import { useFormik } from 'formik';

const StudentForm=() =>{
    const [classList,setClassList]  = useState([]);
    const [sectionList,setSectionList]  = useState([]);

    useEffect(() => {
        studentService.getAllClasses().then(resp=>{
            setClassList(resp.data);
        });
    
        studentService.getAllSections().then(resp=>{
            setSectionList(resp.data);
        });
    },[]);
    


    const formik = useFormik({
        initialValues: {
            myClassId: 0,
            sectionId: 0,
            admNo: '',
            myParentId: null,
            hostelId:null,
            hostelRoomNo:'',
            session:'',
            house:'',
            age:0,
            yearAdmitted:''
        },
        onSubmit: values => {
          //alert(JSON.stringify(values, null, 2));
          studentService.addStudent(values).then(resp=>{
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
                                    <Form.Select name='myClassId' aria-label="Default select example" onChange={formik.handleChange}
                                    value={formik.values.myClassId}>
                                        <option>Please Select </option>
                                        {
                                            classList.map((v:any,i:number)=>{
                                                return <option key={i+'_cls'} value={v.id}>{v.name}</option>
                                            })
                                        }
                                    
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Label>Section</Form.Label>
                                    <Form.Select name='sectionId' aria-label="Default select example" onChange={formik.handleChange}
                                    value={formik.values.sectionId}>
                                        <option>Please Select </option>
                                        {
                                            sectionList.map((v:any,i:number)=>{
                                                return <option key={i+'_sec'} value={v.id}>{v.name}</option>
                                            })
                                        }
                                    
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Adm No.</Form.Label>
                                    <Form.Control name='admNo' type="text" placeholder="adm no" onChange={formik.handleChange}
                                    value={formik.values.admNo}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Hostel Room No.</Form.Label>
                                    <Form.Control name='hostelRoomNo' type="text" placeholder="room no" onChange={formik.handleChange}
                                    value={formik.values.hostelRoomNo}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Session.</Form.Label>
                                    <Form.Control type="text" name='session' placeholder="session" onChange={formik.handleChange}
                                    value={formik.values.session}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control type="number" name='age' placeholder="age" onChange={formik.handleChange}
                                    value={formik.values.age}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Admitted Year</Form.Label>
                                    <Form.Control type="text" name='yearAdmitted' placeholder="admitted year" onChange={formik.handleChange}
                                    value={formik.values.yearAdmitted}/>
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


export default StudentForm;