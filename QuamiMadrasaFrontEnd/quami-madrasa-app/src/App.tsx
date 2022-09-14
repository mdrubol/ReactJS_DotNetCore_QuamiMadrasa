import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import AuthService from "./services/auth.service";
import ClientsRoutes from "./routes/Routes";
import * as Icon from 'react-bootstrap-icons';
import { Navigate } from "react-router-dom";


class App extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = props = {
      showAdminBoard: false,
      showTeacherBoard: false,
      showAccountDashboard:false,
      currentUser: undefined
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("Admin"),
        showTeacherBoard: user.roles.includes("Teacher"),
        showAccountDashboard: user.roles.includes("Accountant")
      });
    }
  }
  logOut() {
    AuthService.logout();
    <Navigate to="/"/>
  }
  render() {
    return (
      <>
        <ClientsRoutes />
      </>
    );
  }
}
export default App;