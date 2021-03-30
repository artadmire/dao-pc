import React,{useState} from 'react'
import './index.css'
import MyBottom from  '../../components/myBottom'
import  ImageText from '../../assets/img/Twitter@2x.png'
import bronze from '../../assets/img/bronze@2x.png'
import CrossChainSwaps from '../../assets/img/Cross-chain Swaps@2x.png'

function About() {
  let [list1] = useState([1,2,3,4,5,6,7,8])
  let [list2] = useState([1,2,3,4,5,6,7,8])

  return (
    <div className="my-about">
      <p className="title">WhatisDAOStarter？</p>
      <div className="content">
            <div className="info introduce">
                <div>
                DAOStarter is a public token launchpad, a service platform for crypto projects.
                </div> 

                <div>
                It will act as the final bridge between early-stage projects and the community before the project goes fully public.
                </div>         
          </div>
            <div className="info">
            DAOStarter has an unique level system which requires users to lock-in a <br/>
            certain amount of DST tokens to participate in the launch platform.<br/>
            As a service platform, DAOStarter will also offer several KYC options for upcoming projects.
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
                      <a className="character-item">
                           <img src ={CrossChainSwaps}/>
                           <div>
                             sdfs
                             </div>
                      </a>
                ))
              }
            </div>

          
        </div>
      <div>
      <div className="investors">
                    <div className="title">
                    investors
                    </div>

                    <div className='investors-content'>
              {
                list2.map((index,item)=>(
                      <a className="investors-item">
                              11
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