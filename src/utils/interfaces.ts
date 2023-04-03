import { ReactNode } from "react";
import { Action, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { BlockTransactionString, Transaction } from "web3-eth";

export type ChildrenProp = ReactNode | null | undefined;

export interface IBlockRowProps {
  blockNumber: number | string;
  block: IBlock;
}

export interface IWithdrawals {
  index: string;
  validatorIndex: string;
  address: string;
  amount: string;
}

export interface IBlock extends BlockTransactionString {
  transactionCount: number;
}

export interface IBlockDetailState {
  blocks: Record<number | string, IBlock>;
  arrOfBlockNumber: string[];
  currentBlockNumber: null | number | string;
  currentBlockDetails: IBlock | null;
  isLoading: boolean;
}

export interface ITransaction extends Transaction {}

export interface ITransactionsDetailState {
  blockNumberOfTransactions: null | string | number;
  transactionsDetails: ITransaction[];
}


export interface IAddLatestBlocksDispatchType {
  type: "ADD_LATEST_BLOCKS";
  payload: ISetLatestBlocksDetail;
}

export interface ISetCurrentBlockDetailsDispatchType {
  type: "SET_CURRENT_BLOCK_DETAILS";
  payload: ISetCurrentBlockDetails;
}

export interface ISetLatestBlocksDetail {
  blocks: Record<number | string, IBlock>;
  arrOfBlockNumber: string[];
}

export interface ISetCurrentBlockDetails {
  currentBlockNumber: string | null | number;
  currentBlockDetails: IBlock | null;
}

export interface IResetTransactionDetailsDispatchType {
  type: "RESET_TRANSASCTIONS";
}

export interface IAddTransactionsDetailsDispatchType {
  type:'ADD_TRANSACTIONS';
  payload:{transactionsDetails:ITransaction[]}
}

export interface ISetBlockNumberOfTransactionsDispatchType{
  type:'SET_BLOCK_NUMBER';
  payload:{blockNumberOfTransactions:string | number}
}


export interface ISetLoading{
  type:'SET_LOADING',
  payload:boolean
}

export type CallbackFunction = (arg:Function) => void
