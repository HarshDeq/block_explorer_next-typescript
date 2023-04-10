import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import {  blockReducer } from "./blocks/reducer";
import { IBlockDetailState, IMnemonicGeneratorState, ITransactionsDetailState } from "@/utils/interfaces";
import { transactionReducer } from "./transactions/reducer";
import { mnemonicReducer } from "./mnemonic/reducer";

export interface RootState{
  blocksDetails:IBlockDetailState,
  transactionsDetails:ITransactionsDetailState,
  mnemonicGenerator:IMnemonicGeneratorState
}


const rootReducer = combineReducers({
  blocksDetails:blockReducer,
  transactionsDetails:transactionReducer,
  mnemonicGenerator:mnemonicReducer
})


const createComposer =  compose;
export const store = createStore(
  rootReducer,
  createComposer(applyMiddleware(thunk)),
);

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
export type AppDispatch = typeof store.dispatch