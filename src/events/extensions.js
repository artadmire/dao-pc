import ctx from './index';

export default [
  {
    name: 'default',
    data: {
      // web3连接器
      web3: 1,
      // eth连接器
      chainProvider: 1,
      // 用户账户
      chainAccount: 1,
      // 账户余额
      chainBalance: 1,
      // 是否loading
      showLoading: 1,
      // loading展示文案
      loadingMessage: 1
    }
  },
  {
    name: 'contract',
    data: {
      // 合约
      GofContract: 1,
      // 质押合约
      GofPoolContract: 1,
      // 质押状态
      stakeStatus: 1,
      claimStatus: 1,
      // 提现状态
      withdrawStatus: 1,
      // 合约价格
      ANOPrice: 1,
      // 全部质押数
      ANOTotalStake: 1
    }
  },
  {
    name: 'assets',
    data: {
      // ANO余额
      ANOBalance: 1,
      // ANO可取消质押数量
      ANOStaked: 1,
      // ANO挖矿收益
      ANOEarned: 1,
      // 收益率
      ANOProfit: 1,
      // 总质押量
      ANOtotalSupply: 1,
      // 是否授权
      stakeStatus: 1,
      // 年化收益APY
      pool1APY: 0,
      // ANO单币矿池已分红量
      allUserRevenue: 0,
    }
  },
  {
    name: 'LPMine',
    data: {
      ANOUSDTBalance: 1,
      ANOUSDTEarned: 1,
      ANOUSDTTotalStake: 1,
      ANOUSDTtotalSupply: 1,
      ANOUSDTstakeStatus: 1,
      LPpool1APY: 0,
    }
  },
  {
    name: 'promote',
    data: {
      promoteAvailable: 1,
      promotePaddress: 1,
      promoteBlocked: 1,
      promotePidStatus: 1,
      recommenderTemp: 1,
      ANOPrice: 0,
    }
  }
];
