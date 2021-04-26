import React, {useEffect, useState} from 'react'
import './index.css'
import logo from '@/assets/img/logo@2x.png'
import { NavLink } from 'react-router-dom'
import ctx, { mapData, unmapActions } from '../../events';
import { showInfo } from '../Modal';
import { connect} from 'react-redux'
import { store } from '@/store'
import {accountAction} from '@/store/actions'
import ComingModel from '../ComingModel'
import {changeNetwork} from '../../events/contracts/accounts'

const chainMap = {
  1: 'ETH',
  128: 'HECO',
  56: 'BSC'
}
function address (account, chainId) {
  if (!account) {return 'Unlock Wallet'}
  if (account && (chainId !== 1 && chainId !== 56 && chainId !== 128)) {return 'Wrong NetWork'}
  return account;
}

function Header (props) {
  const { account, chainId } = props
  const [show, setShow] = useState(false)

  function handlerHideModal (val) {
    setShow(val)
  }

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
          <NavLink className="navtab" onClick={() => handlerHideModal(true)}  to='/bridge'>BRIDGE</NavLink>
          <NavLink className="navtab" to='/about'>ABOUT</NavLink>
          <NavLink className="navtab" to='/account'>ACCOUNT</NavLink>
        </div>
        <div className="h-right">
          <span className={`${chainMap[chainId] ? '' : 'wrong'}`}>{chainMap[chainId] || 'Wrong NetWork'}</span>
          <p onClick={connectWallet} className={`unlock-wallet ${address(account, chainId) === 'Wrong NetWork' && 'wrong'}`} >{address(account, chainId)}</p>
        </div>
      </div>
      {show ? <ComingModel  hideModal={handlerHideModal}/> : null}
    </header>
  );
}

export default connect(({account, chainId}) => ({account, chainId}))(Header);
