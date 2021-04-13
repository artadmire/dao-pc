import axios from 'axios'

const prefix = ''
const projects =  `${prefix}/starter/projects`
const perviousProjects =  `${prefix}/starter/perviousProjects`
const deposit =  `${prefix}/starter/deposit`
const lockin =  `${prefix}/starter/lockin`


export const getProjects = (params) => axios.get(projects, {params})
export const getPerviousProjects = (params) => axios.get(perviousProjects, {params})
export const getDeposit = (params) => axios.get(deposit, {params})
export const getLockin = (params) => axios.get(lockin, {params})

export const projectsData = [
  {
    url: '',
    logo: 'https:xxxx',
    isOpen: 1,  // (1-已结束，2-开启中，3-未开始)
    days: 3
  },
  {
    logo: 'https:xxxx',
    isOpen: 3,
    days: 3
  },
  {
    logo: 'https:xxxx',
    isOpen: 2,
    days: 3
  },
  {
    logo: 'https:xxxx',
    isOpen: 2,
    days: 3
  },
  {
    logo: 'https:xxxx',
    isOpen: 2,
    days: 3
  }, {
    logo: 'https:xxxx',
    isOpen: 2,
    days: 3
  },

]
export const perviousProjectsData = [{
  poolId: '1',
  name: 'ethbox',
  logo: 'https//xxxx',
  method: 'Batch-Lottery',
  deposit: 'USDT',
  earn: 'ANO Token',
  totalDeposited: 150000,
  avaliable: 25000,
  status: true,  // (true-开启中、false-已结束)},
},
{
  poolId: '2',
  name: 'ethbox',
  logo: 'https//xxxx',
  method: 'Batch-Lottery',
  deposit: 'USDT',
  earn: 'ANO Token',
  totalDeposited: 150000,
  avaliable: 25000,
  status: true, // (true-开启中、false-已结束)
}
]
