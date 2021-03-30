import React,{useState} from 'react'
import PreviousProjectItem from './previousProjectItem.js'
import './index.css'
import arrow from '../../../../assets/img/arrow@2x.png'
export default function PreviousProject() {
    let [PreviousProjects] = useState([0,1,2,0,1,2])
    return (
        <div className="previous-projects">
         <div className="previous-projects-title">
              <img src style={{width:'385px',height:'43px',background:'red'}}/>
              <div>
                   <span>Show all previous projects</span><img src={arrow}/>
                     
              </div>
         </div>
         <div className="previous-projects-content">
             <div style={{display:"flex"}} className="previous-projects-content-top">
                {
                   PreviousProjects.length&& PreviousProjects.slice(3,6).map((index,item)=>  <PreviousProjectItem key={index} styles={{"marginRight":"16px"}}/>)
                }
             </div>
             <div style={{display:"flex"}} className="previous-projects-content-bottom">
                {
                    PreviousProjects.length>=3 && PreviousProjects.slice(3,6).map((index,item)=>  <PreviousProjectItem key={index} styles={{"marginRight":"16px"}}/>)
                }
             </div>
         </div>
        </div>
    )
}
