import { createAction, createReducer } from "@reduxjs/toolkit";
import { IPlayer } from "../players";

export interface IChoosePlayerAction {
  playable: boolean;
  isBeingPlayed: boolean;
  trigger: string;
  chosenPlayer: IPlayer | null;
}

const resetChoosePlayerAction = createAction("[Choose Player] Reset action");
const setChoosePlayerAction = createAction<IChoosePlayerAction>(
  "[Choose Player] Set action"
);
const chooseInChoosePlayerAction = createAction<IPlayer | null>(
  "[Choose Player] Choose player"
);

const initialState: IChoosePlayerAction = {
  playable: false,
  isBeingPlayed: false,
  trigger: "",
  chosenPlayer: null,
};

const choosePlayerActionReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(resetChoosePlayerAction, () => initialState)
    .addCase(setChoosePlayerAction, (state, action) => action.payload)
    .addCase(chooseInChoosePlayerAction, (state, action) => {
      state.chosenPlayer = action.payload;
    });
});

export {
  resetChoosePlayerAction,
  setChoosePlayerAction,
  chooseInChoosePlayerAction,
};

export default choosePlayerActionReducer;
