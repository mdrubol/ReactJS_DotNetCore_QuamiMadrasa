import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'https://localhost:7291/api/Staff/';

class StaffService {
  
  getAllStaffs() {
    return axios.get(API_URL + 'GetStaffs', { headers: authHeader() });
  }

  getAllTeachers() {
    return axios.get(API_URL + 'GetAllTeachers', { headers: authHeader() });
  }
  
  addStaff(data:any) {
    return axios.post(API_URL + 'CreateStaff',data, { headers: authHeader() });
  }

  getEmployeeTypes() {
    return axios.get(API_URL + 'GetEmployeeTypes', { headers: authHeader() });
  }

}
export default new StaffService();