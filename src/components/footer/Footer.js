import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="footer">    
        <div className="footer-content">
            <hr style={{margin: 0, color: "rgb(190,190,190,1)"}} />
            <div className="footer-credits">
                <p>&copy; 2022 Eryk Beczek</p>
            </div>
            <div style={{ marginRight: 45}}>
              <Link to="regulamin" style={{color: "green"}}>Deklaracja dostępności</Link>
            </div>
        </div>
    </div>
  )
}

export default Footer