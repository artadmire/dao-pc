import ctx from '../index';
import { convertByAnoWei, convertByWei, convertByEth } from '../../utils';

// lp矿池测试
const ANOcontractAddress = '0xb021e33c901844F7E9e593B357dFf6443d7b7F34'// "0x7FDF7Ed3BE4e3A8F27aF520Cfc6769122D3f901C"
const ANOPoolcontractAddress = '0xE1ce3C3fdc7f08DA94f2fa68376a03634682dBd6'// "0xd1668Db7Da8898E34D0E2972c5073cB2cD586115"// "0x2D717a4578427484e92E30D2E421412d4852497E"

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
  console.log(GofPoolContract, 'GofPoolContract')
  const pool = await GofPoolContract.at(ANOPoolcontractAddress);
  const ANOEarned = await typeof pool.earned === 'function' && pool.earned(chainAccount)
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
  const total =  typeof pool.balanceOf === 'function' && await pool.balanceOf(chainAccount);
  ctx.data.ANOUSDTTotalStake = convertByWei(total);
};

// 查看总质押量
export const LPtotalSupply = async (address) => {
  const { GofPoolContract, chainAccount } = ctx.data;
  const pool = await GofPoolContract.at(ANOPoolcontractAddress);
  const total =  typeof pool.totalSupply === 'function' && await pool.totalSupply();
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


