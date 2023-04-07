import { Grid, SelectChangeEvent } from '@mui/material';
import React, { ReactNode } from 'react'
import CustomButton from './CustomButton';
import CustomSelect from './CustomSelect';

interface Props{
    mnemonicWord:string|null;
    seed:string|null;
    handleGenerate:()=>void;
    wordLength:number;
    handleChangeSelectValue: (e:SelectChangeEvent<unknown>, child:ReactNode)=>void

}

const OPTIONS = [

    { value: 128, label: 12 },
    { value: 160, label: 15 },
    { value: 192, label: 18 },
    { value: 224, label: 21 },
    { value: 256, label: 24 },
  ];
  


const MnemonicComp = (props:Props) => {
    const {handleGenerate,mnemonicWord,seed,wordLength,handleChangeSelectValue} = props
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
    <Grid item sm={9} style={{wordBreak:"break-word"}}>
      {mnemonicWord}
    </Grid>
    <Grid item sm={3}>
      <div style={{ marginLeft: "1rem" }}>BIP39 Seed</div>
    </Grid>
    <Grid item sm={9} style={{wordBreak:"break-word"}}>
      {seed}
    </Grid>
    <Grid item sm={3}>
      <div style={{ marginLeft: "1rem" }}>BIP32 Root Key</div>
    </Grid>
    <Grid item sm={9}>
      English
    </Grid>
  </Grid>
  )
}

export default MnemonicComp