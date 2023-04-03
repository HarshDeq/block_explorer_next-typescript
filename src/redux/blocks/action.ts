import { getBlockDetailByBlockNumber, getBlocks } from "@/utils/blockMethods";
import {
  IAddLatestBlocksDispatchType,
  ISetCurrentBlockDetails,
  ISetCurrentBlockDetailsDispatchType,
  ISetLatestBlocksDetail,
  ISetLoading,
} from "@/utils/interfaces";
import { Dispatch } from "react";
import {
  ADD_LATEST_BLOCKS,
  SET_CURRENT_BLOCK_DETAILS,
  SET_LOADING,
} from "./actionTypes";

const setBlocksDetails = (
  payload: ISetLatestBlocksDetail
): IAddLatestBlocksDispatchType => {
  return {
    type: ADD_LATEST_BLOCKS,
    payload,
  };
};

export const setLoading = (payload: boolean): ISetLoading => {
  return {
    type: SET_LOADING,
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
  async (dispatch: Dispatch<IAddLatestBlocksDispatchType | ISetLoading>) => {
    const blocks = await getBlocks(numberOfBlock);
    dispatch(setLoading(false));
    dispatch(setBlocksDetails(blocks));
  };

export const getBlockDetails =
  (blockNumber: number | string) =>
  async (
    dispatch: Dispatch<ISetCurrentBlockDetailsDispatchType | ISetLoading>
  ) => {
    const blockDetails = await getBlockDetailByBlockNumber(blockNumber);
    dispatch(
      setCurrentBlockDetails({
        currentBlockNumber: blockNumber,
        currentBlockDetails: blockDetails,
      })
    );
    dispatch(setLoading(false));
  };
