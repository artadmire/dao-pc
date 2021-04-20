import React, {useState, useEffect} from 'react'
import './index.css'
import MyBottom from '../../components/myBottom'

import bronze from '../../assets/img/bronze@2x.png'
import gold from '../../assets/img/gold@2x.png'
import sliver from '../../assets/img/silver@2x.png'
import platinum from '../../assets/img/platinum@2x.png'
const CrossChainSwaps = 'https://daostarter.oss-cn-hangzhou.aliyuncs.com/Cross-chainSwaps%402x.png'
const percent = 0

const listA  = [
  {
    text: 'Cross-chain Swaps',
    imgUrl: 'https://daostarter.oss-cn-hangzhou.aliyuncs.com/Cross-chainSwaps%402x.png'
  },
  {
    text: 'Fixed and Dynamic Swaps',
    imgUrl: 'https://daostarter.oss-cn-hangzhou.aliyuncs.com/FixedandDynamicSwaps%402x.png'
  },
  {
    text: 'Anti-scam Features',
    imgUrl: 'https://daostarter.oss-cn-hangzhou.aliyuncs.com/Anti-scamFeatures%402x.png'
  },
  {
    text: 'Full KYC Integration',
    imgUrl: 'https://daostarter.oss-cn-hangzhou.aliyuncs.com/FullKYCIntegration%402x.png'
  },
  {
    text: 'Governance Model',
    imgUrl: 'https://daostarter.oss-cn-hangzhou.aliyuncs.com/GovernanceModel%402x.png'
  },
  {
    text: 'Permissionless Listing',
    imgUrl: 'https://daostarter.oss-cn-hangzhou.aliyuncs.com/PermissionlessListing%402x.png'
  },
]
function About () {
  let [list1] = useState(listA)
  let [list2] = useState([1, 2, 3, 4, 5, 6, 7, 8])
  useEffect(() => {
    const bg = document.getElementById('boxbg')
    bg.className = 'App app-about'
    return () => {
      bg.className = 'App'
    }
  }, [])
  return (
    <div className="my-about">
      <div className="desc">
        <span className="mainTitle about-title">What is DAOStarter？</span>
        <div className="info introduce">
          {/* className="about-DAo" */}
          <p>
          DAOStarter is a public token launchpad,
          serving for crypto inveestors & projects.  DAOStarter is deployed on BSC, Ethereum and HECO, and cross-chain bridge will be developed to swap assets between different chains.
          </p>
          <p>
          As the final bridge bettween early-stage projects and the crypto community, DAOStarter will pay more attentions on project research & value evaluation to reduce the risk of investors.
          </p>
        </div>
        <p className="info introduce2">
          {/* DAOStarter has an unique level system which requires users to lock-in a <br/>
            certain amount of DST tokens to participate in the launch platform.<br/> */}
            An unique investors rating system is adopted based on the lock-in amounts of DST tokens in smart contract.  Besides, KYC & whitelist is also offered for investors.
          {/* As a service platform, DAOStarter will also offer several KYC options for upcoming projects. */}
        </p>
      </div>
      <div className="level">
        <div className="wrap-level-top">
          <div className="level-top-bg" style={{width: `${percent}`}}>
            <div className="level-top">
              <div style={{left: '25%'}} className='dashed'></div>
              <div  style={{left: '50%'}} className='dashed'></div>
              <div  style={{left: '75%'}}  className='dashed'></div>
            </div>
          </div>
        </div>
        <ul className="level-bottom">
          <li style={{left: '10px'}}>
            <strong>
                  START
            </strong>
          </li>
          <li style={{left: '25%'}}>
            <strong>
                    bronze
            </strong>
            <span>
                    2,000 ducks
            </span>
            <img  src={bronze}/>
          </li>
          <li style={{left: '50%'}}>
            <strong>
              SLIVER
            </strong>
            <span>
                    5,000 ducks
            </span>
            <img  src={sliver}/>
          </li>
          <li style={{left: '75%'}}>
            <strong>
                    GOLD
            </strong>
            <span>
                    10,000 ducks
            </span>
            <img  src={gold}/>
          </li>
          <li style={{right: '20px'}}>
            <strong>
            PLATINUM
            </strong>
            <span>
                    20,000 ducks
            </span>
            <img  src={platinum}/>
          </li>
        </ul>
      </div>
      <div className="character">
        {
          list1.map((item, index) => (
            <a href="javascript:;" key={index} className="character-item">
              <img src={item.imgUrl}/>
              <div className='character-item-desc'>
                {item.text}
              </div>
            </a>
          ))
        }
      </div>
      <div>
        <div className="investors">
          <div className="title">
                    investors
          </div>

          <div className='investors-content'>
            {
              list2.map((index, item) => (
                <a href="javascript:;" key={index} className="wrap-investors-item" >
                  <div  className="investors-item">
                    <img src={CrossChainSwaps}/>
                    <p className='investors-item-desc'>
                      BADISCHE LANDES-BIBLIOTHEK
                    </p>
                  </div>
                </a>
              ))
            }
          </div>

        </div>
      </div>
      <MyBottom className="about-bottom"/>
    </div>
  );
}

export default About;
