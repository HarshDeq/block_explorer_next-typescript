import { HDNodeWallet } from "ethers";
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



// Mnemonic interface

export interface IMnemonicGeneratorState{
  mnemonicWord:null | string,
  entropy:null | Uint8Array,
  seedString:null| string,
  seedBuffer:Uint8Array|null,
  wordLength:number,
  derivedAddresses:IHDWallet[],
  pathIndex:number,
  derivedPath:string
}

export interface ISetWordLength {
  type:'SET_WORD_LENGTH',
  payload:number
}

export interface ISetMnemonicWord {
  type:'SET_MNEMONIC_WORD',
  payload:string|null
}

export interface ISetSeedHex {
  type:'SET_SEED_HEX',
  payload:string | null
}

export interface ISetEntropy {
  type:'SET_ENTROPY',
  payload:ArrayBuffer | null
}

export interface ISetPathIndex {
  type:'SET_PATH',
  payload:number
}

export interface ISetDerivedPath {
  type:'SET_DERIVED_PATH',
  payload:string
}

export interface IResetAddress{
  type:'RESET_ADDRESSES',
}

export interface IResetMnemonicState{
  type:'RESET',
}

export interface ISetAddress{
  type:'SET_NEW_ADDRESSES',
  payload:IHDWallet[]
}

export interface IHDWallet extends HDNodeWallet{}