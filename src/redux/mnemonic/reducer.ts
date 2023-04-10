import { IHDWallet, IMnemonicGeneratorState, IResetAddress, IResetMnemonicState, ISetAddress, ISetDerivedPath, ISetEntropy, ISetMnemonicWord, ISetPathIndex, ISetSeedHex, ISetWordLength } from "@/utils/interfaces";
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

const init = {
  mnemonicWord: "",
  entropy: null,
  seedString: null,
  wordLength: 128,
  derivedAddresses: [],
  pathIndex: 0,
  seedBuffer: null,
  derivedPath: "m/0/",
};


type Action = IResetAddress |ISetDerivedPath|ISetPathIndex|ISetEntropy|ISetSeedHex|ISetMnemonicWord|ISetWordLength | IResetMnemonicState |ISetAddress

export const mnemonicReducer = (
  state: IMnemonicGeneratorState = init,
  action:Action
) => {
  switch (action.type) {
    case SET_WORD_LENGTH:
      return {
        ...state,
        wordLength: action.payload,
      };
    case SET_MNEMONIC_WORD:
      return {
        ...state,
        mnemonicWord: action.payload,
      };
      break;

    case SET_SEED_HEX:
      return {
        ...state,
        seedString: action.payload,
      };
    case SET_ENTROPY:
      return {
        ...state,
        entropy: action.payload,
      };
    case SET_NEW_ADDRESSES:
      return {
        ...state,
        derivedAddresses:[...state.derivedAddresses, ...action.payload]
      };
    case SET_PATH:
      return {
        ...state,
        pathIndex: action.payload,
      };
    case SET_DERIVED_PATH:
      return {
        ...state,
        derivedPath: action.payload,
      };

    case RESET_ADDRESSES:
      return {
        ...state,
        derivedAddresses: [],
      };

    case RESET:
      return init;

    default:
      return state;
  }
};
