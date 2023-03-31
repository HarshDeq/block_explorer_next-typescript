import { RootState } from "@/redux/store";
import { getTimeDiff } from "@/utils/getTimeDiff";
import { IBlockRowProps } from "@/utils/interfaces";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { useSelector } from "react-redux";
import CustomLink from "./CustomLink";

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

const BlockRow = (props: IBlockRowProps) => {
  const { block, blockNumber } = props;
  return (
    <TableRow>
      <TableCell>
        <CustomLink href={`/block/${blockNumber}`}>{blockNumber}</CustomLink>
      </TableCell>
      <TableCell>{getTimeDiff(Number(block.timestamp))}</TableCell>
      <TableCell>Fee Recipient {block.miner}</TableCell>
      <TableCell>{block.transactionCount}</TableCell>
    </TableRow>
  );
};

export default BlockDetailTableBody;
