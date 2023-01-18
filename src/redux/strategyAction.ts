import { createAction, createReducer } from "@reduxjs/toolkit";
import { IStrategyCard } from "../global/strategyCards";
import { IPlayer } from "./players";

export interface IStrategyAction {
  isBeingPlayed: boolean;
  playedBy: IPlayer | null;
  strategyCard: IStrategyCard | null;
}

const resetStrategyAction = createAction("[Strategy Action] Reset");
const playStrategyAction = createAction<IStrategyAction>(
  "[Strategy Action] Play"
);

const initialState: IStrategyAction = {
  isBeingPlayed: false,
  playedBy: null,
  strategyCard: null,
};

const strategyActionReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(resetStrategyAction, () => initialState)
    .addCase(playStrategyAction, (state, action) => action.payload);
});

export { resetStrategyAction, playStrategyAction };

export default strategyActionReducer;
