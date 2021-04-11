import React from 'react'
import './index.css'

function myBottom(props) {
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
           <a>Terms</a>
           <a>Privacy</a>
          </div>

          <div className="icon">
          <a href="javascript:;"><img src='https://ffcap.oss-cn-hangzhou.aliyuncs.com/img/twitter%402x.png' /></a>
          <a href="javascript:;"><img src='https://ffcap.oss-cn-hangzhou.aliyuncs.com/img/discord%402x.png'/></a>
          <a href="javascript:;"><img src='https://ffcap.oss-cn-hangzhou.aliyuncs.com/img/medium%402x.png'/></a>
          <a href="javascript:;"><img src='https://ffcap.oss-cn-hangzhou.aliyuncs.com/img/telegram%402x.png'/></a>
          <a href="javascript:;"><img src='https://ffcap.oss-cn-hangzhou.aliyuncs.com/img/email%402x.png'/></a>
          </div>
      </div>
    </div>
  );
}

export default myBottom;