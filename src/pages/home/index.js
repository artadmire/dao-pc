import React, {useState, useEffect} from 'react'
import './index.css'
import MyBottom from '../../components/myBottom'
import UpcomingProject from './components/upcomingProjects/index.js'
import PreviousProject from './components/previousProjects/index.js'
import {Link} from 'react-router-dom'
import {getProjects, getPerviousProjects, projectsData, perviousProjectsData} from '@/service'

function Home (props) {
  const [upComingList, setUpComingList] = useState(projectsData)
  const [previousList, setPreviousList] = useState(perviousProjectsData)

  function handleClick () {

  }
  // useEffect(async () => {
  //   try {
  //     const res = await getProjects();
  //     if (!res || !res.data || !res.data.length) {throw new Error('')}
  //     setUpComingList(res.data)
  //   } catch (error) {
  //     setUpComingList([])
  //   }
  // }, [])

  // useEffect(async () => {
  //   try {
  //     const res = await getPerviousProjects();
  //     if (!res || !res.data || !res.data.length) {throw new Error('')}
  //     setPreviousList(res.data)
  //   } catch (error) {
  //     setPreviousList([])
  //   }
  // }, [])


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
