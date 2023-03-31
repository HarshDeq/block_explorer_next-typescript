import CustomCard from "@/components/CustomCard";
import { getBlockDetails } from "@/redux/blocks/action";
import { RootState } from "@/redux/store";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const BlockDetails = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { blocks, currentBlockNumber, currentBlockDetails } = useSelector(
    (state:RootState) => state.blocksDetails
  );

  useEffect(() => {
    if (router.query.blockNumber) {
      console.log(router.query);

      if (currentBlockNumber === router.query.blockNumber) {
        //set loding false and display from current block
      } else if (blocks[router.query.blockNumber]) {
        // set current block number and current block details
      } else {
        // fetch current block details
        dispatch(getBlockDetails(router.query.blockNumber));
      }
    }
  }, [router]);

  return (
    <>
      <CustomCard>Hi</CustomCard>
    </>
  );
};

export default BlockDetails;
