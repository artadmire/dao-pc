import React, {useState, useEffect} from 'react'
import PreviousProjectItem from '../home/components/previousProjects/previousProjectItem.js'
import './index.css'
import { getPerviousProjects} from '@/service'
import {connect} from 'react-redux'

function PreviousProjectsList (props) {
  let [list, setList]  = useState([])
  const {chainId} = props
  useEffect(async () => {
    fetchData()
  }, [chainId])

  async function fetchData () {
    try {
      let res = await getPerviousProjects({chainID: chainId});
      res = res.data;
      if (!res || !res.data) {throw new Error('')}
      setList(res.data.all)
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
export default connect(({chainId}) => ({chainId}))(PreviousProjectsList)
