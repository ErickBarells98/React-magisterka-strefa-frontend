import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Row, ListGroup, ListGroupItem } from 'react-bootstrap';

const Register = () => {

  const navigate = useNavigate();

  const [registrationValues, setRegistrationValues] = useState({
    email: "",
    name: "",
    surname: "",
    password: "",
    confirmPassword: "",
    studiesType: 0,
    studiesLvL: 0,
    semestr: 1,
    fieldOfStudy: 0
  });

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setRegistrationValues(prevState => {
        return {...prevState, [name]: value}
      });
  }

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = parseInt(value);
    if(name === "studiesLvL" && parsedValue === 1){
      setRegistrationValues(pervState => {
        return {...pervState, semestr: 1}
      })
    }
    setRegistrationValues(pervState => {
      return {...pervState, [name]: parsedValue}
    })
  }

  const handleClick = (e) => {
    e.preventDefault();
    setRegistrationValues(prevState => {
      return {...prevState, fieldOfStudy: parseInt(e.target.attributes[0].value)}
    })
  }

  const handleSubmit = (e) => {
      e.preventDefault();
  }

  const register = () => {

  }


  return (
    <div className="container-custom">
    <div className="form-container" style={{width: 600, marginLeft: 0}}>
    <h2>Rejestracja</h2>
    <p>Utwórz nowe konto.</p>
    <hr />
    <Form>
        <Form.Group controlId="form.Email">
            <Row className='row--custom'>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" placeholder="Email" onChange={handleInputChange} value={registrationValues.email}></Form.Control>
            </Row>
        </Form.Group>
        <Form.Group controlId="form.Email">
            <Row className='row--custom'>
                <Form.Label>Imię</Form.Label>
                <Form.Control type="text" name="name" placeholder="Imie" onChange={handleInputChange} value={registrationValues.name}></Form.Control>
            </Row>
        </Form.Group>
        <Form.Group controlId="form.Email">
            <Row className='row--custom'>
                <Form.Label>Nazwisko</Form.Label>
                <Form.Control type="text" name="surname" placeholder="Nazwisko" onChange={handleInputChange} value={registrationValues.surname}></Form.Control>
            </Row>
        </Form.Group>
        <Form.Group controlId="form.Login">
            <Row className='row--custom'>
                <Form.Label>Hasło</Form.Label>
                <Form.Control type="password" placeholder="Hasło" name="password" onChange={handleInputChange} value={registrationValues.password}></Form.Control>
            </Row>
        </Form.Group>
        <Form.Group controlId="form.Login">
            <Row className='row--custom'>
                <Form.Label>Potwierdź hasło</Form.Label>
                <Form.Control type="password" placeholder="Potwierdź hasło" name="confirmPassword" onChange={handleInputChange} value={registrationValues.confirmPassword}></Form.Control>
            </Row>
        </Form.Group>
        <Form.Group>
          <Row className='row--custom'>
          <Form.Label>Typ studiów</Form.Label>
          <Form.Select value={registrationValues.studiesType} name="studiesType" onChange={handleSelectChange} style={{width: "70%"}}>
            <option value="0">Stacjonarne</option>
            <option value="1">Zaoczne</option>
          </Form.Select>
          </Row>  
        </Form.Group>
        <Form.Group>
          <Row className='row--custom'>
          <Form.Label>Stopień studiów</Form.Label>
          <Form.Select value={registrationValues.studiesLvL} name="studiesLvL" onChange={handleSelectChange} style={{width: "70%"}}>
            <option value="0">Inżynierskie</option>
            <option value="1">Magisterskie</option>
          </Form.Select>
          </Row>  
        </Form.Group>
        <Form.Group>
          <Row className='row--custom'>
          <Form.Label>Semestr</Form.Label>
          <Form.Select value={registrationValues.semestr} name="semestr" onChange={handleSelectChange} style={{width: "70%"}}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            {registrationValues.studiesLvL === 0 &&
            <>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            </>
            }
          </Form.Select>
          </Row>  
        </Form.Group>
        <Form.Group>
          <Row className='row--custom'>
            <Form.Label>Kierunek studiów</Form.Label>
            <div className='registrationSelectBox'>
              <ListGroup>
              <ListGroupItem onClick={handleClick} value="0" className={registrationValues.fieldOfStudy === 0 && 'selected-list-item'}>Informatyka</ListGroupItem>
              <ListGroupItem onClick={handleClick} value="1" className={registrationValues.fieldOfStudy === 1 && 'selected-list-item'}>Matematyka</ListGroupItem>
              </ListGroup>
            </div>
          </Row>
        </Form.Group>
      
        <div className="text-center">
        <button className="custom-button" style={{ width: "275px", marginLeft: 90}} onClick={handleSubmit}>Zarejestruj</button>
        </div>
    </Form>
    </div>
    </div>
  )
}

export default Register