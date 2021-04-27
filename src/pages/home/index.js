import React, {useState, useEffect} from 'react'
import './index.css'
import MyBottom from '../../components/myBottom'
import UpcomingProject from './components/upcomingProjects/index.js'
import PreviousProject from './components/previousProjects/index.js'
import OverProjects from './components/overProjects/index.js'

import {Link} from 'react-router-dom'
import {getProjects, getPerviousProjects } from '@/service'
// import { projectsData, perviousProjectsData } from '@/service/mock'
import {connect} from 'react-redux'

function Home (props) {
  const [upComingList, setUpComingList] = useState([])
  const [previousList, setPreviousList] = useState([])
  const [inProgressList, setInProgressList] = useState([])

  const {chainId, account} = props
  useEffect(() => {
    const bg = document.getElementById('boxbg')
    bg.className = 'App app-Home'
    return () => {
      bg.className = 'App'
    }
  }, [])
  function handleClick () {

  }
  useEffect(async () => {
    fetchPervious()
  }, [chainId])

  useEffect(async () => {
    fetchProjects()
  }, [])

  // 将来的
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
  // 以前和进行中
  async function fetchPervious () {
    try {
      let res = await getPerviousProjects({chainID: chainId});
      res = res.data
      if (!res || !res.data) {throw new Error('')}
      setPreviousList(res.data.over)
      setInProgressList(res.data.open)
    } catch (error) {
      setPreviousList([])
      setInProgressList([])

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
      {inProgressList && inProgressList.length ? <PreviousProject list={inProgressList} account={account} /> : null}
      {previousList && previousList.length ? <OverProjects list={previousList} account={account} /> : null}
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

export default connect(({chainId, account}) => ({chainId, account}))(Home);
