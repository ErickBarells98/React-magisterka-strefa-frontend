import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowAltCircleDown } from 'react-icons/fa'

import useDownloadFile from '../../utils/hooks/useDownloadFile';

const LaboratoriesList = ({ laboratories }) => {

    const downloadFile = useDownloadFile()

    if(laboratories.length !== 0){
      return (
        <ul className='content-list'>
          {laboratories.map((item,i) => 
              <LaboratoriesItem key={i} item={item} downloadFile={downloadFile} />
          )}
        </ul>
      )
    }

    return (
      <div>
        Na ten moment nie ma dostępnych żadnych labolatoriów
      </div>
    )

}

const LaboratoriesItem = ({item,downloadFile}) => {
    return(
      <li className='content-element'>
        <h4 className='h4--custom'><span>{item.Number}</span> <Link className="a--custom" to={""}>{item.Name}.</Link></h4>
        <div className='file-display-container'>
          <ul style={{padding:0}}>
          Pliki do pobrania: &#123;
             { item.Files.length !== 0 ? 
                <>
                  {item.Files.map((file,i) => <li key={i} className='file-display-row'>{file.FileName} <FaArrowAltCircleDown color='green' style={{ cursor: "pointer"}} onClick={() => downloadFile(file.ID, file.FileName, 0)}/> </li>)}
                </>
                :
                <></>
             }
          &#125;
          </ul>
        </div>
      </li>
    )
}



export default LaboratoriesList