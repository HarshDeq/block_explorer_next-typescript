import { getBlockDetailByBlockNumber, getBlocks } from "@/utils/blockMethods";
import { Dispatch } from "react";
import { ADD_LATEST_BLOCKS, SET_CURRENT_BLOCK } from "./actionTypes";
import { AddLatestBlocks, Block, SetLatestBlocksDetail } from "./reducer";



const setBlocksDetails = (payload: SetLatestBlocksDetail): AddLatestBlocks => {
  return {
    type: ADD_LATEST_BLOCKS,
    payload,
  };
};

export const setCurrentBlock = (paylaod)=>{
  return {
    type:SET_CURRENT_BLOCK,
    paylaod

  }
}

export const getLatestBlocks =
  (numberOfBlock: number) => async (dispatch: Dispatch<AddLatestBlocks>) => {
    const blocks = await getBlocks(numberOfBlock);
    dispatch(setBlocksDetails(blocks));
  };


  export const getBlockDetails = (blockNumber)=>async(dispatch) =>{
    const blockDetails = await getBlockDetailByBlockNumber(blockNumber)
    
  }