import React from 'react'
import { Card, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { AiFillBook} from 'react-icons/ai'

const MyCoursesList = ({ myCourses }) => {
  
    if(myCourses.lenght !== 0){
        return (
            <div className='course-results-list' style={{marginTop: 30}}>   
                {myCourses.map((item,i) => <MyCourseResult key={i} item={item}/>)}
            </div>
        )
    }

    return(
        <div>
            Nie ma żadnych aktualnych laboratoriów do wyświetlenia.
        </div>
    )   
}

const MyCourseResult = ({item}) => {
    return(
        <Card style={{marginBottom: 20}}>
            <Card.Header><Link className='a--custom-2' to={`/course/${item.Course.ID}`}>{item.Course.Name}</Link></Card.Header>
            <Card.Body style={{paddingLeft: 0, paddingTop: 5}}>
                <div className='points-list-tag'><span>Ćwiczenia</span> {item.Points.map((pointsitem,i) => <Link to={"/course/laboratories"} state={{id: item.Course.ID}} className='points-tag' key={i}>{pointsitem.LaboratoryNumber}<span>({pointsitem.MaxPoints})</span></Link>)}</div>
                <hr style={{marginTop: 8}}/>
                    <MyPoints points={item.Points} maxPoints={item.Course.MaxPoints} />
                <hr style={{marginTop: 14}}/>
                { 
                item.Course.HasProject && item.Project !== null ?
                <div style={{marginLeft: 15}}>{item.Project.Name} 
                    <div className='points-block' style={{width: 100, height: 25, margin:0, textAlign: 'center'}}> 
                        {item.Project.Points} / {item.Course.ProjectMaxPoints}
                    </div>
                </div> 
                : 
                <span style={{color: 'red', fontSize: 15, marginLeft: 15}}>nie ustalono tematu projektu</span> 
                }
            </Card.Body>
        </Card>
    )
}

const MyPoints = ({points,maxPoints}) => {
    if(points.length !== 0){
        const sumpointsEarned = points.reduce((pointsEarned, pointsNumber) => {
            return pointsEarned + pointsNumber.RecievedPoints; 
        }  
        ,0);

        return(
            <div className='points-list'> 
                <div className='progress-bar-container'>
                <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={
                    <Tooltip className="point-tooltip" style={{position: 'absolute'}}>
                        {sumpointsEarned} / {maxPoints}
                    </Tooltip>
                }
                >
                <ProgressBar variant="success" now={((sumpointsEarned/maxPoints)*100)} label={`${((sumpointsEarned/maxPoints)*100)}%`} />
                </OverlayTrigger>
                </div>
                {points.map((point,i) => <MyPointsBlock key={i} pointsItem={point}/>)}
            </div> 
        )
    }

    return(
        <div className='points-list'> 
            <div className='progress-bar-container'>
                <ProgressBar variant="success" now={0} label={`${0}%`} />
            </div>
        </div>
    )
}

const MyPointsBlock = ({pointsItem}) => {

    return(
        <div className='point-container'>
            <div className='points-block' style={{textAlign: 'center', paddingTop: 4, fontSize: 19}}>
                {pointsItem.RecievedPoints}
            </div>
            <div className='note-presence-block'>
                <div className='points-block' style={{width: 15, height: 18, marginLeft: 2, marginTop: 3}}>
                    <AiFillBook color='green' size={12} style={{marginBottom: 8}}/>
                </div>

                <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={
                    <Tooltip className="point-tooltip" style={{position: 'absolute'}}>
                        {pointsItem.Attendance === 3 ? "Obecny" : "" }
                        {pointsItem.Attendance === 1 ? "Nieobecny" : ""}
                        {pointsItem.Attendance === 2 ? "Usprawiedliwione" : ""}
                        {pointsItem.Attendance === 0 ? "Uzupełnione" : ""}
                    </Tooltip>
                }
                >
                <div className={`points-block presence-block ${pointsItem.Attendance === 1 ? "background--red" : ""} ${pointsItem.Attendance === 2 ? "background--green" : ""} ${pointsItem.Attendance === 0 ? "background--orange" : ""}`} style={{width: 15, height: 12, marginLeft: 2, marginTop: 2}}>
                
                </div>
                </OverlayTrigger>

            </div>
        </div>
    )
}

export default MyCoursesList