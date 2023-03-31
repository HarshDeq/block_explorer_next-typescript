import { ADD_LATEST_BLOCKS } from "./actionTypes";

interface Withdrawals {
  index: string;
  validatorIndex: string;
  address: string;
  amount: string;
}

export interface Block {
  baseFeePerGas: string;
  difficulty: string;
  extraData: string;
  gasLimit: string;
  gasUsed: string;
  hash: string;
  logsBloom: string;
  miner: string;
  mixHash: string;
  nonce: string;
  number: string;
  parentHash: string;
  receiptsRoot: string;
  sha3Uncles: string;
  size: string;
  stateRoot: string;
  timestamp: number;
  totalDifficulty: string;
  transactions: string[];
  transactionsRoot: string;
  uncles: [];
  withdrawals: Withdrawals[];
  withdrawalsRoot: string;
  transactionCount: number;
}

export interface BlockDetailState {
  blocks: Record<number|string, Block>;
  arrOfBlockNumber: string[];
  currentBlockNumber:null | number |string,
  currentBlockDetails:Block | null,
  isLoading:boolean
}

const init = {
  blocks: {},
  arrOfBlockNumber: [],
  currentBlockNumber:null,
  currentBlockDetails:null,
  isLoading:false
};


export interface SetLatestBlocksDetail {
  blocks: Record<number|string, Block>;
  arrOfBlockNumber: string[];
}

export interface AddLatestBlocks {
  type: "ADD_LATEST_BLOCKS";
  payload: SetLatestBlocksDetail;
}



type Action = AddLatestBlocks;

export const blockReducer = (state: BlockDetailState = init, action: Action) => {
  switch (action.type) {
    case ADD_LATEST_BLOCKS:
      return {
        blocks: action.payload.blocks,
        arrOfBlockNumber: action.payload.arrOfBlockNumber,
      };
    default:
      return state;
  }
};
