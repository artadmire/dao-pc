import Config from '../../config';
import ctx from '../index';
import {  addPid} from './promote';
import { convertByAnoWei, convertByAno } from '../../utils';
import { store } from '../../store'
import { ANOBalanceAction, totalSupplyAction, ANOTotalStakeAction, claimedOfAction } from '../../store/actions'


// 单币矿池
const ANOcontractAddress = '0xb021e33c901844F7E9e593B357dFf6443d7b7F34'// "0x7FDF7Ed3BE4e3A8F27aF520Cfc6769122D3f901C"
const ANOPoolcontractAddress = '0xE1ce3C3fdc7f08DA94f2fa68376a03634682dBd6'// "0x19Ca1Fd0e8A8Ed22bDd6ECa58EAFda49352fdAf3"// "0x2D717a4578427484e92E30D2E421412d4852497E"

const getGofJson = async () => {
  const result = await fetch(`${Config.BaseApi}/token.json`);
  return await result.json();
};

const getGofPoolJson = async () => {
  const result = await fetch(`${Config.BaseApi}/Offering.json`);
  return await result.json();
};

// 初始化合约
export const initContract = async () => {
  const { chainProvider } = ctx.data;
  if (!chainProvider) {
    console.error('chainProvider not inited');
    return;
  }

  // 异步加载 @truffle 优化体积
  // const TruffleContract = await import(
  //   /* webpackChunkName: 'truffle' */
  //   '@truffle/contract'
  // ).then(m => m.default);
  const TruffleContract = window.TruffleContract;
  // 代币合约
  const GOF_JSON = await getGofJson();
  const GofContract = TruffleContract(GOF_JSON) || {};
  GofContract.setProvider(chainProvider);
  ctx.data.GofContract = GofContract;

  // 质押合约
  const GOFGTPool_JSON = await getGofPoolJson();
  const GofPoolContract = TruffleContract(GOFGTPool_JSON);
  GofPoolContract.setProvider(chainProvider);
  ctx.data.GofPoolContract = GofPoolContract;
}

export const approve = async (number) => {
  const { GofContract = {at: () => {}}, chainAccount } = ctx.data;
  const ano = await GofContract.at(ANOcontractAddress);
  // 授权
  try {
    let res = await ano.approve(
      ANOPoolcontractAddress,
      convertByAno(1000000),
      {
        from: chainAccount
      }
    );
    return res;
  } catch (err) {
    // alert(err.message);
    ctx.event.emit('hideLoading');
  }

};

export const stake = async (number) => {
  // 质押
  const { GofPoolContract = {at: () => {}}, chainAccount } = ctx.data;
  const pool = await GofPoolContract.at(ANOPoolcontractAddress);
  try {
    let res =  await pool.stake(
      convertByAno(number) + '',
      {
        from: chainAccount
      }
    );
    // alert('success')
    return res;
  } catch (err) {
    // alert(err.message);
    ctx.event.emit('hideLoading');
  }
};

// deposit
export const offer = async (number) => {
  // 质押
  const { GofPoolContract = {at: () => {}}, chainAccount } = ctx.data;
  const pool = await GofPoolContract.at(ANOPoolcontractAddress);
  try {
    let res =  await pool.offer(
      convertByAno(number) + '',
      {
        from: chainAccount
      }
    );
    // alert('success')
    return res;
  } catch (err) {
    // alert(err.message);
    ctx.event.emit('hideLoading');
  }
};

// 获取收益
export const claim = async () => {
  const { GofPoolContract = { at: () => {}}, chainAccount } = ctx.data;
  const pool = await GofPoolContract.at(ANOPoolcontractAddress);
  try {
    let res =  await pool.getReward({
      from: chainAccount
    })
    // alert('success')
    return res;
  } catch (err) {
    // alert(err.message);
    ctx.event.emit('hideLoading');
  }
};

// 提取本金
export const withdraw = async (number) => {
  const { GofPoolContract = {at: () => {}}, chainAccount } = ctx.data;
  const pool = await GofPoolContract && GofPoolContract.at(ANOPoolcontractAddress);
  try {
    let res = await pool.withdraw(
      convertByAno(number) + '',
      {
        from: chainAccount
      }
    );
    // alert('success')
    return res;
  } catch (err) {
    // alert(err.message);
    ctx.event.emit('hideLoading');
  }
};

// 转账HT
export const tranferHT = async (account, recommender) => {
  const { chainProvider, chainAccount} = ctx.data;

  try {
    const txHash = await chainProvider.request({
      method: 'eth_sendTransaction',
      params: [{
        from: chainAccount,
        to: '0x015BF3bDd57068721a2f6d16E74Fa41f699c979E',
        value: '0x2386f26fc10000',
      }],
    }).then(function (result) {
      addPid(account, recommender);
    })
  } catch (err) {
    console.log(err)
  }

};

// 查看收益
export const earned = async (address) => {
  const { GofPoolContract = {at: () => {}}, chainAccount } = ctx.data;
  const pool = await GofPoolContract.at(ANOPoolcontractAddress);
  const ANOEarned = typeof pool.earned === 'function' && await pool.earned(chainAccount)
  ctx.data.ANOEarned =  convertByAnoWei(ANOEarned);
};

// 查看ANO余额
export const balanceOf = async (address) => {
  const { GofContract = {at: () => {}}, chainAccount } = ctx.data;
  const ano = await GofContract.at(ANOcontractAddress);
  const ANOBalance = ano && await ano.balanceOf(chainAccount);
  ctx.data.ANOBalance = convertByAnoWei(ANOBalance);
  store.dispatch(ANOBalanceAction(ctx.data.ANOBalance))
};

// 查看本金 用户额度
export const totalStake = async (address) => {
  const { GofPoolContract = {at: () => {}}, chainAccount } = ctx.data;
  const pool = await GofPoolContract.at(ANOPoolcontractAddress);
  const total = typeof pool.balanceOf === 'function' && await pool.balanceOf(chainAccount);
  ctx.data.ANOTotalStake = convertByAnoWei(total);
  store.dispatch(ANOTotalStakeAction(ctx.data.ANOTotalStake))

};

// 查看总质押量
export const totalSupply = async (address) => {
  const { GofPoolContract = {at: () => {}}, chainAccount } = ctx.data;
  const pool = await GofPoolContract.at(ANOPoolcontractAddress);
  const total = typeof pool.offeredOf === 'function' && await pool.offeredOf();
  ctx.data.ANOtotalSupply = convertByAnoWei(total);
  store.dispatch(totalSupplyAction(ctx.data.ANOtotalSupply))

};
// claimed
export const claimedOf = async (address) => {
  const { GofPoolContract = {at: () => {}}, chainAccount } = ctx.data;
  const pool = await GofPoolContract.at(ANOPoolcontractAddress);
  const total = typeof pool.claimedOf === 'function' && await pool.claimedOf();
  ctx.data.claimedOf = convertByAnoWei(total);
  store.dispatch(claimedOfAction(ctx.data.claimedOf))

};

// 查看是否授权
export const isApprove = async (address) => {
  const { GofContract = {at: () => {}}, chainAccount } = ctx.data;
  const ano = await GofContract.at(ANOcontractAddress);
  const approveNum = await ano.allowance(chainAccount, ANOPoolcontractAddress);
  if (approveNum > convertByAno(100)) {
    ctx.data.stakeStatus = true;
  } else {
    ctx.data.stakeStatus = false;
  }
};

export const getPrice = async () => {
};

