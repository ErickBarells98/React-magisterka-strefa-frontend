import React, {useContext} from 'react'
import jwtAxios from '../../utils/jwtAxios'
import { useQuery } from '@tanstack/react-query'
import UserContext from '../../context/UserContext'
import { useParams, useNavigate } from 'react-router-dom';

const CourseDetails = () => {

  const context = useContext(UserContext);
  const {id} = useParams();
  const navigate = useNavigate();

  const { isLoading, data: courseData } = useQuery(["courseDetails"], () => jwtAxios.get(`/api/Course/${id}`,{context:context}),{cacheTime: 0})

    const joinCourse = (e) => {
        e.preventDefault();
    }

    const goBack = (e) => {
        e.preventDefault();
        navigate("/course")
    }


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
        </div>
        <div className='button-container' style={{width: "70%", margin: "auto"}}>
            <button className="custom-blue-button" style={{ width: "200px", marginBottom: 3}} onClick={goBack}>Wróc do listy kursów</button>
            <button className="custom-button" style={{ width: "150px", marginBottom: 3}} onClick={joinCourse}>Dołącz do kursu</button>
        </div>
    </div>
  )
}

export default CourseDetails