import { MnemonicGeneratorState } from "@/utils/interfaces";
import { RESET, SET_MNEMONIC, SET_NEW_ADDRESSES } from "./actionTypes";


const init = {
    mnemonicWord:null,
    entropy:null,
    seedString:null,
    wordLength:128,
    derivedAddresses:[],
    path:'m/0/',
    seedBuffer:null
};

export const mnemonicReducer = (state: MnemonicGeneratorState = init, action) => {
  switch (action.type) {

    case SET_MNEMONIC:
        return{
            ...state
        }

    case SET_NEW_ADDRESSES:
        return{
            ...state
        }

    case RESET:
        return init

    default:
      return state;
  }
};
