import React from 'react'
import './index.css'
import bronze from '@/assets/img/bronze@2x.png'


export default function MyModal (props) {
  return (
    <div className="my-modal">
      <div className="parameter-detail-bottom">
        <div className="deposited-availale">
          <div className="title">
          YOU have <span>0</span> DAOs locked-in
          </div>
          <div className="cont">
            <div className="cont-first">
              <span>
                                      INPUT
              </span>
              <span>
                                 Your Wallet Balance: <label>{props.balance}</label>
              </span>
            </div>
            <div className="cont-last">
              <input placeholder="0.0"/>
              <div>
                <span>
                                          Max
                </span>
                <img src={bronze}/>
                                      USDC
              </div>
            </div>
          </div>
          <div className="sum">
            <div>
                             + 0% Fee: 0 USDC
            </div>
            <div>
                             TOTAL: 0 USDC
            </div>
          </div>
          <div className="handler">
            <span onClick={props.onAction} className={`left ${props.active ? 'avtive' : ''}`}> {props.left}</span>
            <span onClick={props.hideModal} className="right">CANCEL</span>
          </div>
        </div>
      </div>
    </div>
  )

}
