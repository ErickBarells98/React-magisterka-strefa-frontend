import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {

    const [click,setClick] = useState(false);

  return (
    <div className="custom-navbar">
        <div className="custom-navbar-content">
                <Link to="/" className="logo-link"><h1 className="custom-nav-logo">NavbarLogo</h1></Link>

            <div className={`custom-nav-menu-list ${click ? "active" : ""}`}>

                <ul className="custom-nav-menu">
                    <li className="custom-nav-item">
                        <Link to="/kontakt">Kontakt</Link>
                    </li>
                </ul>

                <ul className="custom-nav-menu nav-right">
                    <ul className="custom-nav-menu nav-right">
                        
                    </ul>
                    <ul className="custom-nav-menu nav-right">
                    <li className="custom-nav-item">
                        <Link to="/register">Zarejestruj</Link>
                    </li>
                    <li className="custom-nav-item">
                        <Link to="/login">Zaloguj</Link>
                    </li>
                    </ul>
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