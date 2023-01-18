import { createAction, createReducer } from "@reduxjs/toolkit";

const resetGameRound = createAction("[Game Round] Reset");
const incrementGameRound = createAction("[Game Round] Increment");

const initialState: number = 1;

const gameRoundReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(resetGameRound, () => 1)
    .addCase(incrementGameRound, (state) => state + 1);
});

export { resetGameRound, incrementGameRound };

export default gameRoundReducer;
