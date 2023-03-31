import { Block } from "@/redux/blocks/reducer";
import { RootState } from "@/redux/store";
import { getTimeDiff } from "@/utils/getTimeDiff";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { useSelector } from "react-redux";
import CustomLink from "./CustomLink";

interface BlockRowProps {
  blockNumber: number | string;
  block: Block;
}

const BlockDetailTableBody = () => {
  const { blocks, arrOfBlockNumber } = useSelector(
    (state:RootState) => state.blocksDetails
  );

  return (
    <>
      <TableBody>
        {arrOfBlockNumber.map((blockNumber:string) => (
          <BlockRow
            block={blocks[blockNumber]}
            blockNumber={blockNumber}
            key={blockNumber}
          />
        ))}
      </TableBody>
    </>
  );
};

const BlockRow = (props: BlockRowProps) => {
  const { block, blockNumber } = props;
  return (
    <TableRow>
      <TableCell>
        <CustomLink href={`/block/${blockNumber}`}>{blockNumber}</CustomLink>
      </TableCell>
      <TableCell>{getTimeDiff(block.timestamp)}</TableCell>
      <TableCell>Fee Recipient {block.miner}</TableCell>
      <TableCell>{block.transactionCount}</TableCell>
    </TableRow>
  );
};

export default BlockDetailTableBody;
