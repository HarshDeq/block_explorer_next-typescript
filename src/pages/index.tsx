import BlockDetailTableBody from "@/components/BlockDetailTableBody";
import CustomCard from "@/components/CustomCard";
import Spinner from "@/components/Spinner";
import TableHeader from "@/components/TableHeader";
import { getLatestBlocks, setLoading } from "@/redux/blocks/action";
import { RootState } from "@/redux/store";
import { IconButton, Table, Tooltip } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReplayIcon from "@mui/icons-material/Replay";

const HEADERS = ["Block No.", "Age", "Miner", "Transaction Count"];

export default function Home() {
  const { arrOfBlockNumber, isLoading } = useSelector(
    (state: RootState) => state.blocksDetails
  );
  const dispatch = useDispatch();

  const loadLatestBlock = () => {
    dispatch(getLatestBlocks(5));
  };

  useEffect(() => {
    dispatch(setLoading(true));
    if (!arrOfBlockNumber.length) {
      loadLatestBlock();
    } else {
      dispatch(setLoading(false));
    }
  }, [arrOfBlockNumber]);

  return (
    <>
      {arrOfBlockNumber.length && !isLoading ? (
        <CustomCard>
          <div style={{ display: "flex" }}>
            <h3>Latest Blocks</h3>
            <Tooltip title="Load Latest Blocks" followCursor>
              <IconButton sx={{ color: "black" }} onClick={loadLatestBlock}>
                <ReplayIcon />
              </IconButton>
            </Tooltip>
          </div>
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
