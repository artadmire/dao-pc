import React from 'react'
import './index.css'

const percent = '40%'

export default function Level () {
  return (
    <div className="my-level">
      <p className="account-level-desc">
        You don’t have a DuckSTARTER Tier yet. Please upgrade your level.
      </p>
      <div className="wrap-level-top">
        <div className="level-top-bg" style={{width: `${percent}`}}>
          <div className="level-top">
            <div className='dashed'></div>
            <div className='dashed'></div>
            <div className='dashed'></div>
            <div className='dashed'></div>
            <div className='dashed'></div>
          </div>
        </div>
      </div>
      <ul className="level-bottom">
        <li>START</li>
        <li>BRONZE</li>
        <li>SLIVER</li>
        <li>GOLD</li>
        <li>PLATINUM</li>
      </ul>
    </div>
  )
}
