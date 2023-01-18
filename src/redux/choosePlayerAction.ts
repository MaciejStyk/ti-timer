import { createAction, createReducer } from "@reduxjs/toolkit";

export interface IChoosePlayerAction {
  playable: boolean;
  isBeingPlayed: boolean;
}

const resetChoosePlayerAction = createAction("[Choose Player] Reset action");
const setChoosePlayerAction = createAction<IChoosePlayerAction>("[Choose Player] Set action");

const initialState: IChoosePlayerAction = {
  playable: false,
  isBeingPlayed: false,
};

const choosePlayerActionReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(resetChoosePlayerAction, () => initialState)
    .addCase(setChoosePlayerAction, (state, action) => action.payload);
});

export { resetChoosePlayerAction, setChoosePlayerAction };

export default choosePlayerActionReducer;
