import React, {useState} from 'react'
import './index.css'
import MyBottom from '../../components/myBottom'
import UpcomingProject from './components/upcomingProjects/index.js'
import PreviousProject from './components/previousProjects/index.js'
import {Link} from 'react-router-dom'
import ctx from '../../events';

function Home(props) {
  const [upComingList, setUpComingList] = useState([1,2,3,4,5,6,4,4])
  const [previousList, setPreviousList] = useState([1,2,4,4,5,5,5])

  function handleClick() {
    // const { onHandleClick } = props
    // typeof onHandleClick === 'function' && onHandleClick()
    const { chainAccount } = ctx.data;
    console.log(chainAccount, 'chainAccount')
  }
  
  ctx.event.emit('connectWallet');

  return (
    <div className="home">
      <div className="des">
        <div className="title">DAOStarter</div>
        <div className="title1">The Booster for Crypto Projects</div>
        <div className="title2">Providing the access to funding blockchain projects</div>
      </div>
      {upComingList && upComingList.length ? <UpcomingProject list={upComingList} /> : null}
      {previousList && previousList.length ? <PreviousProject list={previousList} /> : null}
       <div className="user-applay">
        <div className="title">
          Start your dream on
        </div>
        <div className="title title2">
          DAOStarter 
        </div>
        <Link to='/apply' onClick={handleClick} className="start">APPLY HERE</Link>
       </div>
      <MyBottom className="home-bottom"/>
    </div>
  );
}

export default Home;