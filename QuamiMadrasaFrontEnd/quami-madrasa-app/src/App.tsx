import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import AuthService from "./services/auth.service";
import ClientsRoutes from "./routes/Routes";


class App extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = props = {
      showModeratorBoard: false,
      showAdminBoard: false,
      showAccountDashboard:false,
      currentUser: undefined
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("Teacher"),
        showAdminBoard: user.roles.includes("Admin"),
        showAccountDashboard: user.roles.includes("Accountant")
      });
    }
  }
  logOut() {
    AuthService.logout();
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