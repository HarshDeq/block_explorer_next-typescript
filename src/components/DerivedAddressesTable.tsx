import React from "react";
import CustomCard from "./CustomCard";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import TableHeader from "./TableHeader";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const HEADERS = ["Path", "Address", "Public Key", "Private Key"];

interface IRow {
  path: string | null;
  address: string;
  publicKey: string;
  privateKey: string;
}

const DerivedAddressesTable = () => {
  const { derivedAddresses } = useSelector(
    (state: RootState) => state.mnemonicGenerator
  );

  return (
    <CustomCard>
      <TableContainer>
        <Table>
          <TableHeader headers={HEADERS} />
          <TableBody>
            {derivedAddresses.map((item) => (
              <DerivedAddressesRow
                key={item.address}
                address={item.address}
                path={item.path}
                privateKey={item.signingKey.privateKey}
                publicKey={item.publicKey}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CustomCard>
  );
};

const DerivedAddressesRow = (props: IRow) => {
  const { address, path, privateKey, publicKey } = props;
  return (
    <>
      <TableRow>
        <TableCell>{path}</TableCell>
        <TableCell>{address}</TableCell>
        <TableCell>{publicKey}</TableCell>
        <TableCell>{privateKey}</TableCell>
      </TableRow>
    </>
  );
};

export default DerivedAddressesTable;
