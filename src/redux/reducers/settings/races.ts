import { createAction, createReducer } from "@reduxjs/toolkit";
import { IPlayer } from "../players";

export interface IRaces {
  naalu: {
    inGame: boolean;
    tokenBeingChanged: boolean;
    tokenChangeable: boolean;
  };
  argent: {
    inGame: boolean;
    playedBy: IPlayer | null;
  };
}

const resetRaces = createAction("[Races] Reset");
const setNaaluInGame = createAction<boolean>("[Races] Set Naalu in game");
const setNaaluTokenBeingChanged = createAction<boolean>(
  "[Races] Set Naalu token being changed"
);
const setNaaluTokenChangeable = createAction<boolean>(
  "[Races] Set Naalu token changeable"
);
const setArgentInGame = createAction<boolean>("[Races] Set Argent in game");
const setArgentPlayer = createAction<IRaces["argent"]["playedBy"]>(
  "[Races] Set Argent player"
);

const initialState: IRaces = {
  naalu: {
    inGame: false,
    tokenBeingChanged: false,
    tokenChangeable: false,
  },
  argent: {
    inGame: false,
    playedBy: null,
  },
};

const racesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(resetRaces, () => initialState)
    .addCase(setNaaluInGame, (state, action) => {
      state.naalu.inGame = action.payload;
    })
    .addCase(setNaaluTokenBeingChanged, (state, action) => {
      state.naalu.tokenBeingChanged = action.payload;
    })
    .addCase(setNaaluTokenChangeable, (state, action) => {
      state.naalu.tokenChangeable = action.payload;
    })
    .addCase(setArgentInGame, (state, action) => {
      state.argent.inGame = action.payload;
    })
    .addCase(setArgentPlayer, (state, action) => {
      state.argent.playedBy = action.payload;
    });
});

export {
  resetRaces,
  setNaaluInGame,
  setNaaluTokenBeingChanged,
  setNaaluTokenChangeable,
  setArgentInGame,
  setArgentPlayer,
};

export default racesReducer;
