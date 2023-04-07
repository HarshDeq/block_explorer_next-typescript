import React, { useEffect, useState } from "react";
import { ITransaction } from "./interfaces";
import {
  alchemy_url,
  getBlockDetailByBlockNumber,
  getTransctionDetails,
} from "./blockMethods";
import Web3 from "web3";

const useWeb3Hook = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [transactionsList, setTransactionsList] = useState<ITransaction[]>([]);

  const web3_instance = new Web3(alchemy_url);

  const getAllTransactionsDetailList = async (
    transactionBatchList: string[][]
  ) => {
    for (let batch = 0; batch < transactionBatchList.length; batch++) {
      // if (open) {
      const transactionDetails = await Promise.all(
        transactionBatchList[batch]?.map(async (hash) => {
          return getTransctionDetails(hash);
        })
      );

      setTransactionsList((prev) => [...prev, ...transactionDetails]);
      // } else {

      //   break;
      // }
    }
  };

  const getTransactionDetailsByBlockNumber = async (blockNumber: string) => {
    return await getBlockDetailByBlockNumber(blockNumber);
  };

  useEffect(() => {
    if (!open) {
      setOpen(true);
    }
    return () => {
      if (open) {
        return setOpen(false);
      }
    };
  }, [open]);

  return [
    transactionsList,
    getAllTransactionsDetailList,
    getTransactionDetailsByBlockNumber,
  ] as const;
};

export default useWeb3Hook;
