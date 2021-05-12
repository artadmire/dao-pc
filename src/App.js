import React, {useEffect, useState} from 'react'
import './App.css';
import Home from './pages/home'
import About from './pages/about'
import PreviousProjects from './pages/previousProjects'
import Account from './pages/account'
import Parameter from './pages/parameter'
import Header from './components/Header'
import Apply from './pages/apply'
import 'antd/dist/antd.css';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import ctx from './events';
import './events/ethereum';

function App () {
  useEffect(() => {
    connectWallet()
  }, [])

  const connectWallet = () => {
    const { chainAccount } = ctx.data;
    if (chainAccount) {
      return;
    }
    ctx.event.emit('connectWallet');
  }

  return (
    <div className='App' id="boxbg">
      <div className="content">
        <HashRouter >
          <Header/>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/about" component={About}></Route>
            <Route path="/account" component={Account}></Route>
            <Route path="/parameter/:ID" component={Parameter}></Route>
            <Route path="/apply" component={Apply}></Route>
            <Route path="/project-list" component={PreviousProjects}></Route>
            <Redirect to="/" ></Redirect>
          </Switch>
        </HashRouter>
      </div>
    </div>
  );
}

export default App;
