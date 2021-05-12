import React, {useState, useEffect} from 'react'
import './index.css'
import MyBottom from '../../components/myBottom'
import Level from '@/components/Level'
import { store } from '@/store'
import { getDeposit } from '@/service'
import moment from 'moment'
import {  approve, offer, claim} from '@/events/contracts/transaction'
import {connect} from 'react-redux'
import ctx from '../../events';
import {updateAccount} from '../../events/contracts/accounts'

function Parameter (props) {
  const [data, setData] = useState({})
  const [leftTime, setLeftTime] = useState(0)
  const [days, setDays] = useState('00')
  const [hours, setHours] = useState('00')
  const [minutes, setMins] = useState('00')
  const [seconds, setSeconds] = useState('00')
  const [value, setValue] = useState(100)

  const { isApprove: _approve, account, balances = 0,
    totalSupply = 0, claimed = 0 } = props
  const balance = ((balances || 0) / 10000000000).toFixed(4) || 0
  const poolID = props.match.params.ID;
  console.log('poolID=' + poolID);
  useEffect(() => {
    // 初始化区块链库
    ctx.event.emit('initEthereum');
    return () => {
      window.offerAddress = ''
      window.dtokenAddress = ''
    }
  }, []);

  useEffect(() => {
    let timer = setInterval(() => {
      getTimes()
    }, 1000)

    if (leftTime < 0) {
      clearInterval(timer)
      timer = null
    }
    return () => {
      clearInterval(timer)
      timer = null
    }
  }, [leftTime])

  useEffect(async () => {
    account && fetchData(account)
  }, [account, _approve])

  function changeValue (e) {
    setValue(e.target.value)
  }
  function showMaxValue () {
    setValue(data.maxDepositAvailable || 100)
  }

  async function fetchData (account) {
    try {
      const res = await getDeposit({account, poolID});
      if (!res || !res.data || !res.data.data) {throw new Error('')}
      setData(res.data.data)
      setLeftTime(res.data.data.harvestDate)
    } catch (error) {
      setData({})
    }
  }

  // 授权
  async function handleApprove () {
    if (_approve || !data.hasRoot) {return}
    const res = await approve();
    res && store.dispatch({type: 'ISAPPROVE', payload: true})
  }

  // 质押
  async function handleDeposit () {
    if (!_approve || !data.hasRoot || data.deposited > 0)  {return}
    await offer(value);
    updateAccount()
    fetchData(account)
  }

  // harvest操作
  async function handleHarvest () {
    if (leftTime > 0 || !data.hasRoot) {return}
    await claim(value)
    updateAccount()
    fetchData(account)
  }

  function getTimes () {
    const _leftTime = leftTime - 1000
    setLeftTime(_leftTime)
    if (_leftTime < 0) {return}
    let _days = parseInt(_leftTime / 1000 / 60 / 60 / 24);
    setDays(_days)
    let _hours = parseInt(_leftTime  / 1000 / 60 / 60 % 24);
    setHours(_hours)
    let _minutes = parseInt(_leftTime / 1000 / 60 % 60);
    setMins(_minutes)
    let _seconds = parseInt(_leftTime / 1000 % 60);
    setSeconds(_seconds)

  }


  const now = data.nowDate;
  const perid =  (data.endDate * 1 - data.startDate * 1) || 0
  const diff = data.endDate * 1 - now
  const past = now - data.startDate * 1
  let percent = past / perid
  if (diff <= 0) {
    percent = 1
  }
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
                    {data.totalRewards || 0} {` ${data.earnToken || '-'}`} Token
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
                  <span>{moment(data.startDate * 1).format('DD-MM-YYYY hh:mm')} UTC</span>
                  {
                    diff > 0 ? <span>{moment(data.endDate * 1).format('DD-MM-YYYY hh:mm')} UTC</span> : <span>Finished</span>
                  }
                </div>
                <div className="wrap-dates-detail-process">
                  <div className="dates-detail-process" style={{width: `${percent * 100}%`}} ></div>
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
              <p>{data.details}</p>
            </div>
          </div>
          <div className="parameter-detail-bottom">
            <div className="deposited-availale">
              <div className="title">
                       YOU HAVE <span>{totalSupply / (data.ratio || 1) || 0}</span> {data.depositToken} DEPOSITED from <span>{balance || 0} </span>available for your TIER
              </div>
              <div className="cont">
                <div className="cont-first">
                  <span>INPUT</span>
                  <p>Your Wallet Balance: <span>{balance}</span></p>
                </div>
                <div className="cont-last">
                  <input value={value} onInput={changeValue} readOnly placeholder="0.0" />
                  <div>
                    <span onClick={showMaxValue}>
                        Max
                    </span>
                    {/* <img src={bronze}/> */}
                    {data.depositToken}
                  </div>
                </div>
              </div>
              <div className="sum">
                <div>{totalSupply / (data.ratio || 1)} Deposited</div>
                <div>TOTAL: {balance || 0} {data.depositToken}</div>
              </div>
              <div className="handler">
                <span className={(!_approve && data.hasRoot) ? 'active' : ''} onClick={handleApprove}  >
                  approve
                </span>
                <span className={(_approve && data.hasRoot && !data.deposited) ? 'active' : ''} onClick={handleDeposit}  >
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
                {/* <div>
                  {data.totalRewards || 0} EBOX Token
                </div> */}
              </div>
              <span className={`Harvest ${(leftTime <= 0 && data.hasRoot) ? 'active' : ''}`}  onClick={handleHarvest}  >
              Harvest
              </span>
            </div>
          </div>
        </div>
      </div>
      <MyBottom className="parameter-bottom"/>
    </div>
  );
}

export default connect(({isApprove, account, balances, totalSupply, claimed}) =>
  ({isApprove, account, balances, totalSupply, claimed}))(Parameter);
