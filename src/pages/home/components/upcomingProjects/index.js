import React from 'react'
import UpcomingProjectItem from './upComingProjectItem.js'
import './index.css'
function UpcomingProject(props) {
     const {list} = props
    return (
        <div className="upcoming-projects">
          <span className="mainTitle">Upcoming Projects</span>
          <div className="upcoming-projects-content">
               <div className="first-item">
                    <UpcomingProjectItem  data = {list[0]} />
               </div>
               <div className="second-item">
                    {list.length>=2 && <UpcomingProjectItem data = {list[1]}></UpcomingProjectItem>}
               </div>
               <div className="other-items">
                    {
                    list.slice(2).map((index,item)=> <UpcomingProjectItem key={index}/>)
                    }
               </div>
          </div>
        </div>
    )
}

 export default UpcomingProject