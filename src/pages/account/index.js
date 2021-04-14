import React, {useState, useCallback, useEffect} from 'react'
import './index.css'
import wallet from '@/assets/img/wallet@2x.png'
import MyBottom from '@/components/myBottom'
import Level from '@/components/Level'
import MyModel from './components/MyModel'
import { connect } from 'react-redux';
import { getLockin } from '@/service'
import {store} from '@/store'
const _data = {
  kyc: true,  // (true-已认证，false-未认证),
  userLv: 3,   // (0-4,5个等级),
  lastDeposit: 3,  // (3days ago)
}


function Account (props) {
  const {account} = props
  const [visible, setVisible] = useState(false)
  const [data, setData] = useState(_data)


  const hideModal = useCallback(() => {
    setVisible(false)
  })
  const lockIn = useCallback(() => {
    setVisible(true)
  })
  const unlock = useCallback(() => {
    setVisible(true)
  })
  useEffect(async () => {
    const unSubscribe = store.subscribe(() => {
      // this.fetchData()
    })
    // this.fetchData()
    return () => {
      unSubscribe()
    }
  }, [])

  async function fetchData () {
    try {
      const res = await getLockin({account});
      if (!res || !res.data) {throw new Error('')}
      setData(res.data)
    } catch (error) {
      setData({})
    }
  }
  return (
    <div className="account">
      <div className="account-content">
        <div  className="account-wallet">
          <div className="wallet">
            <label>
                    Your Wallet :
            </label>
            <span>
              {props.account}
            </span>
          </div>
          {
            data && data.kyc ? null : <div className="verified">
            Some pools may requre you to be KYC verified <span>KYC for DAOStarter projects</span>
            </div>
          }
          <div className="daos-count">
            <img src={wallet}/>
            <div>
              you have <span className="daos-number">{props.balance || 0}</span> DAOs in your wallet and <span className="daos-number-locked">{data.totalSupply || 0}</span> locked-in
            </div>
          </div>
        </div>
        <div className="account-level">
          <Level level={data.userLv}/>
        </div>
        <div className="available-balance">
          <div className="balance">
                   Available balance:<span>0</span>
          </div>
          <div className="balance-handler">
            <div onClick={lockIn} className="lockin">LOCK-IN</div>
            <div onClick={unlock} className="unlock">UNLOCK</div>
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
      {visible && <MyModel hideModal={hideModal}/>}
    </div>
  )
}
export default connect(({account, balance, totalSupply}) => ({account, balance, totalSupply}))(Account)
