import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader/Loader";
import Message from "../components/Message/Message";
import { getUserDetails } from "../actions/userActions";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!userDetails.user || !userDetails.user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(userDetails.user.name);
        setEmail(userDetails.user.email);
      }
    }
  }, [userInfo, navigate, dispatch, userDetails]);


  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Password and Confirm Password must be same");
    } else {
      console.log("UPDATUNG");
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
      </Col>

      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
