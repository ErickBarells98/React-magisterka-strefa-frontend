import React, { useState, useContext } from 'react';
import { Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import UserContext from '../../context/UserContext';


const Login = () => {

  const { login } = useContext(UserContext);
  const navigate = useNavigate();

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

    let result = await login(loginValues);

    if(!result){
      navigate("/");
    }
  }

  return (
    <div className="container-custom">
    <div className="form-container">
    <h2 style={{padding: 10, fontSize: 30}}>Zaloguj się.</h2>
    <hr className='hr--custom'/>
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
        <br />
        <div className="text-center">
        <button className="custom-button" style={{ width: "275px", marginBottom: 3}} onClick={handleSubmit}>Zaloguj</button>
        </div>
        <div>
        <span style={{color: "#737373", fontSize: 14, marginLeft: "16%"}}>Nie pamiętasz jeszcze hasla?</span> <Link to="/restore" className='a--custom' style={{ fontSize: 14, fontWeight: 600}}>Przypomnij</Link>
        <br/>
        <span style={{color: "#737373", fontSize: 14, marginLeft: "16%"}}>Nie masz jeszcze konta?</span> <Link to="/register" className='a--custom' style={{ fontSize: 14, fontWeight: 600}}>Zarejestruj</Link>
        </div>
    </Form>
    </div>
    </div>
  )
}

export default Login