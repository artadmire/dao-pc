import React from 'react'
import './index.css'
import logo from '@/assets/img/logo@2x.png'
import { NavLink } from 'react-router-dom'


function Header (props) {
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
        <span className="unlock-wallet" >Unlock Wallet</span>
      </div>
    </header>
  );
}

export default Header;
