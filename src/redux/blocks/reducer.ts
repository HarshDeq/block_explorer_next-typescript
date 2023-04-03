import {
  IAddLatestBlocksDispatchType,
  IBlockDetailState,
  ISetCurrentBlockDetailsDispatchType,
  ISetLoading,
} from "@/utils/interfaces";
import { ADD_LATEST_BLOCKS, SET_CURRENT_BLOCK_DETAILS, SET_LOADING } from "./actionTypes";

const init = {
  blocks: {},
  arrOfBlockNumber: [],
  currentBlockNumber: null,
  currentBlockDetails: null,
  isLoading: false,
};

type Action = IAddLatestBlocksDispatchType | ISetCurrentBlockDetailsDispatchType | ISetLoading;

export const blockReducer = (
  state: IBlockDetailState = init,
  action: Action
) => {
  switch (action.type) {
    case ADD_LATEST_BLOCKS:
      return {
        ...state,
        blocks: action.payload.blocks,
        arrOfBlockNumber: action.payload.arrOfBlockNumber,
      };
    case SET_CURRENT_BLOCK_DETAILS:
        return{
          ...state,
          currentBlockNumber: action.payload.currentBlockNumber,
          currentBlockDetails: action.payload.currentBlockDetails,
        }
      case SET_LOADING:
        return{
          ...state,
          isLoading:action.payload
        }
    default:
      return state;
  }
};
