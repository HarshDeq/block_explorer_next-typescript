import { Grid, SelectChangeEvent, TextField } from "@mui/material";
import React, { ReactNode, useEffect } from "react";
import CustomButton from "./CustomButton";
import CustomSelect from "./CustomSelect";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { generateMnemonic, generateSeedBufferAndEntropy, resetAddresses, setMnemonicWord, setWordLength } from "@/redux/mnemonic/action";



const OPTIONS = [
  { value: 128, label: 12 },
  { value: 160, label: 15 },
  { value: 192, label: 18 },
  { value: 224, label: 21 },
  { value: 256, label: 24 },
];

const MnemonicComp = () => {
  const dispatch = useDispatch();

  const handleChangeSelectValue = (e: SelectChangeEvent<unknown>) => {
    const value = Number(e.target.value);
    dispatch(setWordLength(value));
  };

  const { wordLength,seedString ,mnemonicWord } = useSelector(
    (state: RootState) => state.mnemonicGenerator
  );

  const handleGenerate = () => {
    dispatch<any>(generateMnemonic(wordLength));
  };

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    dispatch(resetAddresses())
    dispatch(setMnemonicWord(e.target.value))
  }

  useEffect(() => {
    if(mnemonicWord){
      dispatch<any>(generateSeedBufferAndEntropy(mnemonicWord))
    }
  }, [mnemonicWord]);

  return (
    <Grid container spacing={2}>
      <Grid item sm={3}></Grid>
      <Grid item sm={9}>
        <label htmlFor="">Generate a random mnemonic:</label>
        <CustomButton onClick={handleGenerate} variant="outlined">
          Generate
        </CustomButton>
        <CustomSelect
          value={wordLength}
          onChange={handleChangeSelectValue}
          options={OPTIONS}
        />
      </Grid>

      <Grid item sm={3}>
        <div style={{ marginLeft: "1rem" }}>Mnemonic Language</div>
      </Grid>
      <Grid item sm={9}>
        English
      </Grid>
      <Grid item sm={3}>
        <div style={{ marginLeft: "1rem" }}>BIP39 Mnemonic</div>
      </Grid>
      <Grid item sm={9} style={{ wordBreak: "break-word" }}>
        <TextField value={mnemonicWord} multiline maxRows={4} onChange={handleInputChange} fullWidth/>
      </Grid>
      <Grid item sm={3}>
        <div style={{ marginLeft: "1rem" }}>BIP39 Seed</div>
      </Grid>
      <Grid item sm={9} style={{ wordBreak: "break-word" }}>
        {seedString}
      </Grid>
      {/* <Grid item sm={3}>
        <div style={{ marginLeft: "1rem" }}>BIP32 Root Key</div>
      </Grid>
      <Grid item sm={9}>
        English
      </Grid> */}
    </Grid>
  );
};

export default MnemonicComp;
