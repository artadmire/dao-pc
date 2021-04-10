import React, {useState} from 'react'
import './App.css';
import { Tabs } from 'antd';
import Home from './pages/home'
import About from './pages/about'
import PreviousProjects from './pages/previousProjects'
import Account from './pages/account'
import Apply from './pages/apply'
import 'antd/dist/antd.css';
import logo from '../src/assets/img/logo@2x.png'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
const { TabPane } = Tabs;

function App() {
  const [tabKey, setTabkey] = useState('/');
  function callback(key) {
    setTabkey(key)
  }
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
          <a className="unlock-wallet" href="javacsript:;">Unlock Wallet</a>
        </header>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/about" component={About}></Route>
            <Route path="/previous" component={PreviousProjects}></Route>
            <Route path="/apply" component={Apply}></Route>
            <Route path="/account" component={Account}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
