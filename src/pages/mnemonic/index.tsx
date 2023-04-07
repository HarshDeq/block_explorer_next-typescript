import MnemonicComp from "@/components/MnemonicComp";
import { arrBufferToHex } from "@/utils/arrBufferToHex";
import { generateMnemonicWordAndSeed } from "@/utils/mnemonicMethos";
import {  SelectChangeEvent } from "@mui/material";
import { HDNodeWallet, Mnemonic } from "ethers";
import { useState } from "react";


const MnemonicCodeGenerator = () => {
  const [wordLength, setWordLength] = useState<number>(12);
  const [mnemonicWord, setMnemonicWord] = useState<string | null>(null);
  const [bip39Seed, setBip39Seed] = useState<string | null>(null);

  const handleChangeSelectValue = (e: SelectChangeEvent<unknown>) => {
    const value = Number(e.target.value);
    setWordLength(value);
  };

  const handleGenerate = async () => {
    const response = await generateMnemonicWordAndSeed(wordLength);

    const hexString = arrBufferToHex(response.seed);
    setBip39Seed(hexString);
    setMnemonicWord(response.mnemonicWord);
   
    const menmonic = Mnemonic.fromEntropy(response.entropy,null)
    const newHDWallet = HDNodeWallet.fromMnemonic(menmonic,`m/44'/60'/0'/0/0`)
    console.log(newHDWallet)
    // setMnemonicWord(newHDWallet.publicKey)
  };

  return (
    <div style={{ margin: "2.5rem" }}>
      <div
        style={{
          textAlign: "center",
          fontSize: "1.8rem",
          fontWeight: "600",
          borderBottom: ".8px solid rgba(237, 231, 225,1)",
          marginBottom: "2rem",
        }}
      >
        Mnemonic Code Converter
      </div>
      <div>
        <h1>Mnemonic</h1>
        {/* <Grid container spacing={2}>
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
            {bip39Seed}
          </Grid>
          <Grid item sm={3}>
            <div style={{ marginLeft: "1rem" }}>BIP32 Root Key</div>
          </Grid>
          <Grid item sm={9}>
            English
          </Grid>
        </Grid> */}
        <MnemonicComp handleChangeSelectValue={handleChangeSelectValue} handleGenerate={handleGenerate} mnemonicWord={mnemonicWord} seed={bip39Seed} wordLength={wordLength} />
        
      </div>
    </div>
  );
};

export default MnemonicCodeGenerator;
