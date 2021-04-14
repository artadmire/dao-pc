import React, {useState, useEffect} from 'react'
import PreviousProjectItem from '../home/components/previousProjects/previousProjectItem.js'
import './index.css'
import {getPerviousProjects, perviousProjectsData} from '@/service'

export default function PreviousProjectsList () {
  let [list, setList]  = useState(perviousProjectsData)
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
    <div className="previous-projects-list">
      <div  className="title mainTitle">Previous Projects</div>
      <div className="previous-projects-list-content">
        {list && list.length ? list.map((item, index) => <PreviousProjectItem key={index}  data={item}  styles={{'marginRight': '56px', 'marginBottom': '56px'}}/>) : <p>暂无数据</p>}
      </div>
    </div>
  )
}
