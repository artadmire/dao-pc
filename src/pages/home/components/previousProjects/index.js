import React from 'react'
import PreviousProjectItem from './previousProjectItem.js'
import './index.css'
import arrow from '@/assets/img/arrow@2x.png'
import {NavLink} from 'react-router-dom'
export default function PreviousProject (props) {
  const { list = [] } = props
  return (
    <div className="previous-projects">
      <div className="previous-projects-title">
        <span className="mainTitle">Previous Projects</span>
        <div>
          <NavLink to='project-list' className="left">Show all previous projects</NavLink><img className="arrow-pre" src={arrow}/>
        </div>
      </div>
      <div className="previous-projects-content">
        <div style={{display: 'flex'}} className="previous-projects-content-top">
          {
            list.slice(0, 3).map((item, index) =>  <PreviousProjectItem key={index} data={item} styles={{'marginRight': '16px'}}/>)
          }
        </div>
        {
          list.length >= 3  && <div style={{display: 'flex'}} className="previous-projects-content-bottom">
            {
              list.slice(3, 6).map((item, index) =>  <PreviousProjectItem key={index} data={item} styles={{'marginRight': '16px'}}/>)
            }
          </div>
        }

      </div>
    </div>
  )
}
