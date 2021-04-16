import React, {useState, useEffect} from 'react'
import './index.css'
import MyBottom from '../../components/myBottom'
import bronze from '../../assets/img/bronze@2x.png'
import Level from '@/components/Level'
import { store } from '@/store'
import { getDeposit } from '@/service'
import moment from 'moment'
import { isApprove, approve, offer, claim} from '@/events/contracts/transaction'
import ctx from '@/events'
import {connect} from 'react-redux'

const datas = {
  'status': 1000,
  'data': {
    'earnToken': 'PWT',
    'depositPeriod': 60,
    'maxDepositAvailable': 10.0,
    'harvestDate': '830112',
    'website': 'http://www.anobor.com/',
    'depositTokenLogo': 'http://www.anobor.com/',
    'endDate': '1618830830112',
    'totalDeposited': 0.0,
    'start': 50,
    'bronze': 100,
    'gold': 200,
    'platinum': 300,
    'yourShare': 10.0,
    'depositToken': 'PPT',
    'hasRoot': true,
    'objectName': 'Anobor',
    'details': `ethbox is aDuckDao strategic partner and an up and coming ethbox is aDuckDao strategic partner and an up and comingethbox is aDuckDao strategic partner 
    and an up and coming ethbox is aDuckDao strategic partner and an up and coming`,
    'silver': 150,
    'startDate': '1618230830112'
  }
}


function Parameter (props) {
  const [data, setData] = useState({})
  const [leftTime, setLeftTime] = useState(-1)
  const [days, setDays] = useState('00')
  const [hours, setHours] = useState('00')
  const [minutes, setMins] = useState('00')
  const [seconds, setSeconds] = useState('00')
  const [value, setValue] = useState(0)

  const { isApprove: _approve, account, balances = 0,
    ANOTotalStake = 0, totalSupply = 0, claimed = 0 } = props
  const balance = ((balances || 0) / 1000000000000000000).toFixed(4) || 0

  useEffect(() => {
    let timer = setInterval(() => {
      getTimes()
    }, 1000)

    return () => {
      clearInterval(timer)
      timer = null
    }
  }, [leftTime])

  useEffect(async () => {
    account && fetchData(account)
    // 查看收否授权
    if (account && !_approve) {
      await isApprove(account);
      store.dispatch({type: 'ISAPPROVE', payload: ctx.data.stakeStatus})
    }
  }, [account])

  function changeValue (e) {
    console.log(ctx.data, 'ctx.data')
    console.log(props)
    setValue(e.target.value)
  }

  async function fetchData (account) {
    try {
      const res = await getDeposit({account});
      if (!res || !res.data || !res.data.data) {throw new Error('')}
      setData(res.data.data)
      setLeftTime(res.data.data.harvestDate)
    } catch (error) {
      setData({})
    }
  }

  // 授权
  async function handleApprove () {
    if (_approve)  {return}
    const res = await approve(value);
    res && store.dispatch({type: 'ISAPPROVE', payload: true})
    console.log(ctx.data, 'ctx.data')
  }
  // 质押
  async function handleDeposit () {
    if (!_approve || leftTime > 0)  {return}
    const res = await offer(value);
  }

  function getTimes () {
    if (leftTime <= 0) {return}
    const _leftTime = leftTime - 1000
    let _days = parseInt(_leftTime / 1000 / 60 / 60 / 24);
    setDays(_days)
    let _hours = parseInt(_leftTime  / 1000 / 60 / 60 % 24);
    setHours(_hours)
    let _minutes = parseInt(_leftTime / 1000 / 60 % 60);
    setMins(_minutes)
    let _seconds = parseInt(_leftTime / 1000 % 60);
    setSeconds(_seconds)
    setLeftTime(_leftTime)

  }

  async function handleHarvest () {
    // if (leftTime >= 0) {return}
    claim()
  }


  const pre = data.endDate * 1 - data.startDate * 1
  return (
    <div className="my-parameter">
      <div className="parameter-content">
        <Level level={data.level || 0} />
        <div className="parameter-detail">
          <div className="parameter-detail-top">
            <div className="deposited">
              <ul>
                <li>
                  <span>
                     Total Rewards
                  </span>
                  <span>
                    {data.totalRewards || 0} EBOX Token
                  </span>
                  <span>
                    Total USDC deposited
                  </span>
                  <span>
                    {data.totalDeposited || 0}
                  </span>
                </li>
                <li>
                  <span>
                  Deposit token
                  </span>
                  <span>
                    {` ${data.depositToken || '-'}`}
                  </span>
                  <span>
                  Max. deposit available
                  </span>
                  <span>
                    {data.maxDepositAvailable || 0}
                  </span>
                </li>
                <li>
                  <span>
                  Deposit period
                  </span>
                  <span>
                    {data.depositPeriod || 0} minutes
                  </span>
                  <span>
                  Your Share
                  </span>
                  <span>
                    {data.yourShare || 0}%
                  </span>
                </li>
              </ul>
              <div className="dates-detail">
                <div className="dates-detail-title" >
                  <span>Start Date</span>
                  <span>End Date</span>
                </div>
                <div className="dates-detail-time">
                  <span>{moment(data.startDate * 1).format('YYYY-MM-DD hh:mm')} UTC</span>
                  {
                    pre > 0 ? <span>{moment(data.endDate * 1).format('YYYY-MM-DD hh:mm')} UTC</span> : <span>Finished</span>
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
                       YOU HAVE <span>{totalSupply || 0}</span> USDC DEPOSITED from <span>{ANOTotalStake || 0} </span>available for your TIER
              </div>
              <div className="cont">
                <div className="cont-first">
                  <span>INPUT</span>
                  <p>Your Wallet Balance: <span>{balance}</span></p>
                </div>
                <div className="cont-last">
                  <input onInput={changeValue} placeholder="0.0" />
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
                             + 0% Fee: {totalSupply} Deposited
                </div>
                <div>
                             TOTAL: {ANOTotalStake || 0} USDC
                </div>
              </div>
              <div className="handler">
                <span onClick={handleApprove} className={!_approve ? 'active' : ''}>
                            approve
                </span>
                <span onClick={handleDeposit} className={(_approve && leftTime <= 0) ? 'active' : ''}>
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
                  <span>DAYS</span>
                  <span>{days}</span>
                </li>
                <li>
                  <span>HOURS</span>
                  <span>{hours}</span>
                </li>
                <li>
                  <span>MINUTES</span>
                  <span>{minutes}</span>
                </li>
                <li>
                  <span>SECONDS</span>
                  <span>{seconds}</span>
                </li>
              </ul>
              <div className="sum">
                <div>
                             Reward ({claimed} while calculating)
                </div>
                <div>
                  {data.totalRewards || 0} EBOX Token
                </div>
              </div>
              <div onClick={handleHarvest} className={`handler ${leftTime <= 0 ? 'active' : ''}`}>
              Harvest
              </div>
            </div>
          </div>
        </div>
      </div>
      <MyBottom className="parameter-bottom"/>
    </div>
  );
}

export default connect(({isApprove, account, balances, ANOTotalStake, totalSupply, claimed}) =>
  ({isApprove, account, balances, ANOTotalStake, totalSupply, claimed}))(Parameter);
