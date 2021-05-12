import React from 'react'
import './index.css'
import { list } from './constant'

function myBottom (props) {
  const { className = ''} = props
  return (
    <div className={`myBottom ${className}`}>
      <div className="bottom-left">
        <p className="bottom-logo">
          <span>D</span>
          <span>DAOStarter</span>
        </p>
        <p className="copy">
           ©2021 DAOStarter. All rights reserved. About Terms Privacy
        </p>
      </div>
      <div className="bottom-right">
        <div className="term-privacy">
          <a href="https://daostarter.oss-cn-hangzhou.aliyuncs.com/DAOSTARTER%20TERMS%20AND%20CONDITIONS.pdf" >Terms</a>
          <a href="https://daostarter.oss-cn-hangzhou.aliyuncs.com/PRIVACY%20POLICY.pdf" >Privacy</a>
        </div>
        <div className="icon">
          {
            list.map((i) => <a title={i.title} key={i.url} href={i.href}><img src={i.url} /></a>)
          }
        </div>
      </div>
    </div>
  );
}

export default myBottom;
