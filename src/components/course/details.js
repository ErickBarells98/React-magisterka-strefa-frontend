import React, {useContext, useState, useEffect } from 'react'
import jwtAxios from '../../utils/jwtAxios'
import { useQuery } from '@tanstack/react-query'
import UserContext from '../../context/UserContext'
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';

import LaboratoriesList from '../labolatories/LaboratoriesList';

const CourseDetails = () => {

  const context = useContext(UserContext);
  const [requestJoinStatus,setRequestJoinStatus] = useState("not sent");
  const [key,setKey] = useState("lab"); 
  const {id} = useParams();
  const navigate = useNavigate();

  const { isLoading, data: courseData } = useQuery(["courseDetails"], () => jwtAxios.get(`/api/Course/${id}`,{context:context}),{cacheTime: 0})

    const joinCourse = (e) => {
        e.preventDefault();

        if(!isLoading && (courseData.data.IsApplicant || courseData.data.IsParticipant)){
            jwtAxios.get(`/api/Course/joinCourse?id=${id}`,{context:context})
            .then(response => {
                setRequestJoinStatus("sent");
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    const goBack = (e) => {
        e.preventDefault();
        navigate("/course")
    }

    useEffect(() => {
        //console.log("wywoluje maciusia")
        if(!isLoading && courseData.data.IsApplicant){
            setRequestJoinStatus("sent");
        }
        if(!isLoading && courseData.data.IsParticipant){
            setRequestJoinStatus("approved");
        }  
    },[courseData])

  return (
    <div className='details-tab'>
        <div className='title-section'>
            { isLoading ? <></> : <h1 className='h1--custom' style={{marginLeft: "10%"}}>{courseData.data.Name} </h1> }
        </div>
        <div className='container-custom' style={{marginTop: 30}}>
            { isLoading ?  
            <>
            </>
            : 
            <dl className="details-info">
                <div>
                    <dd>Name</dd>
                    <dt>{courseData.data.Name}</dt>
                </div>
                <div>
                    <dd>Rok akademicki</dd>
                    <dt>{courseData.data.DisplayYear}</dt>
                </div>
                <div>
                    <dd>Typ studiów</dd>
                    <dt>{courseData.data.StudiesTYpe}</dt>
                </div>
                <div>
                    <dd>Stopień studiów</dd>
                    <dt>{courseData.data.StudiesLevel}</dt>
                </div>
                <div>
                    <dd>Semestr</dd>
                    <dt>{courseData.data.SemesterNumber}</dt>
                </div>
                <div>
                    <dd>Max punktów</dd>
                    <dt>{courseData.data.MaxPoints}</dt>
                </div>
                <div>
                    <dd>Opis</dd>
                    <dt>{courseData.data.Description}</dt>
                </div>
                <div>
                    <dd>Prowadzący</dd>
                    <dt>{courseData.data.Masters[0].Name} {courseData.data.Masters[0].Surname}</dt>
                </div>
            </dl>
            }

            <div className='content-container'>          
                {
                    requestJoinStatus === "approved" ? 
                    <Tabs
                    id="controlled-tab"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                    >
                    <Tab eventKey="lab" title="Laboratoria">
                        <LaboratoriesList laboratories={courseData.data.Laboratories}/>
                    </Tab>
                    <Tab eventKey="lec" title="Wykłady">
                        Wykłady
                    </Tab>
                    </Tabs>          
                    :
                    <></>
                }
            </div>
        </div>

        
        
        <div className='button-container' style={{width: "70%", margin: "auto"}}>
            <button className="custom-blue-button" style={{ width: "200px", marginBottom: 3}} onClick={goBack}>Wróc do listy kursów</button>
            
            {
                requestJoinStatus === "approved" ? 
                <></> 
                :
                <button className={`custom-button ${requestJoinStatus === "sent" ? "disabled-button" : ""}`} style={{ width: "150px", marginBottom: 3}} onClick={joinCourse}>{requestJoinStatus === "not sent" ? "Dołącz do kursu" : "Wysłano prośbę."} </button> 
            }
            
        
        </div>
    </div>
  )
}

export default CourseDetails