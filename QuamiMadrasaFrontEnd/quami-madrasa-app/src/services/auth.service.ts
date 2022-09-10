import axios from "axios";
const API_URL = "https://localhost:7291/api/Account/";
class AuthService {
  login(username: any, password: any) {
    return axios
      .post(API_URL + "Authenticate", {
        Username:username,
        Password:password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user_token", JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user_token");
  }
  register(username: any, email: any, password: any) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user_token') as string)?.user;
  }
  getCurrentUserToken() {
    return JSON.parse(localStorage.getItem('user_token') as string);
  }

  getUserDashboardPath():string{
    let user = JSON.parse(localStorage.getItem('user_token') as string)?.user;
    if(user)
    {
      if(user.roles && user.roles.includes("Admin"))
      {
          return '/admin-dashboard';
      }
      else if(user.roles && user.roles.includes("Teacher"))
      {
          return '/teacher-dashboard';
      }
      else if(user.roles && user.roles.includes("Accountant"))
      {
          return '/account-dashboard';
      }
      else{
        return '/profile';
      }
    }
    else
    {
      return '/profile';
    }
  }
}
export default new AuthService();