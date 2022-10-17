import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'https://localhost:7291/api/student/';

class AcademicService {
  

  getAllClasses() {
    return axios.get(API_URL + 'GetClasses', { headers: authHeader() });
  }

  getAllSections() {
    return axios.get(API_URL + 'GetSections', { headers: authHeader() });
  }

  getAllSubjects() {
    return axios.get(API_URL + 'GetSubjects', { headers: authHeader() });
  }

  
  addSubject(data:any) {
    return axios.post(API_URL + 'CreateSubject',data, { headers: authHeader() });
  }

  updateSubject(data:any) {
    return axios.put(API_URL + 'UpdateSubject',data, { headers: authHeader() });
  }

  addSection(data:any) {
    return axios.post(API_URL + 'CreateSection',data, { headers: authHeader() });
  }

  updateSection(data:any) {
    return axios.put(API_URL + 'UpdateSection',data, { headers: authHeader() });
  }

  addClass(data:any) {
    return axios.post(API_URL + 'CreateClass',data, { headers: authHeader() });
  }

  updateClass(data:any) {
    return axios.put(API_URL + 'UpdateClass',data, { headers: authHeader() });
  }

}
export default new AcademicService();