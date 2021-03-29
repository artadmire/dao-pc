import React from 'react'
import './index.css'
import MyBottom from '../../components/myBottom'

function Home(props) {
  function handleClick() {
    const { onHandleClick } = props
    typeof onHandleClick === 'function' && onHandleClick()
  }
  return (
    <div className="home">
      <div className="des">
        <p className="title">Building Dreams</p>
        <p>for</p>
        <p>Blockchain Entrepreneurs</p>
      </div>
      <span onClick={handleClick} className="about">ABOUT  FFCAP</span>
      <MyBottom className="home-bottom"/>
    </div>
  );
}

export default Home;