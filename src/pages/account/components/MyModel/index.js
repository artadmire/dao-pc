import React from 'react'
import './index.css'
import bronze from '@/assets/img/bronze@2x.png'


function MyModal (props) {
  function handleChange (e) {
    const {onChange} = props
    typeof onChange === 'function' && onChange(e.target.value)
  }
  function showMaxValue () {
    const {onChange} = props
    typeof onChange === 'function' && onChange(props.ANOTotalStakeAccount)
  }
  return (
    <div className="my-modal">
      <div className="parameter-detail-bottom">
        <div className="deposited-availale">
          <div className="title">
          YOU have <span>{props.balance}</span> DSTs locked-in
          </div>
          <div className="cont">
            <div className="cont-first">
              <span>
                                      INPUT
              </span>
              <span>
                                 Your Wallet Balance: <label>{props.ANOTotalStakeAccount || 0}</label>
              </span>
            </div>
            <div className="cont-last">
              <input onInput={handleChange} placeholder="0.0"/>
              <div>
                <span onClick={showMaxValue}>
                                          Max
                </span>
                {/* <img src={bronze}/> */}
                                      DST
              </div>
            </div>
          </div>
          <div className="handler">
            <p onClick={props.onAction} className={`left ${props.active ? 'avtive' : ''}`}> {props.left}</p>
            <p onClick={props.hideModal} className="right">CANCEL</p>
          </div>
        </div>
      </div>
    </div>
  )

}
export default MyModal
