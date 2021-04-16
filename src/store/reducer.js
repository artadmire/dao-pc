const initState = {
  account: '',
  balances: 0, // 钱包余额 用户额度
  totalSupply: 0,
  DAOs: 0,
  isApprove: false,
  ANOTotalStake: 0,
  claimed: 0
}

export function accountReducer (state = initState, action) {
  switch (action.type) {
  case 'ACCOUNT':
    console.log(action, 'ac')
    return {
      ...state,
      account: action.payload
    }
  case 'ANOBALANCE':
    return {
      ...state,
      balances: action.payload
    }
  case 'TOTALSUPPLY':
    return {
      ...state,
      totalSupply: action.payload
    }
  case 'DAOS':
    return {
      ...state,
      DAOs: action.payload
    }
  case 'ISAPPROVE':
    return {
      ...state,
      isApprove: action.payload
    }
  case 'TOTALSTATE':
    return {
      ...state,
      ANOTotalStake: action.payload
    }
  case 'CLAIMED':
    return {
      ...state,
      claimed: action.payload
    }
  default:
    return {
      ...state
    }
  }
}
