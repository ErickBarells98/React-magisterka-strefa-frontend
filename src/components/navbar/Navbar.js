import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import UserContext from '../../context/UserContext';

const Navbar = () => {

    const [click,setClick] = useState(false);
    const { logout, isLogged, user } = useContext(UserContext);

    const navigate = useNavigate();

    const signOut = () => {
        logout();
        navigate("/");
    }

  return (
    <div className="custom-navbar">
        <div className="custom-navbar-content">
                <Link to="/" className="logo-link"><h1 className="custom-nav-logo">NavbarLogo</h1></Link>

            <div className={`custom-nav-menu-list ${click ? "active" : ""}`}>

                <ul className="custom-nav-menu">
                    { isLogged ? 
                    <>
                        <li className="custom-nav-item">
                        <Link to="/">Moje Kursy</Link>
                        </li>
                        <li className="custom-nav-item">
                        <Link to="/">Dostępne Kursy</Link>
                        </li>
                    </> 
                    :
                    <>
                    </>
                    }
                    <li className="custom-nav-item">
                        <Link to="/kontakt">Kontakt</Link>
                    </li>
                </ul>

                <ul className="custom-nav-menu nav-right">
                    { !isLogged ?
                    <ul className="custom-nav-menu nav-right">
                    <li className="custom-nav-item">
                        <Link to="/register">Zarejestruj</Link>
                    </li>
                    <li className="custom-nav-item">
                        <Link to="/login">Zaloguj</Link>
                    </li>
                    </ul>
                    :
                    <ul className="custom-nav-menu nav-right">
                    <li className="custom-nav-item">
                        <Link to="/profile"><span style={{fontWeight: 700}}>Witaj {user.username}!</span></Link>
                    </li>
                    <li className="custom-nav-item">
                        <Link to="" onClick={() => {signOut()}}>Wyloguj</Link>
                    </li>
                    </ul>
                    }
                </ul>

            </div>
            
            {/* <div className="custom-hamburger" onClick={handleClick}>
                {click ? <FaTimes size={20} style={{color: "#fff"}} /> : <FaBars size={20} style={{color: "#fff"}}/>}    
            </div> */}
        </div>
    </div>
  )
}

export default Navbar