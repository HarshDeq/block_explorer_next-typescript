import { getChunks } from "@/utils/arrayMethods";
import { getAllTransactionsDetailList } from "@/utils/blockMethods";
import {
  ADD_TRANSACTIONS,
  RESET_TRANSASCTIONS,
  SET_BLOCK_NUMBER,
} from "./actionTypes";
import {
  CallbackFunction,
  IAddTransactionsDetailsDispatchType,
  ISetLoading,
  ITransaction,
} from "@/utils/interfaces";
import { getBlockDetailByBlockNumber } from "@/utils/blockMethods";
import { Dispatch } from "react";
import { setLoading } from "../blocks/action";

export const setBlockNumberForTransactions = (payload: string) => {
  return {
    type: SET_BLOCK_NUMBER,
    payload: { blockNumberOfTransactions: payload },
  };
};

export const resetTransactions = () => {
  return {
    type: RESET_TRANSASCTIONS,
  };
};

export const setTransactions = (payload: {
  transactionsDetails: ITransaction[];
}): IAddTransactionsDetailsDispatchType => {
  return {
    type: ADD_TRANSACTIONS,
    payload,
  };
};

export const getTransactionDetails =
  (transactionArr: string[]) =>
  async (
    dispatch: Dispatch<IAddTransactionsDetailsDispatchType | ISetLoading>
  ) => {
    let batchOfTrasactions = getChunks(transactionArr, 5);

    for (let i = 0; i < batchOfTrasactions.length; i++) {
      let transactionsDetails = await getAllTransactionsDetailList(
        batchOfTrasactions[i]
      );
      dispatch(
        setTransactions({
          transactionsDetails,
        })
      );

      dispatch(setLoading(false));
    }
  };

export const getTransactionDetailsByBlockNumber =
  (blockNumber: string) => async (dispatch: CallbackFunction) => {
    const blockDetails = await getBlockDetailByBlockNumber(blockNumber);

    dispatch(getTransactionDetails(blockDetails.transactions));
  };
