import axios from 'axios';
import authHeader from './auth-header';


const API_URL = 'https://localhost:7291/api/student/';

class StudentService {
  
  getAllStudents() {
    return axios.get(API_URL + 'GetStudents', { headers: authHeader() });
  }

  getStudentsByClassId(classId:number)
  {
    return axios.get(API_URL + 'GetStudentsByClassId?classId='+classId, { headers: authHeader() });
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

  updateStudent(data:any) {
    return axios.put(API_URL + 'UpdateStudent',data, { headers: authHeader() });
  }

}
export default new StudentService();