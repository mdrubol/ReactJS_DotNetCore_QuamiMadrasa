import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'https://localhost:7291/api/Accounting/';

class AccountingService {
  
    getAllHeads() {
    return axios.get(API_URL + 'GetHeads', { headers: authHeader() });
  }

 

}
export default new AccountingService();