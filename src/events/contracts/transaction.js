import Config from '../../config';
import ctx from '../index';
import {  addPid} from './promote';
import { convertByAnoWei, convertByAno } from '../../utils';
import { store } from '../../store'
import { ANOBalanceAction, ANOTotalStakeActionV2, isApproveActionV2, isApproveAction, totalSupplyAction, ANOBalanceActionV2, ANOTotalStakeAction, claimedOfAction } from '../../store/actions'


// 单币矿池
const ANOcontractAddress = '0xb021e33c901844F7E9e593B357dFf6443d7b7F34'// "0x7FDF7Ed3BE4e3A8F27aF520Cfc6769122D3f901C"
const ANOPoolcontractAddress = '0xE1ce3C3fdc7f08DA94f2fa68376a03634682dBd6'// "0x19Ca1Fd0e8A8Ed22bDd6ECa58EAFda49352fdAf3"// "0x2D717a4578427484e92E30D2E421412d4852497E"
const ANOcontractAddressV2 = '0x5716898aC060017AcC05025E916778933915d9B8'
const ANOPoolcontractAddressV2 = '0x91156cdB4E5d5bcb1573E1BF93D041434A716CFf'

const getGofJson = async () => {
  const result = await fetch(`${Config.BaseApi}/token.json`);
  return await result.json();
};

const getGofPoolJson = async () => {
  const result = await fetch(`${Config.BaseApi}/Offering.json`);
  return await result.json();
};
const getGofJsonV2 = async () => {
  const result = await fetch(`${Config.BaseApi}/token.json`);
  return await result.json();
};

const getGofPoolJsonV2 = async () => {
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

  // 代币合约
  const GOF_JSONV2 = await getGofJsonV2();
  const GofContractV2 = TruffleContract(GOF_JSONV2) || {};
  GofContractV2.setProvider(chainProvider);
  ctx.data.GofContractV2 = GofContractV2;

  // 质押合约
  const GOFGTPool_JSONV2 = await getGofPoolJsonV2();
  const GofPoolContractV2 = TruffleContract(GOFGTPool_JSONV2);
  GofPoolContractV2.setProvider(chainProvider);
  ctx.data.GofPoolContractV2 = GofPoolContractV2;
}

export const approve = async () => {
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
export const approveV2 = async () => {
  const { GofContractV2 = {at: () => {}}, chainAccount } = ctx.data;
  const ano = await GofContractV2.at(ANOcontractAddressV2);
  // 授权
  try {
    let res = await ano.approve(
      ANOPoolcontractAddressV2,
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

export const stakeV2 = async (number) => {
  // 质押
  const { GofPoolContractV2 = {at: () => {}}, chainAccount } = ctx.data;
  const pool = await GofPoolContractV2.at(ANOPoolcontractAddressV2);
  try {
    let res =  await pool.stake(
      convertByAno(number) + '',
      {
        from: chainAccount
      }
    );
    alert('success')
    return res;
  } catch (err) {
    alert(err.message);
    ctx.event.emit('hideLoading');
  }
};

// deposit操作 众筹合约的offer方法，amount参数为购买金额。
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

// harvest操作
export const claim = async () => {
  const { GofPoolContract = { at: () => {}}, chainAccount } = ctx.data;
  const pool = await GofPoolContract.at(ANOPoolcontractAddress);
  try {
    let res =  await pool.claim({
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
    alert('success')
    return res;
  } catch (err) {
    alert(err.message);
    ctx.event.emit('hideLoading');
  }
};
// 提取本金
export const withdrawV2 = async (number) => {
  const { GofPoolContractV2 = {at: () => {}}, chainAccount } = ctx.data;
  const pool = await GofPoolContractV2 && GofPoolContractV2.at(ANOPoolcontractAddressV2);
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

// 查看ANO余额 代币合约的balanceOf方法，也就是ppt余额
export const balanceOf = async (address) => {
  const { GofContract = {at: () => {}}, chainAccount } = ctx.data;
  const ano = await GofContract.at(ANOcontractAddress);
  const ANOBalance = ano && await ano.balanceOf(chainAccount);
  ctx.data.ANOBalance = convertByAnoWei(ANOBalance);
  store.dispatch(ANOBalanceAction(ctx.data.ANOBalance))
};

// 查看本金
export const totalStake = async (address) => {
  const { GofPoolContract = {at: () => {}}, chainAccount } = ctx.data;
  const pool = await GofPoolContract.at(ANOPoolcontractAddress);
  const total = typeof pool.balanceOf === 'function' && await pool.balanceOf(chainAccount);
  ctx.data.ANOTotalStake = convertByAnoWei(total);
  store.dispatch(ANOTotalStakeAction(ctx.data.ANOTotalStake))

};

// 查看ANO余额 代币合约的balanceOf方法，也就是ppt余额
export const balanceOfV2 = async (address) => {
  const { GofContractV2 = {at: () => {}}, chainAccount } = ctx.data;
  const ano = await GofContractV2.at(ANOcontractAddressV2);
  const ANOBalance = ano && await ano.balanceOf(chainAccount);
  ctx.data.ANOBalanceV2 = convertByAnoWei(ANOBalance);
  store.dispatch(ANOBalanceActionV2(ctx.data.ANOBalanceV2))
};

// 查看本金
export const totalStakeV2 = async (address) => {
  const { GofPoolContractV2 = {at: () => {}}, chainAccount } = ctx.data;
  const pool = await GofPoolContractV2.at(ANOPoolcontractAddressV2);
  const total = typeof pool.balanceOf === 'function' && await pool.balanceOf(chainAccount);
  ctx.data.ANOTotalStakeV2 = convertByAnoWei(total);
  store.dispatch(ANOTotalStakeActionV2(ctx.data.ANOTotalStake))

};

// 查看总质押量 deposited:     用的是众筹合约的offeredOf方法
export const totalSupply = async () => {
  const { GofPoolContract = {at: () => {}}, chainAccount } = ctx.data;
  const pool = await GofPoolContract.at(ANOPoolcontractAddress);
  const total = typeof pool.offeredOf === 'function' && await pool.offeredOf(chainAccount);
  ctx.data.ANOtotalSupply = convertByAnoWei(total);
  store.dispatch(totalSupplyAction(ctx.data.ANOtotalSupply))

};
// claimed 可取出的代币额度
export const claimedOf = async (address) => {
  const { GofPoolContract = {at: () => {}}, chainAccount } = ctx.data;
  const pool = await GofPoolContract.at(ANOPoolcontractAddress);
  const total = typeof pool.claimedOf === 'function' && await pool.claimedOf(chainAccount);
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
  store.dispatch(isApproveAction(ctx.data.stakeStatus))

};
// 查看是否授权
export const isApproveV2 = async (address) => {
  const { GofContractV2 = {at: () => {}}, chainAccount } = ctx.data;
  const ano = await GofContractV2.at(ANOcontractAddressV2);
  const approveNum = await ano.allowance(chainAccount, ANOPoolcontractAddressV2);
  if (approveNum > convertByAno(100)) {
    ctx.data.stakeStatusV2 = true;
  } else {
    ctx.data.stakeStatusV2 = false;
  }
  store.dispatch(isApproveActionV2(ctx.data.stakeStatusV2))

};

export const getPrice = async () => {
};

