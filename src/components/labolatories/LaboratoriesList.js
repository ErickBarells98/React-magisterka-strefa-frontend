import React from 'react'
import { Link } from 'react-router-dom'

const LaboratoriesList = ({ laboratories }) => {

  console.log(laboratories);

    if(laboratories.length !== 0){
      return (
        <ul className='content-list'>
          {laboratories.map((item,i) => 
              <LaboratoriesItem key={i} item={item} />
          )}
        </ul>
      )
    }

    return (
      <div>
        Nie ma na ten moment dostępnych żadnych labolatoriów
      </div>
    )

}

const LaboratoriesItem = ({item}) => {
    return(
      <li className='content-element'>
        <p><span>{item.Number}</span> <Link className="a--custom" to={""}>{item.Name}.</Link></p>
        <div>
          Pliki do pobrania: &#123;

          <br/>
          &#125;
        </div>
      </li>
    )
}



export default LaboratoriesList