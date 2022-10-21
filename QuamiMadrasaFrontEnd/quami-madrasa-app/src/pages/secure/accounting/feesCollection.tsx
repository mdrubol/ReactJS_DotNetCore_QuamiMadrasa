import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import toastr from 'toastr';
import { Formik, useFormik } from 'formik';
import academicService from "../../../services/academic.service";
import studentService from '../../../services/student.service';
import accountingService from '../../../services/accounting.service';
import './feesCollection.css';




const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm: number = today.getMonth() + 1; // Months start at 0!
    let dd: number = today.getDate();
    let d = '';
    let m = '';

    if (dd < 10)
        d = '0' + dd;
    if (mm < 10)
        m = '0' + mm;

    const formattedToday = dd + '/' + mm + '/' + yyyy;

    return formattedToday;
}
const FeesCollection = () => {

    const [jamatRowData, setJamatRowData] = useState([]);
    const [studentData, setStudentData] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState({} as any);
    const [total, setTotal] = useState(0);

    useEffect(() => {

        academicService.getAllClasses().then(resp => {
            if (resp && resp.status == 200) {
                setJamatRowData(resp.data);
            }
        })

    }, []);

    const formik = useFormik({
        initialValues: {
            myClassId: 0,
            jamat: '',
            formNo: 0,
            fullName: '',
            admissionFee: 0,
            reAdmissionFee: 0,
            salaryFee: 0,
            transportFee: 0,
            examFee: 0,
            charecterCertFee: 0,
            tcFee: 0,
            generatorFee: 0,
            date: getTodayDate(),
            etc: 0,
            total: 0
        },
        onSubmit: values => {
            console.log(JSON.stringify(values, null, 2));
            values.total = total;
            accountingService.saveFeesCollection(values).then((resp: any) => {
                console.log('saved successfully');
                toastr.success('Saved Successfully!', "Success", { timeOut: 5000, "closeButton": false, });
            });
        },
    });

    const onJamatChange = (event: any) => {
        studentService.getStudentsByClassId(event.target.value).then((resp: any) => {
            setStudentData(resp.data);
        });
    }

    const onSelectStudent = (selectedStu: any) => {
        formik.values.fullName = selectedStu.fullName;
        formik.values.myClassId = selectedStu.myClassId;
        formik.values.formNo = selectedStu.admNo;
        formik.values.jamat = (jamatRowData.find((p: any) => p.id == selectedStu.myClassId) as any).name;
        setSelectedStudent(selectedStu);
    }

    const handleOnBlur = (e: any) => {
        console.log(e.currentTarget.value);
        let total = Number(formik.values.admissionFee) + Number(formik.values.charecterCertFee)
            + Number(formik.values.etc) + Number(formik.values.examFee) +
            Number(formik.values.generatorFee) + Number(formik.values.reAdmissionFee) +
            Number(formik.values.salaryFee) + Number(formik.values.tcFee) +
            Number(formik.values.transportFee);

        setTotal(total);
    }

    return (
        <>
            <div className="row">
                <p>বেতন/অন্যান্য ফি আদায় রশিদ</p>
                <hr />
                <div className="col-md-5 col-lg-4">
                    <select className="form-select" name="jamat" onChange={onJamatChange} id="ddljamat" required>
                        <option value="undefined">--জামাত--</option>
                        {
                            jamatRowData.map((jamat: any) => {
                                return <option key={jamat.id + '_key'} id={jamat.id} value={jamat.id}>{jamat.name}</option>
                            })
                        }
                    </select>

                    <div className="list-group mx-0 w-auto mt-3 scrollable">
                        {
                            studentData.map((st: any, index: number) => {
                                return <label key={index + 'st.name'} onClick={() => onSelectStudent(st)} className={"list-group-item d-flex gap-2 " + (st.admNo == selectedStudent.admNo ? "active" : "")}>
                                    <span>
                                        {st.admNo}
                                        <small className="d-block">{st.fullName}</small>
                                    </span>
                                </label>
                            })


                        }

                    </div>
                </div>
                <div className="col-md-7 col-lg-8">
                    <form onSubmit={formik.handleSubmit} className="needs-validation" noValidate>
                        <div className="row g-3">
                            <div className="col-sm-6">
                                <label htmlFor="firstName" className="form-label">শিক্ষার্থীর নাম</label>
                                <input type="text" onChange={formik.handleChange} disabled className="form-control" id="firstName" value={formik.values.fullName} required />
                            </div>

                            <div className="col-sm-6">
                                <label htmlFor="lastName" className="form-label">তারিখ</label>
                                <input type="text" onChange={formik.handleChange} className="form-control" value={formik.values.date} required />
                            </div>

                            <div className="col-sm-6">
                                <label htmlFor="firstName" className="form-label">জামাত</label>
                                <input type="text" onChange={formik.handleChange} disabled className="form-control" value={formik.values.jamat} required />
                            </div>

                            <input type="hidden" value={formik.values.myClassId} />

                            <div className="col-sm-6">
                                <label htmlFor="lastName" className="form-label">ফরম নং</label>
                                <input type="text" onChange={formik.handleChange} disabled className="form-control" value={formik.values.formNo} required />
                            </div>

                        </div>

                        <hr className="my-4" />
                        <Table striped bordered responsive size="sm">
                            <thead>
                                <tr>
                                    <th>ক্রমিক নং.</th>
                                    <th>বিবরণ</th>
                                    <th>টাকা</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>১</td>
                                    <td>ভর্তি ফরম</td>
                                    <td><input type="text" name='admissionFee' value={formik.values.admissionFee} onBlur={(e) => handleOnBlur(e)} onChange={formik.handleChange} /></td>
                                </tr>
                                <tr>
                                    <td>২</td>
                                    <td>ভর্তি/পুনঃ ভর্তি ফি </td>
                                    <td><input type="text" name='reAdmissionFee' value={formik.values.reAdmissionFee} onBlur={(e) => handleOnBlur(e)} onChange={formik.handleChange} /></td>
                                </tr>
                                <tr>
                                    <td>৩</td>
                                    <td>বেতন </td>
                                    <td><input type="text" name='salaryFee' value={formik.values.salaryFee} onBlur={(e) => handleOnBlur(e)} onChange={formik.handleChange} /></td>
                                </tr>
                                <tr>
                                    <td>৪</td>
                                    <td>পরিবহন ভাড়া </td>
                                    <td><input type="text" name='transportFee' value={formik.values.transportFee} onBlur={(e) => handleOnBlur(e)} onChange={formik.handleChange} /></td>
                                </tr>
                                <tr>
                                    <td>৫</td>
                                    <td>পরীক্ষার ফি /পাঠোন্নতির বিবরণ</td>
                                    <td><input type="text" name='examFee' value={formik.values.examFee} onBlur={(e) => handleOnBlur(e)} onChange={formik.handleChange} /></td>
                                </tr>
                                <tr>
                                    <td>৬</td>
                                    <td>সনদ/প্রশংসা পত্র </td>
                                    <td><input type="text" name='charecterCertFee' value={formik.values.charecterCertFee} onBlur={(e) => handleOnBlur(e)} onChange={formik.handleChange} /></td>
                                </tr>
                                <tr>
                                    <td>৭</td>
                                    <td>টি সি /প্রত্যয়ন পত্র </td>
                                    <td><input type="text" onBlur={(e) => handleOnBlur(e)} name='tcFee' value={formik.values.tcFee} onChange={formik.handleChange} /></td>
                                </tr>
                                <tr>
                                    <td>৮</td>
                                    <td>বিদ্যুৎ /জেনারেটর </td>
                                    <td><input type="text" onBlur={(e) => handleOnBlur(e)} name='generatorFee' value={formik.values.generatorFee} onChange={formik.handleChange} /></td>
                                </tr>
                                <tr>
                                    <td>৯</td>
                                    <td>বিবিধ</td>
                                    <td><input type="text" onBlur={(e) => handleOnBlur(e)} name='etc' value={formik.values.etc} onChange={formik.handleChange} /></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>সর্বমোট</td>
                                    <td className='fw-bold'>{total} টাকা </td>
                                </tr>
                            </tbody>
                        </Table>

                        <hr className="my-4" />

                        <button className="w-100 btn btn-primary btn-lg" type="submit">সংরক্ষণ করুন </button>
                    </form>
                </div>
            </div>
        </ >
    );
};

export default FeesCollection;