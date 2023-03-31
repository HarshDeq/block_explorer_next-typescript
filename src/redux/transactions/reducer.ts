import { ADD_TRANSACTIONS } from "./actionTypes";

const init = {
  blockNumberOfTransactions: null,
  transactionsDetails: null,
};

export const transactionReducer = (state = init, action) => {
    switch(action.type){
        case ADD_TRANSACTIONS:
            return {
                ...state,
                transactionsDetails:[...state.transactionsDetails,...action.paylaod.transactionsDetails]
            }
    }
};
