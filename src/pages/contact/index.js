import React from 'react'
import './index.css'
function Contact() {
  return (
    <div className="Contact">
      <div className="card">
        <img src='https://ffcap.oss-cn-hangzhou.aliyuncs.com/img/%E4%BD%8D%E5%9B%BE%402x.png'/>
        <p >Contact By App</p>
        <div className="icons">
          <a href="javascript:;"><img src='https://ffcap.oss-cn-hangzhou.aliyuncs.com/img/twitter%402x.png'/></a>
          <a href="javascript:;"><img src='https://ffcap.oss-cn-hangzhou.aliyuncs.com/img/discord%402x.png'/></a>
          <a href="javascript:;"><img src='https://ffcap.oss-cn-hangzhou.aliyuncs.com/img/medium%402x.png'/></a>
          <a href="javascript:;"><img src='https://ffcap.oss-cn-hangzhou.aliyuncs.com/img/telegram%402x.png'/></a>
        </div>
      </div>
      <div className="card">
        <img src='https://ffcap.oss-cn-hangzhou.aliyuncs.com/img/%E4%BD%8D%E5%9B%BE%402x%202.png'/>
        <p>Contact By Email</p>
        <span>contact@ffcap.com</span>
      </div>
    </div>
  );
}

export default Contact;