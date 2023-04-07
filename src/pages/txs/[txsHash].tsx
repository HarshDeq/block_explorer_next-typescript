import CustomCard from "@/components/CustomCard";
import Spinner from "@/components/Spinner";
import {
  getBlockDetailByBlockNumber,
  getTransctionDetails,
} from "@/utils/blockMethods";
import { getTimeDiff } from "@/utils/getTimeDiff";
import { ITransaction } from "@/utils/interfaces";
import { Grid, styled } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Transaction extends ITransaction {
  timeStamp: string | number;
  gasUsed: number;
  gasLimit: number;
}

const StyledGridItem = styled(Grid)(() => ({
  margin: ".5rem 0",
}));

const TransactionDetails = () => {
  const router = useRouter();
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  const getTransctionDetailsByHash = async (hash: string) => {
    const transactionDetails = await getTransctionDetails(hash);

    const blockDetails = await getBlockDetailByBlockNumber(
      Number(transactionDetails.blockNumber)
    );

    setTransaction({
      ...transactionDetails,
      gasLimit: blockDetails.gasLimit,
      gasUsed: blockDetails.gasUsed,
      timeStamp: blockDetails.timestamp,
    });
  };

  useEffect(() => {
    if (router?.query?.txsHash) {
      const hash = String(router?.query?.txsHash);
      console.log(hash);
      getTransctionDetailsByHash(hash);
    }
  }, [router]);

  return (
    <>
      {transaction ? (
        <CustomCard>
          <div className="spacing">
            <Grid container>
              <StyledGridItem item xs={3}>
                Transaction Hash:
              </StyledGridItem>
              <StyledGridItem item xs={9}>
                {transaction.blockHash}
              </StyledGridItem>
              <StyledGridItem item xs={3}>
                Block:
              </StyledGridItem>
              <StyledGridItem item xs={9}>
                {transaction.blockNumber}
              </StyledGridItem>
              <StyledGridItem item xs={3}>
                Timestamp:
              </StyledGridItem>
              <StyledGridItem item xs={9}>
                {getTimeDiff(Number(transaction.timeStamp))}
              </StyledGridItem>
              <StyledGridItem item xs={3}>
                From:
              </StyledGridItem>
              <StyledGridItem item xs={9}>
                {transaction.from}
              </StyledGridItem>
              <StyledGridItem item xs={3}>
                To:
              </StyledGridItem>
              <StyledGridItem item xs={9}>
                {transaction.to}
              </StyledGridItem>
              <StyledGridItem item xs={3}>
                Value:
              </StyledGridItem>
              <StyledGridItem item xs={9}>
                {transaction.value}
              </StyledGridItem>
              <StyledGridItem item xs={3}>
                Gas Price:
              </StyledGridItem>
              <StyledGridItem item xs={9}>
                {transaction.value}
              </StyledGridItem>
              <StyledGridItem item xs={3}>
                Gas Used:
              </StyledGridItem>
              <StyledGridItem item xs={9}>
                {transaction.gasUsed}
              </StyledGridItem>
              <StyledGridItem item xs={3}>
                Gas Limit:
              </StyledGridItem>
              <StyledGridItem item xs={9}>
                {transaction.gasLimit}
              </StyledGridItem>
            </Grid>
          </div>
        </CustomCard>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default TransactionDetails;
