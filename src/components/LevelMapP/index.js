import React from 'react'
import './index.css'
import bronze from '@/assets/img/65432-02@2x.png'
import gold from '@/assets/img/643-02@2x.png'
import sliver from '@/assets/img/122-02@2x.png'
import platinum from '@/assets/img/33212-02@2x.png'
import Wealth from '@/assets/img/1234-02@2x.png'

const percent = {
  0: bronze,
  1: gold,
  2: sliver,
  3: platinum,
  4: Wealth,
}
const currentLevel = {
  0: 'START',
  1: 'EXPERIENCED',
  2: 'OLD_BIRD',
  3: 'EXPERT',
  4: 'WEALTH',
}

export default function LevelMap (props) {
  const {level = 0} = props
  return (
    <div className="my-levelMapP">
      {level == 0 ? <p className="account-level-desc">
        You don’t have a DAOStarter Tier yet. Please upgrade your level.
      </p> : null}
      <div className="wrap-levelMap-top">
        <img src={percent[level]}/>
        <div className="right">
          <span className='title'>
            {currentLevel[level]}
          </span>
          <span></span>
        </div>
      </div>
    </div>
  )
}
