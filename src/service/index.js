import axios from 'axios'

const prefix = 'http://www.daostarter.pro/api'
const projects =  `${prefix}/starter/projects` // 首页
const perviousProjects =  `${prefix}/starter/perviousProjects` // 首页
const deposit =  `${prefix}/starter/deposit` // 核心参与
const lockin =  `${prefix}/starter/lockin` // 账户页面
const apply =  `${prefix}/starter/apply` // 申请


export const getProjects = (params) => axios.get(projects, {params})
export const getPerviousProjects = (params) => axios.get(perviousProjects, {params})
export const getDeposit = (params) => axios.get(deposit, {params})
export const getLockin = (params) => axios.get(lockin, {params})
export const postApply = (params) => axios.post(apply, params)


