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

let interval:ReturnType<typeof setInterval> |undefined

export default function Home() {
  const { arrOfBlockNumber, isLoading } = useSelector(
    (state: RootState) => state.blocksDetails
  );
  const dispatch = useDispatch();

  const loadLatestBlock = () => {
    dispatch<any>(getLatestBlocks(5));
  };

  const refresh = () =>{
    clearInterval(interval)
    loadLatestBlock();
    interval = setInterval(()=>{
      loadLatestBlock();
    },20000)
  }

  useEffect(() => {
    dispatch(setLoading(true));
    loadLatestBlock();
    interval = setInterval(()=>{
      loadLatestBlock();
    },20000)
    console.log(typeof interval)

    return ()=>{
      clearInterval(interval)
    }
  }, []);

  return (
    <>
      {arrOfBlockNumber.length && !isLoading ? (
        <CustomCard>
          <div style={{ display: "flex" }}>
            <h3>Latest Blocks</h3>
            <Tooltip title="Load Latest Blocks" followCursor>
              <IconButton sx={{ color: "black" }} onClick={refresh}>
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
