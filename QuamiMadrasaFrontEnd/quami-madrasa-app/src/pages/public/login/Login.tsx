import React, { Component, FormEvent } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../login/Login.css";
import { Link } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import { useNavigate } from "react-router-dom";

interface LoginForm{
  username: string,
  password: string,
  loading: boolean,
  message: string
}

 export default function Login() {

  let navigate = useNavigate();
  let [error, setError] = React.useState(null);

  const handleLogin = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget),
          formDataObj = Object.fromEntries(formData.entries())
    console.log("submitted",formDataObj)

    AuthService.login(formDataObj.username,formDataObj.password).then(
      () => {
          setError(null);
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
             
          setError(resMessage);
      }
    );

    if(error == null)
    {
      navigate(AuthService.getUserDashboardPath(), { replace: true });
    }

  }

  return (
    <div className="container py-3">
      <Card className="login-panel">
        <div className="login-image">
          <i className="bi bi-shield-lock"></i>
        </div>
        <Card.Body className="py-4">
          <Form onSubmit={handleLogin}>
            <InputGroup className="mb-3">
              <InputGroup.Text id="username">
                <i className="bi bi-person"></i>
              </InputGroup.Text>
              <Form.Control name="username" type="text"  placeholder="ব্যবহারকারীর নাম" />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="password">
                <i className="bi bi-lock"></i>
              </InputGroup.Text>
              <Form.Control name="password" type="password"  placeholder="পাসওয়ার্ড" />
            </InputGroup>
            <Button type="submit"  variant="primary">
              <i className="bi bi-patch-check"></i> লগইন
            </Button>
            <span className="mx-2 link">পাসওয়ার্ড ভুলে গেছেন?</span>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
  };