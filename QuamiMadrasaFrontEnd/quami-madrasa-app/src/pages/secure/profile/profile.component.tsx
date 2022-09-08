import React, { Component } from "react";
import AuthService from "../../../services/auth.service";
export default class Profile extends React.Component<any,any> {
  constructor(props:any) {
    super(props);
    this.state = {
      user_token: AuthService.getCurrentUserToken()
    };
  }
  render() {
    const { user_token } = this.state;
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{user_token.user.userName}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong>{" "}
          {user_token.accessToken.substring(0, 20)} ...{" "}
          {user_token.accessToken.substr(user_token.accessToken.length - 20)}
        </p>
        <p>
          <strong>Id:</strong>{" "}
          {user_token.user.userId}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {user_token.user.email}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {user_token.user.roles &&
            user_token.user.roles.map((role:string, index:number) => <li key={index}>{role}</li>)}
        </ul>
      </div>
    );
  }
}