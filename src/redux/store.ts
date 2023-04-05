import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import {  blockReducer } from "./blocks/reducer";
import { IBlockDetailState, ITransactionsDetailState } from "@/utils/interfaces";
import { transactionReducer } from "./transactions/reducer";

export interface RootState{
  blocksDetails:IBlockDetailState,
  transactionsDetails:ITransactionsDetailState
}


const rootReducer = combineReducers({
  blocksDetails:blockReducer,
  transactionsDetails:transactionReducer
})


const createComposer =  compose;
export const store = createStore(
  rootReducer,
  createComposer(applyMiddleware(thunk)),
);

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
export type AppDispatch = typeof store.dispatch