import React, {useState, useEffect} from 'react'
import PreviousProjectItem from '../home/components/previousProjects/previousProjectItem.js'
import './index.css'
import { getPerviousProjects} from '@/service'
import { perviousProjectsData} from '@/service/mock'

export default function PreviousProjectsList () {
  let [list, setList]  = useState(perviousProjectsData)

  useEffect(async () => {
    fetchData()
  }, [])

  async function fetchData () {
    try {
      let res = await getPerviousProjects();
      res = res.data;
      if (!res || !res.data || !res.data.data ||  !res.data.data.length) {throw new Error('')}
      setList(res.data.data)
    } catch (error) {
      setList([])
    }
  }

  return (
    <div className="previous-projects-list">
      <div  className="title mainTitle">Previous Projects</div>
      <div className="previous-projects-list-content">
        {list && list.length ? list.map((item, index) => <PreviousProjectItem key={index}  data={item}  styles={{'marginRight': '56px', 'marginBottom': '56px'}}/>) : <p>暂无数据</p>}
      </div>
    </div>
  )
}
