import React, { Component, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import studentService from '../../../services/student.service';
import { useFormik } from 'formik';

const StudentForm = () => {
    const [classList, setclassNameList] = useState([]);
    const [sectionList, setSectionList] = useState([]);

    useEffect(() => {
        studentService.getAllClasses().then(resp => {
            setclassNameList(resp.data);
        });

        studentService.getAllSections().then(resp => {
            setSectionList(resp.data);
        });
    }, []);



    const formik = useFormik({
        initialValues: {
            myClassId: 0,
            fullName: '',
            sectionId: 0,
            admNo: '',
            myParentId: null,
            hostelId: null,
            hostelRoomNo: '',
            session: '',
            attendenceStatus:'P',
            house: '',
            age: 0,
            yearAdmitted: '',
            guardian : {
                fullName:'',
                mobileNo:'',
                relationship:'',
                address:''
            }
        },
        onSubmit: values => {
            //alert(JSON.stringify(values, null, 2));
            studentService.addStudent(values).then(resp => {
                console.log('successfully saved', resp.data);
            });
        },
    });


    return (
        <>
            <Container>
                <div className="col-md-7 col-lg-8 mt-3">
                    <h4 className="mb-3">শিক্ষার্থীর তথ্য</h4>
                    <form onSubmit={formik.handleSubmit} className="needs-validation" noValidate>
                        <div className="row g-3">
                            <div className="col-sm-6">
                                <label htmlFor="firstName" className="form-label">শিক্ষার্থীর নাম</label>
                                <input type="text" name='fullName' className="form-control" onChange={formik.handleChange} id="firstName" value={formik.values.fullName} />
                            </div>

                            <Form.Group className="mb-3 col-md-6">
                                    <Form.Label>জামাত</Form.Label>
                                    <Form.Select name='myClassId' aria-label="Default select example" onChange={formik.handleChange}
                                        value={formik.values.myClassId}>
                                        <option>Please Select </option>
                                        {
                                            classList.map((v: any, i: number) => {
                                                return <option key={i + '_cls'} value={v.id}>{v.name}</option>
                                            })
                                        }

                                    </Form.Select>
                                </Form.Group>

                            <Form.Group className="mb-3 col-sm-6" controlId="formBasicPassword">
                                <Form.Label>ফরম নং</Form.Label>
                                <Form.Control name='admNo' type="text" placeholder="adm no" onChange={formik.handleChange}
                                    value={formik.values.admNo} />
                            </Form.Group>

                            <Form.Group className="mb-3 col-sm-6" controlId="formBasicPassword">
                                <Form.Label>বোর্ডিং নং</Form.Label>
                                <Form.Control name='hostelRoomNo' type="text" placeholder="room no" onChange={formik.handleChange}
                                    value={formik.values.hostelRoomNo} />
                            </Form.Group>


                            <Form.Group className="mb-3 col-sm-6" >
                                <Form.Label>অভিভাবকের নাম</Form.Label>
                                <Form.Control type="text" name='guardian.fullName' onChange={formik.handleChange}
                                    value={formik.values.guardian.fullName} />
                            </Form.Group>
                            <Form.Group className="mb-3 col-sm-6" >
                                <Form.Label>সম্পর্ক</Form.Label>
                                <Form.Control type="text" name='guardian.relationship' onChange={formik.handleChange}
                                    value={formik.values.guardian.relationship} />
                            </Form.Group>

                            <Form.Group className="mb-3 col-sm-6" controlId="formBasicPassword334">
                                <Form.Label>মোবাইল নং</Form.Label>
                                <Form.Control type="text" name='guardian.mobileNo' onChange={formik.handleChange}
                                    value={formik.values.guardian.mobileNo} />
                            </Form.Group>
                            <Form.Group className="mb-3 col-sm-6" >
                                <Form.Label>ঠিকানা</Form.Label>
                                <Form.Control type="text" name='guardian.address' onChange={formik.handleChange}
                                    value={formik.values.guardian.address} />
                            </Form.Group>
                        </div>

                        <button className="w-100 btn btn-primary btn-lg" type="submit">সংরক্ষণ করুন</button>
                    </form>
                </div>

            </Container>
        </>
    );
}


export default StudentForm;