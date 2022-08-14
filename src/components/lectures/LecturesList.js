import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowAltCircleDown } from 'react-icons/fa'

import useDownloadFile from '../../utils/hooks/useDownloadFile';

const LecturesList = ({lectures}) => {

  const downloadFile = useDownloadFile();

  if(lectures.length !== 0){
    return (
      <ul className='content-list'>
        {lectures.map((item,i) => 
            <LecturesItem key={i} item={item} downloadFile={downloadFile}/>
        )}
      </ul>
    )
  }

  return (
    <div>
      Na ten moment nie ma dostępnych żadnych wykładów
    </div>
  )

}

const LecturesItem = ({item,downloadFile}) => {
  return(
    <li className='content-element'>
        <h4 className='h4--custom'><span>{item.Number}</span> <Link className="a--custom" to={"/course/lecture"} state={{id: item.ID}}>{item.Name}.</Link></h4>
        <div className='file-display-container'>
          <ul style={{padding:0}}>
          Pliki do pobrania: &#123;
             { item.LectureFiles.length !== 0 ? 
                <>
                  {item.LectureFiles.map((file,i) => <li key={i} className='file-display-row'>{file.FileName} <FaArrowAltCircleDown color='green' style={{ cursor: "pointer"}} onClick={() => downloadFile(file.ID, file.FileName, 1)}/> </li>)}
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

export default LecturesList