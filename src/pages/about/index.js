import React,{useState} from 'react'
import './index.css'
import bronze from '../../assets/img/bronze@2x.png'
import CrossChainSwaps from '../../assets/img/Cross-chain Swaps@2x.png'

function About() {
  let [list1] = useState([1,2,3,4,5,6,7,8])
  let [list2] = useState([1,2,3,4,5,6,7,8])

  return (
    <div className="my-about">
      <div className="desc">
        <span className="mainTitle about-title">WhatisDAOStarter？</span>
        <div className="info introduce">
          <p className="about-DAo">
            DAOStarter is a public token launchpad, a service platform for crypto projects.
          </p> 
          <p>
            It will act as the final bridge between early-stage projects and the community before the project goes fully public.
          </p>         
          </div>
          <p className="info">
            DAOStarter has an unique level system which requires users to lock-in a <br/>
            certain amount of DST tokens to participate in the launch platform.<br/>
            As a service platform, DAOStarter will also offer several KYC options for upcoming projects.
          </p>
      </div>
      <div className="level">
            <div className="level-top">

            </div>
            <ul className="level-bottom">
                  <li>
                  start
                  </li>
                  <li>
                    <strong>
                    bronze
                    </strong>
                    <span>
                    2,000 ducks
                    </span>
                    <img  src={bronze}/>
                  </li>
                  <li>
                    <strong>
                    bronze
                    </strong>
                    <span>
                    2,000 ducks
                    </span>
                    <img  src={bronze}/>
                  </li>
                  <li>
                    <strong>
                    bronze
                    </strong>
                    <span>
                    2,000 ducks
                    </span>
                    <img  src={bronze}/>
                  </li>
                  <li>
                    <strong>
                    bronze
                    </strong>
                    <span>
                    2,000 ducks
                    </span>
                    <img  src={bronze}/>
                  </li>
            </ul>
      </div>
      <div className="character">
      {
        list1.map((index,item)=>(
              <a href="javascript:;" className="character-item">
                    <img src ={CrossChainSwaps}/>
                    <div>
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
                list2.map((index,item)=>(
                      <a href="javascript:;" key={index} className="investors-item">
                        {item}
                      </a>
                ))
              }
            </div>

            </div>
      </div>
    </div>
  );
}

export default About;