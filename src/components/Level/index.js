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
    <div className="my-level levels">
      {level == 0 ? <p className="account-level-desc">
        You don’t have a DuckSTARTER Tier yet. Please upgrade your level.
      </p> : null}
      <div className="wrap-level-top">
        <div className="level-top-bg" style={{width: `${percent[level]}`}}>
          <div className="level-top">
            <div style={{left: '25%'}} className='dashed'></div>
            <div  style={{left: '50%'}} className='dashed'></div>
            <div  style={{left: '75%'}}  className='dashed'></div>
          </div>
        </div>
      </div>
      <ul className="level-bottom">
        <li style={{left: '10px'}}>
          <strong>
              START
          </strong>
          <span>

          </span>
          {/* <img  src={bronze}/> */}
        </li>
        <li style={{left: '25%'}}>
          <strong>
        EXPERIENCED
          </strong>
          <span>
                2,000 DSTs
          </span>
          {/* <img  src={gold}/> */}
        </li>
        <li style={{left: '50%'}}>
          <strong>
        OLD-BIRD
          </strong>
          <span>
          5,000 DSTs
          </span>
          {/* <img  src={sliver}/> */}
        </li>
        <li style={{left: '75%'}}>
          <strong>
        EXPERT
          </strong>
          <span>
                10,000 DSTs
          </span>
          {/* <img  src={platinum}/> */}
        </li>
        <li style={{right: '20px'}}>
          <strong>
        WEALTH
          </strong>
          <span>
                20,000 DSTs
          </span>
          {/* <img  src={Wealth}/> */}
        </li>
      </ul>
    </div>
  )
}
