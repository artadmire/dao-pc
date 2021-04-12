import React from 'react'
import PreviousProjectItem from './previousProjectItem.js'
import './index.css'
import arrow from '@/assets/img/arrow@2x.png'
export default function PreviousProject(props) {
    const {list} = props
    return (
        <div className="previous-projects">
         <div className="previous-projects-title">
            <span className="mainTitle">Previous Projects</span>
            <div>
                <span className="left">Show all previous projects</span><img className="arrow-pre" src={arrow}/>
            </div>
         </div>
         <div className="previous-projects-content">
             <div style={{display:"flex"}} className="previous-projects-content-top">
                {
                   list.slice(0,3).map((index,item)=>  <PreviousProjectItem key={index} styles={{"marginRight":"16px"}}/>)
                }
             </div>
             {
                 list.length>=3  && <div style={{display:"flex"}} className="previous-projects-content-bottom">
                    {
                    list.slice(3,6).map((index,item)=>  <PreviousProjectItem key={index} styles={{"marginRight":"16px"}}/>)
                    }
                </div>
             }
             
         </div>
        </div>
    )
}
