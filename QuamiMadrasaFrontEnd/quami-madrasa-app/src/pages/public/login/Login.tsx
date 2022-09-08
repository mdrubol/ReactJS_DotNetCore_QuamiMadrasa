import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../login/Login.css";
import { Link } from "react-router-dom";
import AuthService from "../../../services/auth.service";
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
        let navigate = useNavigate();
        navigate("/profile", { replace: true });
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
    <div className="container py-3">
      <Card className="login-panel">
        <div className="login-image">
          <i className="bi bi-shield-lock"></i>
        </div>
        <Card.Body className="py-4">
          <Form>
            <InputGroup className="mb-3">
              <InputGroup.Text id="username">
                <i className="bi bi-person"></i>
              </InputGroup.Text>
              <Form.Control name="username" placeholder="Username" />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="password">
                <i className="bi bi-lock"></i>
              </InputGroup.Text>
              <Form.Control name="password" placeholder="Password" />
            </InputGroup>
          </Form>
          <div className="">
            <Button variant="primary">
              <i className="bi bi-patch-check"></i> Login
            </Button>
            <span className="mx-2 link">Forgot password?</span>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
  }
};