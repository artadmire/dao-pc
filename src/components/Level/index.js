import React from 'react'
import './index.css'

const percent = {
  0: '0%',
  1: '25%',
  2: '50%',
  3: '75%',
  4: '100%',
}

export default function Level (props) {
  const {level = 0} = props
  return (
    <div className="my-level">
      {level == 0 ? <p className="account-level-desc">
        You don’t have a DuckSTARTER Tier yet. Please upgrade your level.
      </p> : null}
      <div className="wrap-level-top">
        <div className="level-top-bg" style={{width: `${percent[level]}`}}>
          <div className="level-top">
            <div style={{left: '25%'}} className='dashed'></div>
            <div style={{left: '50%'}} className='dashed'></div>
            <div style={{left: '75%'}} className='dashed'></div>
          </div>
        </div>
      </div>
      <ul className="level-bottom">
        <li style={{left: '20px'}}>START</li>
        <li style={{left: '25%'}}>BRONZE</li>
        <li style={{left: '50%'}}>SLIVER</li>
        <li style={{left: '75%'}}>GOLD</li>
        <li style={{right: '25px'}}>PLATINUM</li>
      </ul>
    </div>
  )
}
