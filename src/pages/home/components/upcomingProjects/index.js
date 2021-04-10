import React ,{useState}from 'react'
import UpcomingProjectItem from './upComingProjectItem.js'
import './index.css'
function UpcomingProject() {
    let [upcomingProjects] = useState([0,1,2,4,5,6,7,8])
    return (
        <div className="upcoming-projects">
          <span className="mainTitle">Upcoming Projects</span>
          <div className="upcoming-projects-content">
               <div className="first-item">
                    {upcomingProjects.length && <UpcomingProjectItem  data = {upcomingProjects[0]}></UpcomingProjectItem>}
               </div>
               <div className="second-item">
                    {upcomingProjects.length&& upcomingProjects.length>=2 && <UpcomingProjectItem data = {upcomingProjects[1]}></UpcomingProjectItem>}
               </div>
               <div className="other-items">
                    {
                    upcomingProjects.slice(2).map((index,item)=> <UpcomingProjectItem/>)
                    }
               </div>
          </div>
        </div>
    )
}

 export default UpcomingProject