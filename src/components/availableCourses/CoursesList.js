import React from 'react'
import { Link } from 'react-router-dom'

const CoursesList = ({ courses }) => {

    if(courses.CourseDTOs !== undefined){
        return (
            <div>

            {courses.CourseDTOs[1] !== undefined && courses.CourseDTOs[1].length !== 0 ? 
            <CourseGroup coursesForSemestr={courses.CourseDTOs[1]}/>
            :
            <>
            </>
            }

            {courses.CourseDTOs[2] !== undefined && courses.CourseDTOs[2].length !== 0 ? 
            <CourseGroup coursesForSemestr={courses.CourseDTOs[2]}/>
            :
            <>
            </>
            }

            {courses.CourseDTOs[3] !== undefined && courses.CourseDTOs[3].length !== 0 ? 
            <CourseGroup coursesForSemestr={courses.CourseDTOs[3]}/>
            :
            <>
            </>
            }

            {courses.CourseDTOs[4] !== undefined && courses.CourseDTOs[4].length !== 0 ? 
            <CourseGroup coursesForSemestr={courses.CourseDTOs[4]}/>
            :
            <>
            </>
            }   

            {courses.CourseDTOs[5] !== undefined && courses.CourseDTOs[5].length !== 0 ? 
            <CourseGroup coursesForSemestr={courses.CourseDTOs[5]}/>
            :
            <>
            </>
            }  

            {courses.CourseDTOs[6] !== undefined && courses.CourseDTOs[6].length !== 0 ? 
            <CourseGroup coursesForSemestr={courses.CourseDTOs[6]}/>
            :
            <>
            </>
            } 

            {courses.CourseDTOs[7] !== undefined && courses.CourseDTOs[7].length !== 0 ? 
            <CourseGroup coursesForSemestr={courses.CourseDTOs[7]}/>
            :
            <>
            </>
            }   

            </div>
        )
    }

    return(
        <p>Nie ma dostępnych kursów.</p>
    )
}

const CourseGroup = ({coursesForSemestr}) => {
    return(
        <div>
            <h2 className='h2--custom'>Semestr {coursesForSemestr[0].SemesterNumber}</h2>
            <h3 className='h3--custom'>{coursesForSemestr[0].StudiesLevel}</h3>
            <hr className='hr-list' />
            <ul className='ul-custom-list'>
            {
            coursesForSemestr.map((item,i) => 
                <CourseDetailsItem key={i} item={item}/>
            )
            }
            </ul>
        </div>
    )
}

const CourseDetailsItem = ({item}) => {
    return(
        <li>
            <Link className='a--custom' to={`/course/${item.ID}`} >{item.Name} ( {item.StudiesTYpe} | {item.FieldOfStudyName} ) </Link>
        </li>
    )
}

export default CoursesList