import React, {useState} from 'react'
import PreviousProjectItem from '../home/components/previousProjects/previousProjectItem.js'
import './index.css'
export default function PreviousProjectsList () {
  let [itemList]  = useState([1, 2, 34, 5, 4645, 65, 7, 5, 86, 8, 6, 9, 78, 90])
  return (
    <div className="previous-projects-list">
      <div  className="title">
        <img src  style={{width: '280px', height: '34px', background: 'red'}}  />
      </div>
      <div className="previous-projects-list-content">
        {itemList.map((index, item) => <PreviousProjectItem key={index}  item={item}  styles={{'marginRight': '56px', 'marginBottom': '56px'}}/>)}
      </div>
    </div>
  )
}
