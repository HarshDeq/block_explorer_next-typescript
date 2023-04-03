import BlockDetailTableBody from "@/components/BlockDetailTableBody";
import CustomCard from "@/components/CustomCard";
import Spinner from "@/components/Spinner";
import TableHeader from "@/components/TableHeader";
import { getLatestBlocks, setLoading } from "@/redux/blocks/action";
import { RootState } from "@/redux/store";
import { Table } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const HEADERS = ["Block No.", "Age", "Miner", "Transaction Count"];

export default function Home() {
  const { arrOfBlockNumber, isLoading } = useSelector(
    (state: RootState) => state.blocksDetails
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    if (!arrOfBlockNumber.length) {
      dispatch(getLatestBlocks(5));
    } else {
      dispatch(setLoading(false));
    }
  }, [arrOfBlockNumber]);

  return (
    <>
      {arrOfBlockNumber.length && !isLoading ? (
        <CustomCard>
          <h3>Latest Blocks</h3>
          <div>
            <Table>
              <TableHeader headers={HEADERS} />
              <BlockDetailTableBody />
            </Table>
          </div>
        </CustomCard>
      ) : (
        <Spinner />
      )}
    </>
  );
}
