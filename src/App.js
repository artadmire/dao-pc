import React, {useEffect} from 'react'
import './App.css';
import Home from './pages/home'
import About from './pages/about'
import PreviousProjects from './pages/previousProjects'
import Account from './pages/account'
import Parameter from './pages/parameter'
import Header from './components/Header'

import Apply from './pages/apply'
import 'antd/dist/antd.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import ctx, { mapData, unmapActions } from './events';


function App() {
  
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
    <div className='App'>
      <div className="content">
        <BrowserRouter >
          <Header/>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/about" component={About}></Route>
            <Route path="/previous" component={PreviousProjects}></Route>
            <Route path="/apply" component={Apply}></Route>
            <Route path="/account" component={Account}></Route>
            <Route path="/parameter/:id" component={Parameter}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
