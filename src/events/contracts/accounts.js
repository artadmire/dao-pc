// import detectEthereumProvider from '@metamask/detect-provider';
// import Web3 from 'web3';
import { ETH_NETWORK } from './constants';
import ctx from '../index';
import { showConfirm } from '../../components/Modal';
import { earned, balanceOf, totalStake, totalSupply, isApprove, claimedOf, balanceOfV2, isApproveV2, totalStakeV2 } from './transaction';
import { getANOUSDTinfo } from './LPtransaction';
import { getPromoteInfo, getAPY, getANOPrice } from './promote';
import {store} from '../../store'
import {  chainIdAction } from '../../store/actions';

// 初始化metamask，初始化链上数据
export const initChain = async () => {
  // 异步加载 @metamask 优化体积
  const detectEthereumProvider = await import(

    /* webpackChunkName: 'metamask' */
    '@metamask/detect-provider'
  ).then((m) => m.default);
  // Detect the MetaMask Ethereum provider
  // this returns the provider, or null if it wasn't detected
  const provider = await detectEthereumProvider();
  console.log(provider, 'provider')
  // let currentProvider = web3.currentProvider;
  //               web3.setProvider(currentProvider);
  if (provider) {
    if (provider === window.ethereum) {
      ctx.data.chainProvider = provider;
      const network = await provider.request({
        method: 'net_version',
        params: [],
      });
      ctx.data.chainId = network;
      store.dispatch(chainIdAction(ctx.data.chainId))
      console.log('current network is:', ETH_NETWORK[network]);
      // 注册web3 provider
      // ctx.data.web3 = new Web3(provider);
    } else {
      showConfirm({
        title: 'Please only use MetaMask!',
        content: 'Do you have multiple wallets installed?',
        onOk () {
          window.location.href = 'https://metamask.io/download.html';
        }
      });
    }
  } else {
    // ctx.data.web3 = new Web3.providers.HttpProvider("http://localhost:8545");
    showConfirm({
      title: 'Please install MetaMask!',
      content: 'You have not install MetaMask, jump link to install?',
      onOk () {
        window.location.href = 'https://metamask.io/download.html';
      }
    });
  }
};

// 更新账号信息
export const updateAccount = async (account) => {
  console.log('updateAccount ......');
  if (account && account.length) {
    const chainAccount = account[0];
    ctx.data.chainAccount = chainAccount;
    if (window.offerAddress && window.dtokenAddress) {
      balanceOf();
      isApprove();
      totalStake();
      earned();
      totalSupply();
      claimedOf()
    }
    balanceOfV2()
    isApproveV2();
    totalStakeV2();
  }
}
