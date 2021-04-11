import React,{useState} from 'react'
import './index.css'
import MyBottom from '../../components/myBottom'

import bronze from '../../assets/img/bronze@2x.png'
import CrossChainSwaps from '../../assets/img/Cross-chain Swaps@2x.png'

function Parameter() {
  let [list1] = useState([1,2,3,4,5,6,7,8])
  let [list2] = useState([1,2,3,4,5,6,7,8])

  return (
    <div className="my-parameter">
      <div className="parameter-content">
           <div className="parameter-detail">
               <div className="parameter-detail-top">
                  <div>
                      <ul>
                          <li>
                              <span>
                              Total Rewards
                              </span>
                              <span>
                              0 EBOX Token
                                </span>
                                <span>
                                Total USDC deposited
                                </span>
                                <span>
                                0
                                </span>
                          </li>
                          <li>
                              <span>
                              Total Rewards
                              </span>
                              <span>
                              0 EBOX Token
                                </span>
                                <span>
                                Total USDC deposited
                                </span>
                                <span>
                                0
                                </span>
                          </li>
                          <li>
                              <span>
                              Total Rewards
                              </span>
                              <span>
                              0 EBOX Token
                                </span>
                                <span>
                                Total USDC deposited
                                </span>
                                <span>
                                0
                                </span>
                          </li>
                      </ul>
                      <div>
                          <div>
                            <span>Start Date</span>
                            <span>End Date</span>
                          </div>
                          <div>
                          <span>Start Date</span>
                            <span>End Date</span>
                          </div>
                          <div>

                          </div>
                      </div>
                  </div>
                   <div className="ethbox-details">www</div>
                     
                  </div>
           </div>
      </div>
      <MyBottom className="Parameter-bottom"/>
    </div>
  );
}

export default Parameter;