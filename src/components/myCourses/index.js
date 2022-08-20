import React, { useState, useContext } from 'react'
import { Tab, Tabs } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
import jwtAxios from '../../utils/jwtAxios';
import UserContext from '../../context/UserContext';
import MyCoursesList from './MyCoursesList';


const MyCourses = () => {

    const [key, setKey] = useState('now');
    const context = useContext(UserContext);

    const { data: myActiveCoursesData, isLoading: isMyActiveCoursesLoading } = useQuery(["myActiveCoursesData"],() =>
    jwtAxios.get(`/api/MyCourse/GetAllActiveCourses`,{ context:context})
    );

    const { data: myHistoricCoursesData, isLoading: isMyHistoricCoursesLoading } = useQuery(["myHistoricCoursesData"],() =>
    jwtAxios.get(`/api/MyCourse/GetAllHistoricCourses`,{ context:context})
    );

  return (
    <div className='container-custom' style={{marginTop: 20}}>
        <h1 className='h1--custom'>Moje kursy</h1>
        <div className='courses-tabs'>
          <Tabs
            id="controlled-tab"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3 nav-tabs--custom coursesTab"
          >
            <Tab eventKey="now" title="Aktualne">
                    {isMyActiveCoursesLoading ? <></> : <MyCoursesList myCourses={myActiveCoursesData.data}/>}
            </Tab>
            <Tab eventKey="rest" title="Historia">
                    {isMyHistoricCoursesLoading ? <></> : <MyCoursesList myCourses={myHistoricCoursesData.data}/>}
            </Tab>
          </Tabs>
        </div>



    </div>
  )
}

export default MyCourses