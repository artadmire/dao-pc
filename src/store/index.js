import {createStore } from 'redux'
import { accountReducer }  from './reducer'
export const store = createStore(accountReducer)
