import { createAction, createReducer } from "@reduxjs/toolkit";
import { IPlayer } from "../players";

const setRoundOrder = createAction<IPlayer[]>("[Round Order] Set");

const initialState: IPlayer[] = [];

const roundOrderReducer = createReducer(initialState, (builder) => {
  builder.addCase(setRoundOrder, (state, action) => action.payload);
});

export { setRoundOrder };

export default roundOrderReducer;
