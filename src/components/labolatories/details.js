import React, {useContext} from 'react';
import jwtAxios from '../../utils/jwtAxios';
import UserContext from '../../context/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { FaArrowAltCircleDown, FaArrowLeft } from 'react-icons/fa'

import useDownloadFile from '../../utils/hooks/useDownloadFile';

const LaboratoriesDetails = () => {

    const navigate = useNavigate();
    const context = useContext(UserContext);
    const downloadFile = useDownloadFile();
    const location = useLocation();
    const { id } = location.state;

    const { isLoading, data: laboratoriesData } = useQuery(["laboratoriesDetails", {id}], () => jwtAxios.get(`/api/Course/Laboratory?id=${id}`,{context:context}))

    const goBack = (e) => {
        e.preventDefault();
        navigate("/course")
    }


    return (
        <div className='details-tab'>
        <div className='title-section'>
            { isLoading ? <></> : <><h1 className='h1--custom' style={{marginLeft: "10%"}}>{laboratoriesData.data.Name}</h1> <p style={{marginLeft: "10%", marginBottom: 0}}>{laboratoriesData.data.Number}. {laboratoriesData.data.Name}</p></> }
        </div>
        <div className='container-custom' style={{marginTop: 30, width: "77%"}}>
            { isLoading ?  
            <>
            </>
            :
            <div> 
                <div className='content-details-info'>
                    <span style={{fontWeight: 600}}>Opis</span>
                    <p>{laboratoriesData.data.Description}</p>
                </div>
                Pliki
                <ul>
                     { laboratoriesData.data.Files.length !== 0 ?
                        laboratoriesData.data.Files.map((file,i) => 
                            <li style={{fontSize: 13}} key={i}>{i+1}. {file.Name} <FaArrowAltCircleDown color='green' style={{ cursor: "pointer"}} onClick={() => downloadFile(file.ID, file.Name, 0)}/></li>
                        ) :
                        <></>
                    }
                </ul>
            </div>    
            }
             <button className="custom-blue-button" style={{ width: "200px", marginBottom: 3}} onClick={goBack}><FaArrowLeft/> Wróc do listy kursów</button>    
        </div>
        </div>        
    )
}

export default LaboratoriesDetails