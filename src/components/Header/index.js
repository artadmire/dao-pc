import React, {useEffect, useState} from 'react'
import './index.css'
import logo from '@/assets/img/logo@2x.png'
import { NavLink } from 'react-router-dom'
import ctx, { mapData, unmapActions } from '../../events';
import { showInfo } from '../Modal';

function Header (props) {
  const [account, setAccount] = useState('');

  const connectWallet = () => {
    const { chainAccount } = ctx.data;
    if (chainAccount) {
      showInfo({
        content: `Your wallet address is already connected:\n${chainAccount}`
      });
      return;
    }
    ctx.event.emit('connectWallet');
    console.log(ctx.data, 'ctx.data')
  }

  useEffect(() => {
    const lifetimeObj = {};
    // 页面初始化，监听钱包连接状态
    mapData({
      chainAccount (chainAccount) {
        if (chainAccount) {
          setAccount(chainAccount);
          window.account = chainAccount
          // 如果已连接钱包，进入买入页面
        }
      }
    }, ctx, lifetimeObj);
    return () => {
      unmapActions(lifetimeObj);
    };
  }, []);

  return (
    <header className='wrap-header'>
      <div className='header'>
        <div className="header-left">
          <NavLink className="navtab" to='/'>
            <img src={logo} className="logo"/>
          </NavLink>
          <NavLink className="navtab" to='/about'>ABOUT</NavLink>
          <NavLink className="navtab" to='/account'>ACCOUNT</NavLink>
        </div>
        <p onClick={connectWallet} className="unlock-wallet" >{account ? account : 'Unlock Wallet'}</p>
      </div>
    </header>
  );
}

export default Header;
