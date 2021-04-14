const ETH_TO_WEI = window.BigInt(Math.pow(10, 18));
const ANO_TO_WEI = window.BigInt(Math.pow(10, 8));

// 将wei换算成eth单位，除以18
export const convertByWei = (wei) => {
  const bigWei = window.BigInt(wei);
  // 保留5位小数
  return window.Number(bigWei * 100000n / ETH_TO_WEI) / 100000;
};

// 将wei换算成ano单位，除以8
export const convertByAnoWei = (wei) => {
  const bigWei = window.BigInt(wei);
  // 保留5位小数
  return window.Number(bigWei * 100000n / ANO_TO_WEI) / 100000;
};

// 将eth换算成wei单位，乘以18
export const convertByEth = (eth) => window.BigInt(eth * Math.pow(10, 18));

// 将ano换算成wei单位，乘以8
export const convertByAno = (num) => window.BigInt(num * Math.pow(10, 8));

// 乘以10
export const convertMultipleTen = (num) => window.BigInt(num * Math.pow(10, 10));
