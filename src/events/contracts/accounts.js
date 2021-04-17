// import detectEthereumProvider from '@metamask/detect-provider';
// import Web3 from 'web3';
import { ETH_NETWORK } from './constants';
import ctx from '../index';
import { showConfirm } from '../../components/Modal';
import { earned, balanceOf, totalStake, totalSupply, isApprove, claimedOf, balanceOfV2, isApproveV2, totalStakeV2 } from './transaction';
import { getANOUSDTinfo } from './LPtransaction';
import { getPromoteInfo, getAPY, getANOPrice } from './promote';

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
  if (provider) {
    if (provider === window.ethereum) {
      ctx.data.chainProvider = provider;
      const network = await provider.request({
        method: 'net_version',
        params: [],
      });
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
    // getANOPrice();
    // getPromoteInfo(chainAccount);
    // getAPY(1);
    // getAPY(2);
    balanceOf(chainAccount);
    balanceOfV2(chainAccount)
    // getANOUSDTinfo();
    isApprove();
    isApproveV2();
    totalStake(chainAccount);
    totalStakeV2(chainAccount);
    earned(chainAccount);
    totalSupply();
    claimedOf()
  }
}
