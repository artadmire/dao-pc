import React, {useState} from 'react'
import './index.css'
import MyBottom from '../../components/myBottom'

import bronze from '../../assets/img/bronze@2x.png'
import CrossChainSwaps from '../../assets/img/Cross-chain Swaps@2x.png'

const percent = '40%'

function About () {
  let [list1] = useState([1, 2, 3, 4, 5, 6, 7, 8])
  let [list2] = useState([1, 2, 3, 4, 5, 6, 7, 8])

  return (
    <div className="my-about">
      <div className="desc">
        <span className="mainTitle about-title">What is DAOStarter？</span>
        <div className="info introduce">
          <p className="about-DAo">
            DAOStarter is a public token launchpad, a service platform for crypto projects.
          </p>
          <p>
            It will act as the final bridge between early-stage projects and the community before the project goes fully public.
          </p>
        </div>
        <p className="info introduce2">
            DAOStarter has an unique level system which requires users to lock-in a <br/>
            certain amount of DST tokens to participate in the launch platform.<br/>
            As a service platform, DAOStarter will also offer several KYC options for upcoming projects.
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
                  start
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
                    bronze
            </strong>
            <span>
                    5,000 ducks
            </span>
            <img  src={bronze}/>
          </li>
          <li style={{left: '75%'}}>
            <strong>
                    bronze
            </strong>
            <span>
                    10,000 ducks
            </span>
            <img  src={bronze}/>
          </li>
          <li style={{right: '20px'}}>
            <strong>
                    bronze
            </strong>
            <span>
                    20,000 ducks
            </span>
            <img  src={bronze}/>
          </li>
        </ul>
      </div>
      <div className="character">
        {
          list1.map((index, item) => (
            <a href="javascript:;" key={index} className="character-item">
              <img src={CrossChainSwaps}/>
              <div className='character-item-desc'>
                 sdfs
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
