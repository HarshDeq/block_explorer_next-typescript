import { getChunks } from "@/utils/arrayMethods";
import { getAllTransactionsDetailList, getBlockDetailByBlockNumber, getBlocks } from "@/utils/blockMethods";
import {
  IAddLatestBlocksDispatchType,
  IBlock,
  ISetCurrentBlockDetails,
  ISetCurrentBlockDetailsDispatchType,
  ISetLatestBlocksDetail,
} from "@/utils/interfaces";
import { Dispatch } from "react";
import { ADD_LATEST_BLOCKS, SET_CURRENT_BLOCK_DETAILS } from "./actionTypes";

const setBlocksDetails = (
  payload: ISetLatestBlocksDetail
): IAddLatestBlocksDispatchType => {
  return {
    type: ADD_LATEST_BLOCKS,
    payload,
  };
};

export const setCurrentBlockDetails = (
  payload: ISetCurrentBlockDetails
): ISetCurrentBlockDetailsDispatchType => {
  return {
    type: SET_CURRENT_BLOCK_DETAILS,
    payload,
  };
};

export const getLatestBlocks =
  (numberOfBlock: number) =>
  async (dispatch: Dispatch<IAddLatestBlocksDispatchType>) => {
    const blocks = await getBlocks(numberOfBlock);
    dispatch(setBlocksDetails(blocks));
  };

export const getBlockDetails =
  (blockNumber: number | string) =>
  async (dispatch: Dispatch<ISetCurrentBlockDetailsDispatchType>) => {
    const blockDetails = await getBlockDetailByBlockNumber(blockNumber);
    console.log(blockDetails);
    dispatch(
      setCurrentBlockDetails({
        currentBlockNumber: blockNumber,
        currentBlockDetails: blockDetails,
      })
    );
  };

  export const getTransactionDetails = (transactionArr:string[])=> async(dispatch)=>{
    let batchOfTrasactions = getChunks(transactionArr,5)

    for(let i =0 ;i<batchOfTrasactions.length;i++){
      let transactionsDetails = await getAllTransactionsDetailList(batchOfTrasactions[i])
      console.log(transactionsDetails)
    }
    
  }