import React, {useState, useEffect} from 'react'
import './App.css';
import { Tabs } from 'antd';
import Home from './pages/home'
import About from './pages/about'
import PreviousProjects from './pages/previousProjects'
import Account from './pages/account'
import Parameter from './pages/parameter'

import Apply from './pages/apply'
import 'antd/dist/antd.css';
import logo from '../src/assets/img/logo@2x.png'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import ctx, { mapData, unmapActions } from './events';

const { TabPane } = Tabs;

function App() {
  const [tabKey, setTabkey] = useState('/');
  useEffect(() => {
    // 初始化区块链库
    ctx.event.emit('initEthereum');
  }, []);
  function callback(key) {
    setTabkey(key)
  }
 

  useEffect(() => {
    console.log(88)
    const lifetimeObj = {};
    // 页面初始化，监听钱包连接状态
    mapData({
      chainAccount(chainAccount) {
        console.log('chainAccount')
        if (chainAccount) {
          // setAccount(chainAccount);
          // 如果已连接钱包，进入买入页面
          // history.replace('/list');
          console.log(chainAccount)
        } else {
          // history.replace('/');
          console.log('000')
        }
      }
    }, ctx, lifetimeObj);
    return () => {
      unmapActions(lifetimeObj);
    };
  });

  return (
    <div className={`App ${tabKey === '1' && 'appBg'} ${tabKey === '2' && 'aboutBg'}`}>
        <div className="content">
        <header>
          <h2>
            <img src={logo} className="logo"/>
          </h2>
          <Tabs 
            defaultActiveKey={tabKey}
            onChange={callback}
            activeKey={tabKey}
            tabBarStyle={ {color: '#B2B7CC'}}
          >
            <TabPane tab="ABOUT" key="/"/>
            <TabPane tab="ACCOUNT" key="/about" />
            <TabPane tab="INVESTMENTS" key="/previous" />
            <TabPane tab="CONTACT US" key="/apply" />
          </Tabs>
          <a className="unlock-wallet" href="javascript:;">Unlock Wallet</a>
        </header>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/about" component={About}></Route>
            <Route path="/previous" component={PreviousProjects}></Route>
            <Route path="/apply" component={Apply}></Route>
            <Route path="/account" component={Account}></Route>
            <Route path="/parameter" component={Parameter}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
