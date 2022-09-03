import React, { Component } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

export default class Login extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);


    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }
  onChangeUsername(e: { target: { value: any; }; }) {
    this.setState({
      username: e.target.value
    });
  }
  onChangePassword(e: { target: { value: any; }; }) {
    this.setState({
      password: e.target.value
    });
  }
  handleLogin(e: { preventDefault: () => void; }) {
    e.preventDefault();
    this.setState({
      message: "",
      loading: true
    });


    AuthService.login(this.state.username, this.state.password).then(
      () => {
        window.location.replace("/profile");
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        this.setState({
          loading: false,
          message: resMessage
        });
      }
    );

  }
  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>
          <div className="form-group">
            <button
              className="btn btn-primary btn-block mt-3"
              disabled={this.state.loading}
              onClick={this.handleLogin}
            >
              {this.state.loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>
          {this.state.message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {this.state.message}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}