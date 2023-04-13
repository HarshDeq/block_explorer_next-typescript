import CustomButton from "@/components/CustomButton";
import CustomCard from "@/components/CustomCard";
import { Grid, TextField, styled } from "@mui/material";
import { useEffect, useState } from "react";
import Web3, { Modules } from "web3";

const ALCHEMY_URL_SEPOLIA =
  "https://eth-sepolia.g.alchemy.com/v2/8cwKQBF8f65ncyIYcqvd_sPBVMaUogPN";

const StyledInput = styled(TextField)(() => ({
  "& input": {
    padding: ".2rem .5rem",
  },
}));

const Provider = new Web3(ALCHEMY_URL_SEPOLIA);

const Transaction = () => {
  const [addresses, setAddresses] = useState({
    sender: "",
    receiver: "",
  });

  const [currentTxnHash, setCurrentTxnHash] = useState<string | null>(null);

  const [amount, setAmount] = useState(0);


  const handleAddressChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddresses((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const sendEthOnClick = async () => {};

  const handleConnect = async () => {
    const tx = {
      from: addresses.sender,
      to: addresses.receiver,
      gas: 21000,
      data: "",
    };

    const signature = await Provider.eth.accounts.signTransaction(
      tx,
      "e8d844b459276a548077a17f9a6b6fcbc10a52db93bb0db42a20de9b359bbc3b"
    );

    console.log("signature", signature);

    Provider.eth
      .sendSignedTransaction(String(signature?.rawTransaction))
      .on("transactionHash", (hash) => {
        console.log(hash);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <CustomCard>
        <Grid container spacing={2}>
          <Grid item xs={2} style={{ lineHeight: 2 }}>
            Sender Address:
          </Grid>
          <Grid item xs={10}>
            <StyledInput
              variant="outlined"
              value={addresses.sender}
              name="sender"
              disabled
              fullWidth
            />
          </Grid>
          <Grid item xs={2} style={{ lineHeight: 2 }}>
            Receiver Address:
          </Grid>
          <Grid item xs={10}>
            <StyledInput
              variant="outlined"
              value={addresses.receiver}
              name="receiver"
              onChange={handleAddressChnage}
              fullWidth
            />
          </Grid>
          <Grid item xs={2} style={{ lineHeight: 2 }}>
            Amount(in eth):
          </Grid>
          <Grid item xs={10}>
            <StyledInput
              variant="outlined"
              onChange={(e) => {
                setAmount(Number(e.target.value));
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomButton
              onClick={sendEthOnClick}
              label="Send"
              variant="contained"
            />
          </Grid>

          {currentTxnHash && (
            <>
              <Grid item xs={2}>
                Transaction Hash:
              </Grid>
              <Grid item xs={10}>
                {currentTxnHash}
              </Grid>
            </>
          )}
        </Grid>
      </CustomCard>
    </>
  );
};

export default Transaction;
