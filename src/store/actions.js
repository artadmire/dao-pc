export const accountAction = (account) => ({
  type: 'ACCOUNT',
  payload: account
})

export const ANOBalanceAction = (balance) => ({
  type: 'ANOBALANCE',
  payload: balance
})
export const ANOBalanceActionV2 = (balance) => ({
  type: 'ANOBALANCEV2',
  payload: balance
})

export const totalSupplyAction = (totalSupply) => ({
  type: 'TOTALSUPPLY',
  payload: totalSupply
})

export const DAOsAction = (daos) => ({
  type: 'DAOS',
  payload: daos
})

export const ANOTotalStakeAction = (tatol) => ({
  type: 'TOTALSTATE',
  payload: tatol
})
export const ANOTotalStakeActionV2 = (tatol) => ({
  type: 'TOTALSTATEV2',
  payload: tatol
})

export const claimedOfAction = (tatol) => ({
  type: 'CLAIMED',
  payload: tatol
})
export const isApproveAction = (bol) => ({
  type: 'ISAPPROVE',
  payload: bol
})
export const isApproveActionV2 = (bol) => ({
  type: 'ISAPPROVEV2',
  payload: bol
})
export const chainIdAction = (chainId) => ({
  type: 'CHAINID',
  payload: chainId
})
