import { createAction, createReducer } from "@reduxjs/toolkit";
import { IPlayer } from "../players";

const setTableOrder = createAction<IPlayer[]>("[Table Order] Set");

const initialState: IPlayer[] = [];

const tableOrderReducer = createReducer(initialState, (builder) => {
  builder.addCase(setTableOrder, (state, action) => {
    return action.payload;
  });
});

export { setTableOrder };

export default tableOrderReducer;
