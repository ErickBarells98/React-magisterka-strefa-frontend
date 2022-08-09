import React from 'react'

const Contact = () => {
  return (
    <div className="container-custom" style={{marginTop: 20}}>
        <h1 className="h1--custom">Dane Kontaktowe</h1>
        <p>
            Instytut Informatyki UPH <br/>
            ul. 3 Maja 54 <br />
            08-110 Siedlce
        </p>
        <br />
        <address>
            <strong>Zgłaszanie problemów i sugestii:</strong> <a href="mailto:test@support.pl" style={{ marginLeft: 5 }} className="a--custom">support@apps.ii.uph.edu.pl</a>
        </address>
    </div>
  )
}

export default Contact