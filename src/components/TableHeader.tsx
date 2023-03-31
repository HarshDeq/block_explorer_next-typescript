import { TableCell, TableHead, TableRow } from "@mui/material";

interface Props {
  headers: string[];
}

const TableHeader = (props: Props) => {
  return (
    <>
      <TableHead>
        <TableRow>
          {props.headers.map((hearder) => (
            <TableCell key={hearder}>{hearder}</TableCell>
          ))}
        </TableRow>
      </TableHead>
    </>
  );
};

export default TableHeader;
