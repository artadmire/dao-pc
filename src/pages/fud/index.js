import React, {useState} from 'react'
import './index.css'
import MyBottom from  '../../components/myBottom'

function Fud() {
  const [list] = useState([
    {img:'https://ffcap.oss-cn-hangzhou.aliyuncs.com/img/matic.png', title: "MATIC" },
    {img:'https://ffcap.oss-cn-hangzhou.aliyuncs.com/img/1inch.png', title: "1INCH" },
    {img:'https://ffcap.oss-cn-hangzhou.aliyuncs.com/img/aave.png', title: "AAVE" },
    {img:'https://ffcap.oss-cn-hangzhou.aliyuncs.com/img/dot.png', title: "DOT" },
    {img:'https://ffcap.oss-cn-hangzhou.aliyuncs.com/img/ksm.png', title: "KSM" },
    {img:'https://ffcap.oss-cn-hangzhou.aliyuncs.com/img/mdx.png', title: "MDX" },
    {img:'https://ffcap.oss-cn-hangzhou.aliyuncs.com/img/near.png', title: "NEAR" },
    {img:'https://ffcap.oss-cn-hangzhou.aliyuncs.com/img/plm.png', title: "PLM" }])
  return (
    <div className="Fud">
      <div>
        <p className="h1title" >FFCAP FUND</p>
        <div className="content">
        {
          list.map((item, index) => <div key={index} className="card">
            <a href="javascript:;"><img src={item.img}/></a>
          <p>{item.title}</p>
        </div>)
        }
        
        </div>
      </div>
      <MyBottom className="Fud-bottom"/>
    </div>
  );
}

export default Fud;