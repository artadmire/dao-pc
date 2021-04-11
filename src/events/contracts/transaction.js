import Config from '../../config';
import ctx from '../index';
import {  addPid} from './promote';
import { convertByAnoWei,convertByWei,convertByAno,convertByEth } from '../../utils';
// const ANOcontractAddress = "0xCd56f257C28d66FC7cA0bb3596721814Be15328B";   //respon地址
// const ANOPoolcontractAddress = "0x30628290Fd21b53bE400345910ce7b23bB60d487";
//单币矿池
const ANOcontractAddress = "0x9e9842bd60ca6cdd4d17532433a2ea41c723a40d"// "0x7FDF7Ed3BE4e3A8F27aF520Cfc6769122D3f901C"
const ANOPoolcontractAddress = "0x88Ea862e4b718Dcdc9a857EbE7Bd0707E2f7730C"//"0x19Ca1Fd0e8A8Ed22bDd6ECa58EAFda49352fdAf3"// "0x2D717a4578427484e92E30D2E421412d4852497E"
const getGofJson = async () => {
  const result = await fetch(`${Config.BaseApi}/GOF.json`);
  return await result.json();
};

const getGofPoolJson = async () => {
  const result = await fetch(`${Config.BaseApi}/GOFGTPool.json`);
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
  const GofContract = TruffleContract(GOF_JSON);
  GofContract.setProvider(chainProvider);
  ctx.data.GofContract = GofContract;

  // 质押合约
  const GOFGTPool_JSON = await getGofPoolJson();
  const GofPoolContract = TruffleContract(GOFGTPool_JSON);
  GofPoolContract.setProvider(chainProvider);
  ctx.data.GofPoolContract = GofPoolContract;
}

export const approve = async (number) => {
  const { GofContract, chainAccount } = ctx.data;
  const ano = await GofContract.at(ANOcontractAddress);
  // 授权
  try{
    let res = await ano.approve(
        ANOPoolcontractAddress,
        convertByAno(1000000),
        {
          from: chainAccount
        }
    );
    return res;
  } catch (err) {
    console.log(err);
    //alert(err.message);
    ctx.event.emit('hideLoading');
  }

};

export const stake = async (number) => {
  // 质押
  const { GofPoolContract, chainAccount } = ctx.data;
  const pool = await GofPoolContract.at(ANOPoolcontractAddress);
  try {
    let res =  await pool.stake(
        convertByAno(number)+"",
        {
          from: chainAccount
        }
    );
    //alert('success')
    return res;
  }catch (err) {
    //alert(err.message);
    ctx.event.emit('hideLoading');
  }
};

// 获取收益
export const claim = async () => {
  const { GofPoolContract, chainAccount } = ctx.data;
  const pool = await GofPoolContract.at(ANOPoolcontractAddress);
  try {
    let res =  await pool.getReward({
      from: chainAccount
    })
    //alert('success')
    return res;
  } catch (err) {
    //alert(err.message);
    ctx.event.emit('hideLoading');
  }
};

//提取本金
export const withdraw = async (number) => {
  const { GofPoolContract, chainAccount } = ctx.data;
  const pool = await GofPoolContract.at(ANOPoolcontractAddress);
  try {
    let res = await pool.withdraw(
        convertByAno(number)+"",
        {
          from: chainAccount
        }
    );
    //alert('success')
    return res;
  } catch (err) {
    //alert(err.message);
    ctx.event.emit('hideLoading');
  }
};

//转账HT
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
  }catch (err) {

  }

};

//查看收益
export const earned = async (address) => {
  const { GofPoolContract, chainAccount } = ctx.data;
  const pool = await GofPoolContract.at(ANOPoolcontractAddress);
  const ANOEarned = await pool.earned(chainAccount)
  ctx.data.ANOEarned =  convertByAnoWei(ANOEarned);
};

// 查看ANO余额
export const balanceOf = async (address) => {
  const { GofContract, chainAccount } = ctx.data;
  const ano = await GofContract.at(ANOcontractAddress);
  const ANOBalance = await ano.balanceOf(chainAccount);
  ctx.data.ANOBalance = convertByAnoWei(ANOBalance);
};

// 查看本金
export const totalStake = async (address) => {
  const { GofPoolContract, chainAccount } = ctx.data;
  const pool = await GofPoolContract.at(ANOPoolcontractAddress);
  const total = await pool.balanceOf(chainAccount);
  ctx.data.ANOTotalStake = convertByAnoWei(total);
};

// 查看总质押量
export const totalSupply = async (address) => {
  const { GofPoolContract, chainAccount } = ctx.data;
  const pool = await GofPoolContract.at(ANOPoolcontractAddress);
  const total = await pool.totalSupply();
  ctx.data.ANOtotalSupply = convertByAnoWei(total);

};

// 查看是否授权
export const isApprove = async (address) => {
  const { GofContract, chainAccount } = ctx.data;
  const ano = await GofContract.at(ANOcontractAddress);
  const approveNum = await ano.allowance(chainAccount,ANOPoolcontractAddress);
  if (approveNum>convertByAno(100)){
    ctx.data.stakeStatus = true;
  }else {
    ctx.data.stakeStatus = false;
  }
};

export const getPrice = async () => {
};

