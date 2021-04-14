import Config from '../../config';
import ctx from '../index';
import {  addPid} from './promote';
import { convertByAnoWei, convertByWei, convertByAno, convertByEth } from '../../utils';
// const ANOcontractAddress = "0xCd56f257C28d66FC7cA0bb3596721814Be15328B";   //respon地址
// const ANOPoolcontractAddress = "0x30628290Fd21b53bE400345910ce7b23bB60d487";

// lp矿池测试
const ANOcontractAddress = '0xa7578687c70328eE48Ab35fe673969eb14e97B2e'// "0x7FDF7Ed3BE4e3A8F27aF520Cfc6769122D3f901C"
const ANOPoolcontractAddress = '0xcf0a9775d57820ba42E13bf066943b5188BD2287'// "0xd1668Db7Da8898E34D0E2972c5073cB2cD586115"// "0x2D717a4578427484e92E30D2E421412d4852497E"

export const LPapprove = async (number) => {
  const { GofContract, chainAccount } = ctx.data;
  const ano = await GofContract.at(ANOcontractAddress);
  // 授权
  try {
    let res = await ano.approve(
      ANOPoolcontractAddress,
      convertByEth(1000000),
      {
        from: chainAccount
      }
    );
    return res;
  } catch (err) {
    console.log(err);
    // alert(err.message);
    ctx.event.emit('hideLoading');
  }

};

export const LPstake = async (number) => {
  // 质押
  const { GofPoolContract, chainAccount } = ctx.data;
  const pool = await GofPoolContract.at(ANOPoolcontractAddress);
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

// 获取收益
export const LPclaim = async () => {
  const { GofPoolContract, chainAccount } = ctx.data;
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
export const LPwithdraw = async (number) => {
  const { GofPoolContract, chainAccount } = ctx.data;
  const pool = await GofPoolContract.at(ANOPoolcontractAddress);
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
    // alert(err.message);
    ctx.event.emit('hideLoading');
  }
};


// 查看收益
export const LPearned = async (address) => {
  const { GofPoolContract, chainAccount } = ctx.data;
  const pool = await GofPoolContract.at(ANOPoolcontractAddress);
  const ANOEarned = await pool.earned(chainAccount)
  ctx.data.ANOUSDTEarned =  convertByAnoWei(ANOEarned);
};

// 查看ANO-USDT余额
export const LPbalanceOf = async (address) => {
  const { GofContract, chainAccount } = ctx.data;
  const ano = await GofContract.at(ANOcontractAddress);
  const ANOUSDTBalance = await ano.balanceOf(chainAccount);
  ctx.data.ANOUSDTBalance = convertByWei(ANOUSDTBalance) + '';
};

// 查看本金
export const LPtotalStake = async (address) => {
  const { GofPoolContract, chainAccount } = ctx.data;
  const pool = await GofPoolContract.at(ANOPoolcontractAddress);
  const total = await pool.balanceOf(chainAccount);
  ctx.data.ANOUSDTTotalStake = convertByWei(total);
};

// 查看总质押量
export const LPtotalSupply = async (address) => {
  const { GofPoolContract, chainAccount } = ctx.data;
  const pool = await GofPoolContract.at(ANOPoolcontractAddress);
  const total = await pool.totalSupply();
  ctx.data.ANOUSDTtotalSupply = convertByWei(total);


};

// 查看是否授权
export const LPisApprove = async (address) => {
  const { GofContract, chainAccount } = ctx.data;
  const ano = await GofContract.at(ANOcontractAddress);
  const approveNum = await ano.allowance(chainAccount, ANOPoolcontractAddress);

  if (approveNum > convertByEth(1000)) {
    ctx.data.ANOUSDTstakeStatus = true;
  } else {
    ctx.data.ANOUSDTstakeStatus = false;
  }
};

// 获取ANOUSDT矿池数据
export const getANOUSDTinfo = async (address) => {
  await LPtotalSupply();
  await LPisApprove();
  await LPbalanceOf();
  await LPtotalStake();
  await LPearned();
};


