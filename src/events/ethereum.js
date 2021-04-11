/**
 * 合约事件处理主入口
 */

// 账户初始化
import './contracts/accounts';
// 推广初始化
import './contracts/promote';
// 合约初始化
import './contracts/transaction';
// 页面事件代理
import './pageDelegate';

// const test = async () => {
//   const { chainProvider, web3 } = ctx.data;
//   const result = await chainProvider.request({
//     method: 'eth_getStorageAt',
//     params: [
//       "0xBccD744E2b57D101AEb1A4dE3Fa3cfbc6423d7Fd",
//       "0x0",
//       "latest",
//     ],
//   });
//   web3.eth.getAccounts((err, data) => {
//     console.log('web3.eth:', err, data)
//   });
// }
