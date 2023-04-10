import * as bip39 from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english";
import {
  RESET,
  RESET_ADDRESSES,
  SET_DERIVED_PATH,
  SET_ENTROPY,
  SET_MNEMONIC_WORD,
  SET_NEW_ADDRESSES,
  SET_PATH,
  SET_SEED_HEX,
  SET_WORD_LENGTH,
} from "./actionTypes";
import { arrBufferToHex } from "@/utils/arrBufferToHex";
import { BytesLike, HDNodeWallet, Mnemonic } from "ethers";
import { notifyError } from "@/utils/toast";
import { generateKeyPair } from "crypto";
import {
  IHDWallet,
  ISetAddress,
  ISetEntropy,
  ISetMnemonicWord,
  ISetSeedHex,
} from "@/utils/interfaces";
import { Dispatch } from "react";

export const setWordLength = (payload: number) => {
  return {
    type: SET_WORD_LENGTH,
    payload,
  };
};

export const setMnemonicWord = (payload: string | null): ISetMnemonicWord => {
  return {
    type: SET_MNEMONIC_WORD,
    payload,
  };
};

export const setSeedHex = (payload: string | null): ISetSeedHex => {
  return {
    type: SET_SEED_HEX,
    payload,
  };
};

export const setEntropy = (payload: ArrayBuffer | null): ISetEntropy => {
  return {
    type: SET_ENTROPY,
    payload,
  };
};

export const setPathIndex = (payload: number) => {
  return {
    type: SET_PATH,
    payload,
  };
};

export const setAddresses = (payload: IHDWallet[]): ISetAddress => {
  return {
    type: SET_NEW_ADDRESSES,
    payload,
  };
};

export const setDerivedPath = (payload: string) => {
  return {
    type: SET_DERIVED_PATH,
    payload,
  };
};

export const resetAddresses = () => {
  return {
    type: RESET_ADDRESSES,
  };
};


export const resetMnemonicGenerator = () =>{
  return{
    type:RESET
  }
}

export const generateMnemonic =
  (wordLength: number) => (dispatch: Dispatch<ISetMnemonicWord>) => {
    const mnemonicWord = bip39.generateMnemonic(wordlist, wordLength);
    dispatch(setMnemonicWord(mnemonicWord));
  };

export const generateSeedBufferAndEntropy =
  (mnemonicWord: string) =>
  async (dispatch: Dispatch<ISetEntropy | ISetSeedHex>) => {
    try {
      const seedBuffer = await bip39.mnemonicToSeed(mnemonicWord);
      const seedHex = arrBufferToHex(seedBuffer);
      const entropyBuffer = bip39.mnemonicToEntropy(mnemonicWord, wordlist);
      dispatch(setEntropy(entropyBuffer));
      dispatch(setSeedHex(seedHex));
    } catch (err) {
      dispatch(setEntropy(null));
      notifyError("Invalid mnemonic");
    }
  };

export const generateAddresses =
  (payload: { path: string; entropy: BytesLike | null; startFrom: number }) =>
  (dispatch: Dispatch<ISetAddress>) => {
    const { entropy, path, startFrom } = payload;
    if (entropy) {
      const menmonic = Mnemonic.fromEntropy(entropy, null);

      let generatedDerivedAddress = [];

      for (let i = startFrom; i < startFrom + 20; i++) {
        const newHDWallet = HDNodeWallet.fromMnemonic(menmonic, `${path}${i}`);
        generatedDerivedAddress.push(newHDWallet);
      }

      dispatch(setAddresses(generatedDerivedAddress));
    }
  };
