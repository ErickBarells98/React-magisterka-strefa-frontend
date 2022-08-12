import React, { useState, useContext } from 'react'
import { Tab, Tabs } from 'react-bootstrap';
import CoursesList from './CoursesList';
import { useQuery } from '@tanstack/react-query';
import UserContext from '../../context/UserContext';
import jwtAxios from '../../utils/jwtAxios';

const AvailableCourses = () => {

  const [key, setKey] = useState('my');

  const context = useContext(UserContext);

  const { data: mySemestrCourses, isLoading: isMySemestrCoursesLoading } = useQuery(["mySemestrCourses"],() =>
    jwtAxios.get(`/api/Course/getCourses?semestr=${true}`,{ context:context})
  );

  const { isLoading: isRestCoursesLoading , data: restCourses } = useQuery(["restCourses"],() =>
       jwtAxios.get(`/api/Course/getCourses?semestr=${false}`,{ context:context})
  );

  return (
    <div className="container-custom" style={{marginTop: 20}}>
        <h1 className="h1--custom">Kursy</h1>
        <div className='courses-tabs'>
          <Tabs
            id="controlled-tab"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3 nav-tabs--custom"
          >
            <Tab eventKey="my" title="Mój semestr">
              <div className='container-list'>
                {isMySemestrCoursesLoading ? <></> : <CoursesList courses={mySemestrCourses.data} />}
              </div>
            </Tab>
            <Tab eventKey="rest" title="Pozostałe">
              <div className='container-list'>
                {isRestCoursesLoading ? <></> : <CoursesList courses={restCourses.data} />}
              </div>
            </Tab>
          </Tabs>
        </div>


    </div>
  )
}

export default AvailableCourses