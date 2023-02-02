import { createAction, createReducer } from "@reduxjs/toolkit";

const setPlayerIndex = createAction<number>("[Current] [Player Index] Set");

const initialState: number = 0;

const playerIndexReducer = createReducer(initialState, (builder) => {
  builder.addCase(setPlayerIndex, (state, action) => action.payload);
});

export { setPlayerIndex };

export default playerIndexReducer;
