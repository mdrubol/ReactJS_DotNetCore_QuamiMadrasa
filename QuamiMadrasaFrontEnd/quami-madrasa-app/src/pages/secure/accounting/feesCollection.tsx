import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import academicService from "../../../services/academic.service";
import './feesCollection.css';

const FeesCollection = () => {

    const [jamatRowData, setJamatRowData] = useState([]);

    useEffect(() => {

        academicService.getAllClasses().then(resp => {
            if (resp && resp.status == 200) {
                setJamatRowData(resp.data);
            }
        })

    }, []);

    return (
        <div>
            <div className="row g-5">
                <div className="col-md-5 col-lg-4 order-md-last">
                    <form className="p-4 p-md-5 border rounded-3 bg-light">
                        <div className="mb-3">
                            <label htmlFor="country" className="form-label">জামাত</label>
                            <select className="form-select" id="country" required>
                                {
                                    jamatRowData.map((jamat: any) => {
                                        return <option id={jamat.id}>{jamat.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="zip" className="form-label">ফরম নং</label>
                            <input type="text" className="form-control" id="zip" placeholder="" required />
                        </div>
                        <button className="w-100 btn btn-lg btn-primary" type="submit">খুঁজুন</button>
                    </form>
                </div>
                <div className="col-md-7 col-lg-8">
                    <h4 className="mb-3">বেতন/অন্যান্য ফি আদায় রশিদ</h4>
                    <form className="needs-validation" noValidate>
                        <div className="row g-3">
                            <div className="col-sm-6">
                                <label htmlFor="firstName" className="form-label">শিক্ষার্থীর নাম</label>
                                <input type="text" disabled className="form-control" id="firstName" placeholder="" value="" required />
                            </div>

                            <div className="col-sm-6">
                                <label htmlFor="lastName" className="form-label">তারিখ</label>
                                <input type="text" className="form-control" id="lastName" placeholder="" value="" required />
                            </div>

                            <div className="col-sm-6">
                                <label htmlFor="firstName" className="form-label">জামাত</label>
                                <input type="text" disabled className="form-control" id="firstName" placeholder="" value="" required />
                            </div>

                            <div className="col-sm-6">
                                <label htmlFor="lastName" className="form-label">ফরম নং</label>
                                <input type="text" disabled className="form-control" id="lastName" placeholder="" value="" required />
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
                                    <td><input type="number" name=''/></td>
                                </tr>
                                <tr>
                                    <td>২</td>
                                    <td>ভর্তি/পুনঃ ভর্তি ফি </td>
                                    <td><input type="number" name=''/></td>
                                </tr>
                                <tr>
                                    <td>৩</td>
                                    <td>বেতন </td>
                                    <td><input type="number" name=''/></td>
                                </tr>
                                <tr>
                                    <td>৪</td>
                                    <td>পরিবহন ভাড়া </td>
                                    <td><input type="number" name=''/></td>
                                </tr>
                                <tr>
                                    <td>৫</td>
                                    <td>পরীক্ষার ফি /পাঠোন্নতির বিবরণ</td>
                                    <td><input type="number" name=''/></td>
                                </tr>
                                <tr>
                                    <td>৬</td>
                                    <td>সনদ/প্রশংসা পত্র </td>
                                    <td><input type="number" name=''/></td>
                                </tr>
                                <tr>
                                    <td>৭</td>
                                    <td>টি সি /প্রত্যয়ন পত্র </td>
                                    <td><input type="number" name=''/></td>
                                </tr>
                                <tr>
                                    <td>৮</td>
                                    <td>বিদ্যুৎ /জেনারেটর </td>
                                    <td><input type="number" name=''/></td>
                                </tr>
                            </tbody>
                        </Table>

                        <hr className="my-4" />

                        <button className="w-100 btn btn-primary btn-lg" type="submit">সংরক্ষণ করুন </button>
                    </form>
                </div>
            </div>
        </div >
    );
};

export default FeesCollection;