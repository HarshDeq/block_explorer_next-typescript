import CustomCard from "@/components/CustomCard";
import Spinner from "@/components/Spinner";
import TransactionRow from "@/components/TransactionRow";
import { setLoading } from "@/redux/blocks/action";
import { RootState } from "@/redux/store";
import { setBlockNumberForTransactions } from "@/redux/transactions/action";
import {
  getTransactionDetails,
  getTransactionDetailsByBlockNumber,
  resetTransactions,
} from "@/redux/transactions/action";
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

const HEADERS = ["Txn Hash", "Block", "Age", "From", "To", "Value", "Txn Fee"];

const TransactionDetails = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { blocksDetails, transactionsDetails } = useSelector(
    (state: RootState) => state
  );
  useEffect(() => {
    dispatch(setLoading(true));

    if (router?.query?.block) {
      const blockNumber = router.query?.block;

      if (blockNumber === transactionsDetails.blockNumberOfTransactions) {
        dispatch(setLoading(false));
      } else if (blocksDetails.blocks[Number(blockNumber)]) {
        dispatch(resetTransactions());
        dispatch(setBlockNumberForTransactions(blockNumber));
        const transactionsList =
          blocksDetails.blocks[Number(blockNumber)].transactions;
        dispatch(getTransactionDetails(transactionsList));
      } else {
        dispatch(resetTransactions());
        dispatch(setBlockNumberForTransactions(blockNumber));
        dispatch(getTransactionDetailsByBlockNumber(blockNumber));
      }
    }
  }, [router]);
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
                {transactionsDetails.transactionsDetails?.map((transaction) => (
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
