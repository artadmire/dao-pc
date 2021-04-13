import React from 'react'
import Twitter from '@/assets/img/Twitter@2x.png'
import './previousProjectItem.css'
import {NavLink} from 'react-router-dom'
export default function PreviousProjectItem (props) {
  return (
    <NavLink to='/project-list/:id' className="previous-project-item" style={{'marginRight': props.styles.marginRight || '', 'marginBottom': props.styles.marginBottom || ''}}>
      <div className="section1">
        <img alt="oo"  src={Twitter}/>
        <span>ethbox</span>
      </div>
      <div className="border"></div>
      <ul className="section2">
        <li>
          <div>METHOD</div>
          <div>Batch-Lottery</div>
        </li>
        <li>
          <div>METHOD</div>
          <div>Batch-Lottery</div>
        </li>
        <li>
          <div>METHOD</div>
          <div>Batch-Lottery</div>
        </li>
      </ul>
      <div className="border"></div>
      <ul className="section3">
        <li>
          <div>METHOD</div>
          <div>Batch-Lottery</div>
        </li>
        <li>
          <div>METHOD</div>
          <div>Batch-Lottery</div>
        </li>
        <li>
          <div>METHOD</div>
          <div>Batch-Lottery</div>
        </li>
        <li>
          <div>METHOD</div>
          <div>Batch-Lottery</div>
        </li>
      </ul>
      <div className="section4">
        <span className="unlock-wallet">Unlock Wallet</span>
      </div>
    </NavLink>
  )
}