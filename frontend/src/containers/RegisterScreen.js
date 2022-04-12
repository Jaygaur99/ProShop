import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader/Loader";
import Message from "../components/Message/Message";
import FormContainer from "../components/FormContainer/FormContainer";
import { register } from "../actions/userActions";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Password and Confirm Password must be same");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label> Confirm Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Have an Account?
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Sign In
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
