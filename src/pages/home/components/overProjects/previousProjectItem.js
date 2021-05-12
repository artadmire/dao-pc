import React from 'react'
import './previousProjectItem.css'
import {NavLink} from 'react-router-dom'

export default function PreviousProjectItem (props) {
  const { data = {}, account } = props;
  const { name = '', logo = '', offerAddress = '', dtokenAddress = '', method = '', deposit = '', earn = '', totalDeposited = '', avaliable = '', status, poolID = ''} = data || {}
  function handleClick () {
    window.offerAddress = offerAddress
    window.dtokenAddress = dtokenAddress
  }
  return (
  // eslint-disable-next-line max-len
    <NavLink to={'/parameter/' + poolID} onClick={handleClick} className="previous-project-item" style={{'marginRight': props.styles.marginRight || '', 'marginBottom': props.styles.marginBottom || ''}}>
      <div className="section1">
        <img alt="oo"  src={logo}/>
        <span>{name}</span>
      </div>
      <div className="border"></div>
      <ul className="section2">
        <li>
          <div>METHOD</div>
          <div>{method}</div>
        </li>
        <li>
          <div>Deposit</div>
          <div>{deposit}</div>
        </li>
        <li>
          <div>Earn</div>
          <div>{earn}</div>
        </li>
      </ul>
      <div className="border"></div>
      <ul className="section3">
        <li>
          <div>Total USDT deposited</div>
          <div>{totalDeposited}</div>
        </li>
        <li>
          <div>ethbox tokens available</div>
          <div>{avaliable}</div>
        </li>
        <li>
          <div>status</div>
          <div>{status ? 'open' : 'over'}</div>
        </li>
      </ul>
      <div className="section4">
        <span className="unlock-wallet">{account ? 'Enter' : 'Unlock Wallet'}</span>
      </div>
    </NavLink>
  )
}
