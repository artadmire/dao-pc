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
           ©2021 DuckDAO. All rights reserved. About Terms Privacy
        </p>
      </div>
      <div className="bottom-right">
        <div className="term-privacy">
          <a href="javascript:;" >Terms</a>
          <a href="javascript:;">Privacy</a>
        </div>
        <div className="icon">
          {
            list.map((i) => <a key={i.url} href={i.href}><img src={i.url} /></a>)
          }
        </div>
      </div>
    </div>
  );
}

export default myBottom;
