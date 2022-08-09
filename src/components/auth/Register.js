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
    fieldOfStudy: 1
  });

  const [errorValue, setErrorValues] = useState("");

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
      if(registrationValues.password === registrationValues.confirmPassword){
        register();
        navigate("/login");
      }
      else{
        setErrorValues("Błędnie wprowadzone dane. Upewnij się że hasło się zgadza.")
      }
  }

  const register = () => {
        const newUser = {
          email: registrationValues.email,
          name: registrationValues.name,
          surname: registrationValues.surname,
          password: registrationValues.password,
          studiesType: registrationValues.studiesType,
          studiesLvl: registrationValues.studiesLvL,
          semester: registrationValues.semestr,
          fieldOfStudy: registrationValues.fieldOfStudy
        };
        
        axios.post("/api/auth/register",newUser,{headers:{'Content-Type':'application/json'}})
        .then(response => {

        })
        .catch(err => {
            setErrorValues("Niepoprawnie wprowadzone dane.")
        })
  }


  return (
    <div className="container-custom">
    <div className="form-container" style={{width: 550, marginLeft: 0}}>
    <h2>Rejestracja</h2>
    <p>Utwórz nowe konto.</p>
    <hr />

    { errorValue !== "" ? <p style={{color: "red"}}>{errorValue}</p> : <></>}

    <Form>
        <Form.Group controlId="form.Email">
            <Row className='row--custom'>
                <Form.Label className='register-label'>Email</Form.Label>
                <Form.Control type="email" name="email" placeholder="Email" onChange={handleInputChange} value={registrationValues.email}></Form.Control>
            </Row>
        </Form.Group>
        <Form.Group controlId="form.Email">
            <Row className='row--custom'>
                <Form.Label className='register-label'>Imię</Form.Label>
                <Form.Control type="text" name="name" placeholder="Imie" onChange={handleInputChange} value={registrationValues.name}></Form.Control>
            </Row>
        </Form.Group>
        <Form.Group controlId="form.Email">
            <Row className='row--custom'>
                <Form.Label className='register-label'>Nazwisko</Form.Label>
                <Form.Control type="text" name="surname" placeholder="Nazwisko" onChange={handleInputChange} value={registrationValues.surname}></Form.Control>
            </Row>
        </Form.Group>
        <Form.Group controlId="form.Login">
            <Row className='row--custom'>
                <Form.Label className='register-label'>Hasło</Form.Label>
                <Form.Control type="password" placeholder="Hasło" name="password" onChange={handleInputChange} value={registrationValues.password}></Form.Control>
            </Row>
        </Form.Group>
        <Form.Group controlId="form.Login">
            <Row className='row--custom'>
                <Form.Label className='register-label'>Potwierdź hasło</Form.Label>
                <Form.Control type="password" placeholder="Potwierdź hasło" name="confirmPassword" onChange={handleInputChange} value={registrationValues.confirmPassword}></Form.Control>
            </Row>
        </Form.Group>
        <Form.Group>
          <Row className='row--custom'>
          <Form.Label className='register-label'>Typ studiów</Form.Label>
          <Form.Select value={registrationValues.studiesType} name="studiesType" onChange={handleSelectChange} style={{width: "70%"}}>
            <option value="0">Stacjonarne</option>
            <option value="1">Zaoczne</option>
          </Form.Select>
          </Row>  
        </Form.Group>
        <Form.Group>
          <Row className='row--custom'>
          <Form.Label className='register-label'>Stopień studiów</Form.Label>
          <Form.Select value={registrationValues.studiesLvL} name="studiesLvL" onChange={handleSelectChange} style={{width: "70%"}}>
            <option value="0">Inżynierskie</option>
            <option value="1">Magisterskie</option>
          </Form.Select>
          </Row>  
        </Form.Group>
        <Form.Group>
          <Row className='row--custom'>
          <Form.Label className='register-label'>Semestr</Form.Label>
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
            <Form.Label className='register-label'>Kierunek studiów</Form.Label>
            <div className='registrationSelectBox'>
              <ListGroup>
              <ListGroupItem onClick={handleClick} value="1" className={registrationValues.fieldOfStudy === 1 && 'selected-list-item'}>Informatyka</ListGroupItem>
              <ListGroupItem onClick={handleClick} value="2" className={registrationValues.fieldOfStudy === 2 && 'selected-list-item'}>Matematyka</ListGroupItem>
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