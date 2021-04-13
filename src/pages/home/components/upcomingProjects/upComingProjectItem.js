import React from 'react'
import './upComingProjectItem.css'


export default function upComingProjectItem (props) {
  const {data} = props

  return (
    <a href="javascript:;" className="up-coming-project-item">
      <img src={data.logo}/>
      <div className="details">
        {data.isOpen == 1 && <p>Starts: in {data.days} day（s）/ Whitelist Closed</p>}
        {data.isOpen == 2 && <p>Whitelist open - <a href='javascript:;'>Register Now</a></p>}
        {data.isOpen == 3 && <p>Starts: in {data.days} day（s）/ Whitelist Closed</p>}
      </div>
    </a>
  )
}
