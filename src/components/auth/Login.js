import React, { useState } from 'react';
import { Form, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { login } from "../../features/userSlice";

const Login = () => {

  const dispatch = useDispatch();

  const [loginValues, setLoginValues] = useState({
    email: "",
    password: ""
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginValues(pervValue => {
      return {...pervValue, [name]: value}
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login({ email: loginValues.email, password: loginValues.password }));
  }

  return (
    <div className="container-custom">
    <div className="form-container">
    <h2>Zaloguj się.</h2>
    <hr />
    <Form>
        <Form.Group controlId="form.Email">
            <Row>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" placeholder="Email" onChange={handleInputChange} value={loginValues.email}></Form.Control>
            </Row>
        </Form.Group>
        <Form.Group controlId="form.Login">
            <Row style={{marginBottom: 5}}>
                <Form.Label>Hasło</Form.Label>
                <Form.Control type="password" placeholder="Hasło" name="password" onChange={handleInputChange} value={loginValues.password}></Form.Control>
            </Row>
        </Form.Group>
        <div>
        <Link to="/restore" style={{color: "green", fontSize: 14, fontWeight: 600, marginLeft: "21%"}}>Zapomniałeś hasła?</Link>
        </div>
        
        <br />
        <div className="text-center">
        <button className="custom-button" style={{ width: "275px"}} onClick={handleSubmit}>Zaloguj</button>
        </div>
    </Form>
    </div>
    </div>
  )
}

export default Login