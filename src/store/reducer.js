const initState = {
  account: '',
  balance: 0,
  totalSupply: 0,
  DAOs: 0
}

export function accountReducer (state = initState, action) {
  switch (action.type) {
  case 'ACCOUNT':
    console.log(action, 'action')
    return {
      ...state,
      account: action.payload
    }
  case 'ANOBALANCE':
    return {
      ...state,
      balance: action.payload
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
  default:
    return {
      ...state
    }
  }
}
