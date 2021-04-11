import React from 'react'
import './index.css'
import bronze from '../../assets/img/bronze@2x.png'
import MyBottom from '../../components/myBottom'

export default function index() {
    return (
        <div className="account">
           <div className="account-content">
              <div  className="account-wallet">
                  <div className="wallet">
                    <label>
                    Your Wallet : 
                    </label>
                    <span>
                    FJEF89934Y924GKJ32G42V5H35VJBK3244B2JK4
                    </span>
                  </div>

                  <div className="verified">
                      Some pools may requre you to be KYC verified<span>KYC for DAOStarter projects</span>
                  </div>
                  <div className="daos-count">
                      <img src={bronze}/>
                       <div>
                       you have <span className="daos-number">0</span> DAOs in your wallet and <span className="daos-number-locked">0</span> locked-in
                       </div>
                  </div>
              </div>
              <div className="account-level">
                   <p>
                   You don’t have a DuckSTARTER Tier yet. Please upgrade your level.
                   </p>
                   <div>

                   </div>
              </div>
              <div className="available-balance">
                   <div className="balance">
                   Available balance:<span>0</span>
                   </div>
                   <div className="balance-handler">
                       <span className="lockin">LOCK-IN</span>
                       <span className="unlock">UNLOCK</span>
                   </div>
                   <div>
                       <span className="balance">Disclaimer:</span>
                       <div className="rules">
                            <div className="dates">
                                <div>
                                there are penalties when you unlock，based on the date you deposited your last tokens：
                                </div>
                                <ul>
                                  <li>
                                    <span>
                                    less than 10 days ago
                                    </span>
                                    <span>
                                    30%
                                    </span>
                                  </li>
                                  <li>
                                    <span>
                                    less than 10 days ago
                                    </span>
                                    <span>
                                    30%
                                    </span>
                                  </li>
                                  <li>
                                    <span>
                                    less than 10 days ago
                                    </span>
                                    <span>
                                    30%
                                    </span>
                                  </li>
                                  <li>
                                    <span>
                                    less than 10 days ago
                                    </span>
                                    <span>
                                    30%
                                    </span>
                                  </li>
                                  <li>
                                    <span>
                                    less than 10 days ago
                                    </span>
                                    <span>
                                    30%
                                    </span>
                                  </li>
                                  <li>
                                    <span>
                                    less than 10 days ago
                                    </span>
                                    <span>
                                    30%
                                    </span>
                                  </li>
                                </ul>
                            </div>
                            <div className="stars">
                            <div>
                            your stars：
                            </div>
                            <ul>
                            <li>
                                    <span>
                                    less than 10 days ago
                                    </span>
                                    <span>
                                    30%
                                    </span>
                                  </li>
                                  <li>
                                    <span>
                                    less than 10 days ago
                                    </span>
                                    <span>
                                    30%
                                    </span>
                                  </li>
                            </ul>
                            </div>
                       </div>
                   </div>
                   
              </div>
           </div>
           <MyBottom className="account-bottom"/>

        </div>
    )
}
