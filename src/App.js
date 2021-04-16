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
import ctx from './events';
import './events/ethereum';

function App () {
  useEffect(() => {
    // 初始化区块链库
    ctx.event.emit('initEthereum');
  }, []);
  return (
    <div className={`App ${window.location.pathname === '/apply' ? 'applyBg' : ''}`}>
      <div className="content">
        <BrowserRouter >
          <Header/>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/about" component={About}></Route>
            <Route path="/account" component={Account}></Route>
            <Route path="/parameter" component={Parameter}></Route>
            <Route path="/apply" component={Apply}></Route>
            <Route path="/project-list" component={PreviousProjects}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
