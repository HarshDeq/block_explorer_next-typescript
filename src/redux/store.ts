import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { BlockDetailState, blockReducer } from "./blocks/reducer";

export interface RootState{
  blocksDetails:BlockDetailState

}


const rootReducer = combineReducers({
  blocksDetails:blockReducer
})


const createComposer =  compose;
export const store = createStore(
  rootReducer,
  createComposer(applyMiddleware(thunk)),
);

console.log( typeof store.getState())

// export type RootState = ReturnType<typeof store.getState>

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);