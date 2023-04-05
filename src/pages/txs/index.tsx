import CustomCard from "@/components/CustomCard";
import Spinner from "@/components/Spinner";
import TransactionRow from "@/components/TransactionRow";
import { setLoading } from "@/redux/blocks/action";
import { RootState } from "@/redux/store";
import {
  setBlockNumberForTransactions,
  setTransactions,
} from "@/redux/transactions/action";
import { resetTransactions } from "@/redux/transactions/action";
import { getChunks } from "@/utils/arrayMethods";
import { IAddTransactionsDetailsDispatchType } from "@/utils/interfaces";
import useWeb3Hook from "@/utils/useWeb3Hook";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const HEADERS = ['Index',"Txn Hash", "Block", "Age", "From", "To", "Value", "Txn Fee"];

const TransactionDetails = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { blocksDetails, transactionsDetails } = useSelector(
    (state: RootState) => state
  );

  const [
    transactionsList,
    getAllTransactionsDetailList,
    getTransactionDetailsByBlockNumber,
  ] = useWeb3Hook();

  const getTransactionsDetailList = async (
    blockNumber: string,
    transactionsList: string[]
  ) => {
    dispatch(resetTransactions());
    dispatch(setBlockNumberForTransactions(blockNumber));

    let batchOfTrasactions = getChunks(transactionsList, 5);

    await getAllTransactionsDetailList(batchOfTrasactions);
  };

  const getBlockDetailsByBlockNumber = async (blockNumber: string) => {
    const blockDetails = await getTransactionDetailsByBlockNumber(blockNumber);
    const transactions = [...blockDetails.transactions];
    getTransactionsDetailList(blockNumber, transactions);
  };

  useEffect(() => {
    dispatch(setLoading(true));

    if (router?.query?.block) {
      const blockNumber = String(router.query?.block);
      if (blocksDetails.blocks[Number(blockNumber)]) {
      const transactionsList = [
        ...blocksDetails.blocks[Number(blockNumber)].transactions,
      ];
      getTransactionsDetailList(blockNumber, transactionsList);
      } else {
        getBlockDetailsByBlockNumber(blockNumber);
      }
    }
  }, [router]);

  useEffect(() => {
    if (transactionsList.length )  {
      dispatch(setLoading(false));
      dispatch<IAddTransactionsDetailsDispatchType>(
        setTransactions({ transactionsDetails: transactionsList })
      );
    }
  }, [transactionsList]);

  return (
    <div>
      {!blocksDetails.isLoading &&
      transactionsDetails.transactionsDetails.length ? (
        <CustomCard>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {HEADERS.map((title) => (
                    <TableCell key={title}>{title}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {transactionsDetails.transactionsDetails?.map((transaction,index) => (
                  <TransactionRow
                    key={transaction?.hash}
                    transaction={transaction}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CustomCard>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default TransactionDetails;
