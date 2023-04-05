import { IAddTransactionsDetailsDispatchType, IResetTransactionDetailsDispatchType, ISetBlockNumberOfTransactionsDispatchType, ITransactionsDetailState} from "@/utils/interfaces";
import { ADD_TRANSACTIONS, RESET_TRANSASCTIONS, SET_BLOCK_NUMBER } from "./actionTypes";

const init = {
  blockNumberOfTransactions: null,
  transactionsDetails: [],
};

type Actions = IResetTransactionDetailsDispatchType | IAddTransactionsDetailsDispatchType | ISetBlockNumberOfTransactionsDispatchType

export const transactionReducer = (state:ITransactionsDetailState = init, action:Actions) => {
    switch(action.type){
        case ADD_TRANSACTIONS:
            return {
                ...state,
                transactionsDetails:[...action.payload.transactionsDetails]
            }

        case SET_BLOCK_NUMBER:
            return{
                ...state,
                blockNumberOfTransactions:action.payload.blockNumberOfTransactions
            }

        case RESET_TRANSASCTIONS:
            return init

        default :
         return state
    }
};
