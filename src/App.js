import React, {useState} from 'react'
import './App.css';
import { Tabs } from 'antd';
import Home from './pages/home'
import About from './pages/about'
import Fud from './pages/fud'
import Contact from './pages/contact'
import Account from './pages/account'
import 'antd/dist/antd.css';
import logo from '../src/assets/img/logo@2x.png'

const { TabPane } = Tabs;

function App() {
  const [tabKey, setTabkey] = useState('1');
  function callback(key) {
    setTabkey(key)
  }
  function handleClick() {
    console.log(2)
    setTabkey("2")
  }
  return (
    <div className={`App ${tabKey === '1' && 'appBg'} ${tabKey === '2' && 'aboutBg'}`}>
        <div className="content">
        <header>
          <h2>
            <img src={logo} className="logo"/>
          </h2>
          <div>
            <Tabs 
            defaultActiveKey={tabKey}
            onChange={callback}
            activeKey={tabKey}
            tabBarStyle={ {color: '#B2B7CC'}}
            >
              <TabPane tab="ABOUT" key="2"/>
              <TabPane tab="ACCOUNT" key="5" />
              <TabPane tab="INVESTMENTS" key="3" />
              <TabPane tab="CONTACT US" key="4" />
            </Tabs>
          </div>
          <a className="unlock-wallet" href="javacsript:;">Unlock Wallet</a>
        </header>
        {tabKey === '1' && <Home onHandleClick={handleClick} />}
        {tabKey === '2' && <About />}
        {tabKey === '5' && <Account />}
        {tabKey === '3' && <Fud />}
        {tabKey === '4' && <Contact />}
      </div>
    </div>
  );
}

export default App;
