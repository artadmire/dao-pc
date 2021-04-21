import Config from '../../config';
import ctx from '../index';
import {  addPid} from './promote';
import { convertByAnoWei, convertByEth, convertByAno, convertByWei } from '../../utils';
import { store } from '../../store'
import { ANOBalanceAction, ANOTotalStakeActionV2, isApproveActionV2, isApproveAction, totalSupplyAction, ANOBalanceActionV2, ANOTotalStakeAction, claimedOfAction } from '../../store/actions'


// // 单币矿池
// const ANOcontractAddress = window.dtokenAddress
// const ANOPoolcontractAddress = window.offerAddress
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


const getGofPoolJsonV2 = async () => {
  const result = await fetch(`${Config.BaseApi}/pool.json`);
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
  ctx.data.GofContractV2 = GofContract;

  // 质押合约
  const GOFGTPool_JSON = await getGofPoolJson();
  const GofPoolContract = TruffleContract(GOFGTPool_JSON);
  GofPoolContract.setProvider(chainProvider);
  ctx.data.GofPoolContract = GofPoolContract;


  // 质押合约
  const GOFGTPool_JSONV2 = await getGofPoolJsonV2();
  const GofPoolContractV2 = TruffleContract(GOFGTPool_JSONV2);
  GofPoolContractV2.setProvider(chainProvider);
  ctx.data.GofPoolContractV2 = GofPoolContractV2;
}

export const approve = async () => {
  const { GofContract = {at: () => {}}, chainAccount } = ctx.data;
  if (!window.dtokenAddress) {return}
  const ano = await GofContract.at(window.dtokenAddress);
  // 授权
  try {
    let res = await ano.approve(
      window.offerAddress,
      convertByEth(1000000),
      {
        from: chainAccount
      }
    );
    console.log(res)
  } catch (err) {
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
      convertByEth(1000000), // 1000000
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
  const pool = await GofPoolContract.at(window.offerAddress);
  try {
    let res =  await pool.stake(
      convertByEth(number) + '',
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
      convertByEth(number) + '',
      {
        from: chainAccount
      }
    );
    alert('success')
    return res;
  } catch (err) {
    console.info(err.message);
    ctx.event.emit('hideLoading');
  }
};

// deposit操作 众筹合约的offer方法，amount参数为购买金额。
export const offer = async (number) => {
  // 质押
  const { GofPoolContract = {at: () => {}}, chainAccount } = ctx.data;
  const pool = await GofPoolContract.at(window.offerAddress);
  try {
    let res =  await pool.offer(
      convertByEth(number) + '',
      {
        from: chainAccount
      }
    );
    alert('success')
    return res;
  } catch (err) {
    console.info(err.message);
    ctx.event.emit('hideLoading');
  }
};

// harvest操作
export const claim = async () => {
  const { GofPoolContract = { at: () => {}}, chainAccount } = ctx.data;
  const pool = await GofPoolContract.at(window.offerAddress);
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
  const pool = await GofPoolContract && GofPoolContract.at(window.offerAddress);
  try {
    let res = await pool.withdraw(
      convertByEth(number) + '',
      {
        from: chainAccount
      }
    );
    alert('success')
    return res;
  } catch (err) {
    console.info(err.message)
    ctx.event.emit('hideLoading');
  }
};
// 提取本金
export const withdrawV2 = async (number) => {
  const { GofPoolContractV2 = {at: () => {}}, chainAccount } = ctx.data;
  const pool = await GofPoolContractV2 && GofPoolContractV2.at(ANOPoolcontractAddressV2);
  try {
    let res = await pool.withdraw(
      convertByEth(number) + '',
      {
        from: chainAccount
      }
    );
    // alert('success')
    return res;
  } catch (err) {
    console.info(err.message)
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
export const earned = async () => {
  const { GofPoolContract = {at: () => {}}, chainAccount } = ctx.data;
  const pool = await GofPoolContract.at(window.offerAddress);
  const ANOEarned = typeof pool.earned === 'function' && await pool.earned(chainAccount)
  ctx.data.ANOEarned = convertByWei(ANOEarned);
};

// 查看ANO余额 代币合约的balanceOf方法，也就是ppt余额
export const balanceOf = async () => {
  const { GofContract = {at: () => {}}, chainAccount } = ctx.data;
  const ano = await GofContract.at(window.dtokenAddress);
  const ANOBalance = ano && await ano.balanceOf(chainAccount);
  ctx.data.ANOBalance =  convertByAnoWei(ANOBalance);
  store.dispatch(ANOBalanceAction(ctx.data.ANOBalance))
};

// 查看本金
export const totalStake = async () => {
  const { GofPoolContract = {at: () => {}}, chainAccount } = ctx.data;
  const pool = await GofPoolContract.at(window.offerAddress);
  const total = typeof pool.balanceOf === 'function' && await pool.balanceOf(chainAccount);
  ctx.data.ANOTotalStake =  convertByAnoWei(total);
  store.dispatch(ANOTotalStakeAction(ctx.data.ANOTotalStake))

};

// 查看ANO余额 代币合约的balanceOf方法，也就是ppt余额
export const balanceOfV2 = async (address) => {
  const { GofContractV2 = {at: () => {}}, chainAccount } = ctx.data;
  const ano = await GofContractV2.at(ANOcontractAddressV2);
  const ANOBalance = ano && await ano.balanceOf(chainAccount);
  ctx.data.ANOBalanceV2 =  convertByAnoWei(ANOBalance);
  store.dispatch(ANOBalanceActionV2(ctx.data.ANOBalanceV2))
};

// 查看本金
export const totalStakeV2 = async (address) => {
  const { GofPoolContractV2 = {at: () => {}}, chainAccount } = ctx.data;
  const pool = await GofPoolContractV2.at(ANOPoolcontractAddressV2);
  const total = typeof pool.balanceOf === 'function' && await pool.balanceOf(chainAccount);
  ctx.data.ANOTotalStakeV2 =  convertByWei(total);
  store.dispatch(ANOTotalStakeActionV2(ctx.data.ANOTotalStakeV2))

};

// 查看总质押量 deposited:     用的是众筹合约的offeredOf方法
export const totalSupply = async () => {
  const { GofPoolContract = {at: () => {}}, chainAccount } = ctx.data;
  const pool = await GofPoolContract.at(window.offerAddress);
  const total = typeof pool.offeredOf === 'function' && await pool.offeredOf(chainAccount);
  ctx.data.ANOtotalSupply =  convertByWei(total);
  store.dispatch(totalSupplyAction(ctx.data.ANOtotalSupply))

};
// claimed 可取出的代币额度
export const claimedOf = async () => {
  const { GofPoolContract = {at: () => {}}, chainAccount } = ctx.data;
  const pool = await GofPoolContract.at(window.offerAddress);
  const total = typeof pool.claimedOf === 'function' && await pool.claimedOf(chainAccount);
  ctx.data.claimedOf =  convertByWei(total);
  store.dispatch(claimedOfAction(ctx.data.claimedOf))

};

// 查看是否授权
export const isApprove = async () => {
  const { GofContract = {at: () => {}}, chainAccount } = ctx.data;
  const ano = await GofContract.at(window.dtokenAddress);
  const approveNum = await ano.allowance(chainAccount, window.offerAddress);
  if (approveNum >  convertByAno(100)) {
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
  if (approveNum >  convertByAno(100)) {
    ctx.data.stakeStatusV2 = true;
  } else {
    ctx.data.stakeStatusV2 = false;
  }
  store.dispatch(isApproveActionV2(ctx.data.stakeStatusV2))

};

export const getPrice = async () => {
};

