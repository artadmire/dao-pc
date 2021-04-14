import React, {useState, useEffect} from 'react'
import './index.css'
import MyBottom from '../../components/myBottom'
import bronze from '../../assets/img/bronze@2x.png'
import Level from '@/components/Level'
import { store } from '@/store'
import { getDeposit } from '@/service'
import moment from 'moment'

const datas = {
  objectName: 'ethbox',
  details: 'ethbox is aDuckDao strategic partner and an up and coming ……',
  website: 'https://www.ethbox,org/',
  start: 50,
  bronze: 100,
  silver: 150,
  gold: 200,
  platinum: 300,
  depositToken: 'USDT',
  depositTokenLogo: 'https……',
  earnToken: 'EBOX',
  depositPeriod: 60,
  maxDepositAvailable: 600,
  startDate: 1618230830112,
  endDate: 1618830830112,
  hasRoot: true,  // (true-拥有参与权限，false-没有参与权限)，
  harvestDate: '0830112',  // (还有多久可以提取，倒计时，单位毫秒)
  level: 1, // 增加
}


function Parameter () {
  const [data, setData] = useState(datas)
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
      const res = await getDeposit({account: store.getState().account});
      if (!res || !res.data) {throw new Error('')}
      setData(res.data)
    } catch (error) {
      setData({})
    }
  }
  const pre = data.endDate - data.startDate
  return (
    <div className="my-parameter">
      <div className="parameter-content">
        <Level level='1' />
        <div className="parameter-detail">
          <div className="parameter-detail-top">
            <div className="deposited">
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
                  Deposit token
                  </span>
                  <span>
                    {data.depositToken}
                  </span>
                  <span>
                  Max. deposit available
                  </span>
                  <span>
                    {data.maxDepositAvailable}
                  </span>
                </li>
                <li>
                  <span>
                  Deposit period
                  </span>
                  <span>
                    {data.depositPeriod} minutes
                  </span>
                  <span>
                  Your Share
                  </span>
                  <span>
                    0%
                  </span>
                </li>
              </ul>
              <div className="dates-detail">
                <div className="dates-detail-title" >
                  <span>Start Date</span>
                  <span>End Date</span>
                </div>
                <div className="dates-detail-time">
                  <span>{moment(data.startDate).format('YYYY-MM-DD hh:mm')} UTC</span>
                  {
                    pre > 0 ? <span>{moment(data.endDate).format('YYYY-MM-DD hh:mm')} UTC</span> : <span>Finished</span>
                  }
                </div>
                <div className="wrap-dates-detail-process">
                  <div className="dates-detail-process" style={{width: '20%'}}></div>
                </div>
              </div>
            </div>
            <div className="ethbox-details">
              <div className="ethbox-details-title">
                {data.objectName} details
              </div>
              <div className="ethbox-details-title-border">

              </div>
              <div className="ethbox-details-website">
                <span>
                  Website:
                </span>
                <a href={data.website}>
                  {data.website}
                </a>
              </div>
              <p>
                {data.details}
                {/* ethbox is a DuckDAO strategic partner and an up and <br/>
                          coming escrow service specializing in security,  <br/>
                          privacy, and effectiveness for the OTC cryptocurrency  <br/>
                          market. It serves as a trustable, transparent and <br/>
                          always-valid intermediary between two parties  <br/>
                          willing to send cryptocurrency one way or both ways. <br/>
                          Instead of sending funds  <br/>
                          directly to each other, funds are relayed through the ethbox smart contract. */}
              </p>
            </div>
          </div>
          <div className="parameter-detail-bottom">
            <div className="deposited-availale">
              <div className="title">
                       YOU HAVE <span>0</span> USDC DEPOSITED from <span>0 </span>available for your TIER
              </div>
              <div className="cont">
                <div className="cont-first">
                  <span>
                                      INPUT
                  </span>
                  <span>
                                 Your Wallet Balance: <label>0</label>
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
                <span>
                            approve
                </span>
                <span>
                            Deposit
                </span>
              </div>
            </div>
            <div className="reward-tokens">
              <div className="title">
                        Reward tokens will be available to harvest in approx.
              </div>
              <ul className="cont">
                <li>
                  <span>
                                DAYS
                  </span>
                  <span>
                                00
                  </span>
                </li>
                <li>
                  <span>
                                DAYS
                  </span>
                  <span>
                                00
                  </span>
                </li>
                <li>
                  <span>
                                DAYS
                  </span>
                  <span>
                                00
                  </span>
                </li>
                <li>
                  <span>
                                DAYS
                  </span>
                  <span>
                                00
                  </span>
                </li>
              </ul>
              <div className="sum">
                <div>
                             Reward (0 while calculating)
                </div>
                <div>
                             0 EBOX Token
                </div>
              </div>
              <div className="handler">
                            approve
              </div>
            </div>
          </div>
        </div>
      </div>
      <MyBottom className="parameter-bottom"/>
    </div>
  );
}

export default Parameter;
