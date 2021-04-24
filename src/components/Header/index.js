import React, {useEffect} from 'react'
import './index.css'
import logo from '@/assets/img/logo@2x.png'
import { NavLink } from 'react-router-dom'
import ctx, { mapData, unmapActions } from '../../events';
import { showInfo } from '../Modal';
import { connect} from 'react-redux'
import { store } from '@/store'
import {accountAction} from '@/store/actions'

function Header (props) {
  const { account } = props

  const connectWallet = () => {
    const { chainAccount } = ctx.data;
    if (chainAccount) {
      showInfo({
        content: `Your wallet address is already connected:\n${chainAccount}`
      });
      return;
    }
    ctx.event.emit('connectWallet');
  }

  useEffect(() => {
    const lifetimeObj = {};
    // 页面初始化，监听钱包连接状态
    mapData({
      chainAccount (chainAccount) {
        if (chainAccount) {
          store.dispatch(accountAction(chainAccount))
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
          <NavLink className="navtab" to='/' exact>
            <img src={logo} className="logo"/>
          </NavLink>
          <NavLink className="navtab" to='/' exact>HOME</NavLink>
          <NavLink className="navtab" to='/bridge'>BRIDGE</NavLink>
          <NavLink className="navtab" to='/about'>ABOUT</NavLink>
          <NavLink className="navtab" to='/account'>ACCOUNT</NavLink>
        </div>
        <p onClick={connectWallet} className="unlock-wallet" >{account ? account : 'Unlock Wallet'}</p>
      </div>
    </header>
  );
}

export default connect(({account}) => ({account}))(Header);
