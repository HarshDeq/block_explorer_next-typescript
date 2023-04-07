import CustomCard from "@/components/CustomCard";
import CustomLink from "@/components/CustomLink";
import Spinner from "@/components/Spinner";
import {
  getBlockDetails,
  setCurrentBlockDetails,
  setLoading,
} from "@/redux/blocks/action";
import { RootState } from "@/redux/store";
import { getTimeDiff } from "@/utils/getTimeDiff";
import { CallbackFunction } from "@/utils/interfaces";
import { createLinkForTransaction } from "@/utils/utilFuction";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const BlockDetails = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { blocks, currentBlockNumber, currentBlockDetails, isLoading } =
    useSelector((state: RootState) => state.blocksDetails);

  useEffect(() => {
    dispatch(setLoading(true));

    if (router.query?.blockNumber) {
      const blockNumber = Number(router.query.blockNumber);

      if (currentBlockNumber === blockNumber) {
        dispatch(setLoading(false));
      } else if (blocks[Number(blockNumber)]) {
        dispatch(setLoading(false));
        dispatch(
          setCurrentBlockDetails({
            currentBlockNumber: blockNumber,
            currentBlockDetails: blocks[Number(blockNumber)],
          })
        );
      } else {
        dispatch<any>(getBlockDetails(blockNumber));
      }
    }
  }, [router.query]);

  return (
    <>
      {currentBlockDetails && !isLoading ? (
        <CustomCard>
          <div className="spacing">
            <Grid container>
              <Grid item xs={3}>
                Block Height:
              </Grid>
              <Grid item>{currentBlockNumber}</Grid>
            </Grid>
          </div>
          <div className="spacing">
            <Grid container>
              <Grid item xs={3}>
                Timestamp:
              </Grid>
              <Grid item>
                {currentBlockDetails &&
                  getTimeDiff(Number(currentBlockDetails.timestamp))}
              </Grid>
            </Grid>
          </div>
          <div className="spacing">
            <Grid container>
              <Grid item xs={3}>
                Transactions:
              </Grid>
              <Grid item>
                <CustomLink
                  href={createLinkForTransaction(String(currentBlockNumber))}
                >
                  {currentBlockDetails.transactionCount} transactions
                </CustomLink>
              </Grid>
            </Grid>
          </div>
          <div className="spacing">
            <Grid container>
              <Grid item xs={3}>
                Fee Recipient:
              </Grid>
              <Grid item>{currentBlockDetails.miner}</Grid>
            </Grid>
          </div>
          <div className="spacing">
            <Grid container>
              <Grid item xs={3}>
                Total Difficulty:
              </Grid>
              <Grid item>{currentBlockDetails.totalDifficulty}</Grid>
            </Grid>
          </div>
          <div className="spacing">
            <Grid container>
              <Grid item xs={3}>
                Size:
              </Grid>
              <Grid item>{currentBlockDetails.size} bytes</Grid>
            </Grid>
          </div>
          <div className="spacing">
            <Grid container>
              <Grid item xs={3}>
                Gas Used:
              </Grid>
              <Grid item>{currentBlockDetails.gasUsed}</Grid>
            </Grid>
          </div>
          <div className="spacing">
            <Grid container>
              <Grid item xs={3}>
                Gas Limit:
              </Grid>
              <Grid item>{currentBlockDetails.gasLimit}</Grid>
            </Grid>
          </div>
          <div className="spacing">
            <Grid container>
              <Grid item xs={3}>
                Base Fee Per Gas:
              </Grid>
              <Grid item>{currentBlockDetails.baseFeePerGas}</Grid>
            </Grid>
          </div>
        </CustomCard>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default BlockDetails;
