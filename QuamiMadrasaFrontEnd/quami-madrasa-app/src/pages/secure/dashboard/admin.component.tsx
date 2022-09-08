import React, { Component } from "react";
import UserService from "../../../services/user.service";
export default class BoardUser extends Component<any,any> {
  constructor(props:any) {
    super(props);
    this.state = {
      content: ""
    };
  }
  componentDidMount() {
    UserService.getAdminBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }
  render() {
    return (
      <div className="container py-3">
        <header className="page-title">
          <h3>{this.state.content}</h3>
        </header>
      </div>
    );
  }
}