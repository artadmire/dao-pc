import React, {useState, useEffect} from 'react'
import './index.css'
import MyBottom from '../../components/myBottom'
import UpcomingProject from './components/upcomingProjects/index.js'
import PreviousProject from './components/previousProjects/index.js'
import {Link} from 'react-router-dom'
import {getProjects, getPerviousProjects } from '@/service'
import { projectsData, perviousProjectsData } from '@/service/mock'

function Home (props) {
  const [upComingList, setUpComingList] = useState(projectsData)
  const [previousList, setPreviousList] = useState(perviousProjectsData)

  function handleClick () {

  }
  useEffect(async () => {
    fetchPervious()
  }, [])

  useEffect(async () => {
    fetchProjects()
  }, [])

  async function fetchProjects () {
    try {
      let res = await getProjects();
      res = res.data
      if (!res || !res.data || !res.data.data || !res.data.data.length) {throw new Error('')}
      setUpComingList(res.data.data)
    } catch (error) {
      setUpComingList([])
    }
  }

  async function fetchPervious () {
    try {
      let res = await getPerviousProjects();
      res = res.data
      if (!res || !res.data ||  !res.data.data || !res.data.data.length) {throw new Error('')}
      setPreviousList(res.data.data)
    } catch (error) {
      setPreviousList([])
    }
  }

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
