/**
 * 页面事件代理
 */

import ctx from './index';
import { initChain, updateAccount } from './contracts/accounts';
import { initContract, approve, stake, claim, withdraw, totalStake, earned, balanceOf, totalSupply, tranferHT } from './contracts/transaction';
import { LPapprove, LPbalanceOf, LPclaim, LPstake, LPearned, LPwithdraw, LPtotalStake, LPtotalSupply } from './contracts/LPtransaction';
import { getPromoteInfo, transfer, addPid, promoteReward } from './contracts/promote';
import { store } from '../store';
import { accountAction, chainIdAction } from '../store/actions';


ctx.event.listen('showLoading', (message) => {
  ctx.data.showLoading = true;
  ctx.data.loadingMessage = message;
});

ctx.event.listen('hideLoading', (message) => {
  ctx.data.showLoading = false;
  ctx.data.loadingMessage = '';
});

// 初始化并连接账户
ctx.event.listen('initEthereum', async () => {
  console.log('initEthereum', 1)
  await initChain();
  await initContract();
  const { chainProvider } = ctx.data;
  if (chainProvider) {
    const account = await chainProvider.request({ method: 'eth_accounts' });
    await updateAccount(account);
  }
});


ctx.event.listen('connectWallet', async () => {
  await initChain();
  const { chainProvider } = ctx.data;
  console.log(ctx.data, 'ctx.data')
  if (chainProvider) {
    let account = '';
    try {
      account = await chainProvider.request({ method: 'eth_requestAccounts' });
      store.dispatch(accountAction(account[0]))
      await updateAccount(account);
    } catch (err) {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        console.log('Please connect to MetaMask.');
      } else {
        console.error(err);
      }
    }
  }
});

ctx.event.listen('stake', async (params) => {
  const { num, token } = params;
  // todo，逻辑区分token
  // 先approve
  if (ctx.data.stakeStatus !== true) {
    // ctx.event.emit('showLoading', 'APPROVING ON STAKING');
    const result = await approve(ctx.data.ANOBalance);
    ctx.data.stakeStatus = true;
    // TODO: approve成功是怎么样的？==> 暂时用receipt.status
    if (!(result && result.receipt.status)) {
      return;
    }
    // setAsyncData('approved', 1)

    ctx.event.emit('hideLoading');
  } else {
    // ctx.event.emit('showLoading', 'STAKING');
    await stake(num);
    await balanceOf();
    await totalStake();
    await totalSupply();
    // ctx.event.emit('hideLoading');
  }
  // 后质押
  // ctx.data.stakeStatus = 'init';
});

ctx.event.listen('withdraw', async (params) => {
  // ctx.event.emit('showLoading', 'WITHDRAWING');
  const { num, token } = params;
  // todo，逻辑区分token
  const result = await withdraw(num);
  await promoteReward(ctx.data.chainAccount);
  await balanceOf();
  await totalStake();
  // ctx.event.emit('hideLoading');
  if (!result) {
    return;
  }
});

// 获取收益
ctx.event.listen('getReward', async () => {
  // ctx.event.emit('showLoading', 'GETTING REWARDS');
  await claim();
  await balanceOf();
  await earned();
  // ctx.event.emit('hideLoading');
});


// 初始化推广信息
ctx.event.listen('initPromoteInfo', async () => {
  // 触发查询合约余额
  // 查询推广人员信息
  await getPromoteInfo();
});

// 提交请求更新推广人信息
ctx.event.listen('updatePromoteRecommender', async (recommender) => {
  if (recommender.length < 5) {
    alert('Address cannot be empty');
    return;
  }
  // TODO: fetch请求更新服务端推荐人信息
  await tranferHT(ctx.data.chainAccount, recommender);
  // addPid();
  console.log('updatePromoteRecommender', recommender);
});

// 上链
ctx.event.listen('onChain', async () => {
  console.log('上链');
  await transfer(ctx.data.chainAccount);
});


/*

LP矿池方法监听
*/

ctx.event.listen('ANOUSDTstake', async (params) => {
  const { num, token } = params;
  // todo，逻辑区分token
  // 先approve
  if (ctx.data.ANOUSDTstakeStatus !== true) {
    // ctx.event.emit('showLoading', 'APPROVING ON STAKING');
    const result = await LPapprove();
    ctx.data.ANOUSDTstakeStatus = true;
    // TODO: approve成功是怎么样的？==> 暂时用receipt.status
    if (!(result && result.receipt.status)) {
      return;
    }

    ctx.event.emit('hideLoading');
  } else {

    // ctx.event.emit('showLoading', 'STAKING');
    await LPstake(num);
    await LPbalanceOf();
    await LPtotalStake();
    await LPtotalSupply();
    // ctx.event.emit('hideLoading');
  }
  // 后质押
  // ctx.data.stakeStatus = 'init';
});

ctx.event.listen('ANOUSDTwithdraw', async (params) => {
  // ctx.event.emit('showLoading', 'WITHDRAWING');
  const { num, token } = params;
  const result = await LPwithdraw(num);
  await LPbalanceOf();
  await LPtotalStake();
  // ctx.event.emit('hideLoading');
  // console.log(result);
  if (!result) {
    return;
  }
});

// 获取收益
ctx.event.listen('ANOUSDTgetReward', async () => {
  // ctx.event.emit('showLoading', 'GETTING REWARDS');
  await LPclaim();
  await LPbalanceOf();
  await LPearned();
  // ctx.event.emit('hideLoading');
});
