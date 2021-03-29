import React from 'react'
import './index.css'
import MyBottom from  '../../components/myBottom'
function About() {
  return (
    <div className="my-about">
      <p className="h1title">ABOUT FFCAP</p>
      <div className="content">
        <div>
          <p className="title">
          Walk With Entrepreneurs
          </p>
          <p className="desc">
          FFCAP invests in blockchain innovation projects for and is committed to investing in long-term value in new growth areas. We are constantly learning and participating with entrepreneurs in the latest technologies and projects.
        </p>
        <p className="title">
        Utilizing capital to help the best projects and teams grow 
        </p>
        <p className="desc">
        We were involved in investment projects since 2017 and have rich experience in how to invest and operate projects. We have many partners, including operations, market, technology, exchange, economic model, business model design and other fields. We can give crpto projects in different stages of development a professional and effective help on a greater degree to help the project to expand its own advantages and characteristics, guiding the project for development of long-term growth.
        </p>
        <p className="title">A long-term value investor with an international perspective.</p>
          <p>
          FFCAP has many partners around the world. We devote all our resources to blockchain innovation and long-term value, and for working with the best blockchain teams around the world. At the same time, FFCAP is looking for more excellent partners in the United States, China and Europe to discover more cutting-edge blockchain business thinking and methods.
          </p>
        </div>
        <div className="my-about-mddle">
          <p className="h1title">PARTNERSHIPS</p>
          <aside className="top-aside">
            <div className="card-grids">
              <a href="javascript:;" className="card"></a>
              <a href="javascript:;" className="card"></a>
              <a className="card"></a>
              <a className="card"></a>
            </div>
            <img className="logs" src='https://ffcap.oss-cn-hangzhou.aliyuncs.com/img/icon1.png'/>
          </aside>
          <aside className="top-aside">
            <div className="imgWrap">
              <a  href="javascript:;" className="card"></a>
            </div>
            <div className="card-grids">
              <a href="javascript:;" className="card"></a>
              <a href="javascript:;" className="card"></a>
              <a href="javascript:;" className="card"></a>
              <a href="javascript:;" className="card"></a>
            </div>
          </aside>
        </div>
      </div>
      <MyBottom className="my-about-bottom"/>
    </div>
  );
}

export default About;