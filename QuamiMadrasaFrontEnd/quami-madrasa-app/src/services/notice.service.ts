import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'https://localhost:7291/api/Notice/';

class NoticeService {
  
  getAllNotices() {
    return axios.get(API_URL + 'GetNotices', { headers: authHeader() });
  }

  getActiveNotices() {
    return axios.get(API_URL + 'GetActiveNotices', { headers: authHeader() });
  }
  
  addNotice(data:any) {
    return axios.post(API_URL + 'CreateNotice',data, { headers: authHeader() });
  }

  updateNotice(data:any) {
    return axios.put(API_URL + 'UpdateNotice',data, { headers: authHeader() });
  }

}
export default new NoticeService();