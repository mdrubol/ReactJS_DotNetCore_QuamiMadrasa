import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'https://localhost:7291/api/student/';

class StudentService {
  
  getAllStudents() {
    return axios.get(API_URL + 'GetStudents', { headers: authHeader() });
  }

  getAllClasses() {
    return axios.get(API_URL + 'GetClasses', { headers: authHeader() });
  }

  getAllSections() {
    return axios.get(API_URL + 'GetSections', { headers: authHeader() });
  }

  
  addStudent(data:any) {
    return axios.post(API_URL + 'CreateStudent',data, { headers: authHeader() });
  }

}
export default new StudentService();