import { createAction, createReducer } from "@reduxjs/toolkit";

export interface ITimer {
  timeBank: {
    min: number;
    sec: number;
  };
  timeAddedPerRound: {
    min: number;
    sec: number;
  };
  timeDelayedPerTurn: {
    min: number;
    sec: number;
  };
}

const resetTimer = createAction("[Timer] Reset");
const setTimeBankMin = createAction<number>("[Timer] Set timebank - min");
const setTimeBankSec = createAction<number>("[Timer] Set timebank - sec");
const setTimeAddedPerRoundMin = createAction<number>(
  "[Timer] Set time added per round - min"
);
const setTimeAddedPerRoundSec = createAction<number>(
  "[Timer] Set time added per round - sec"
);
const setTimeDelayedPerTurnMin = createAction<number>(
  "[Timer] Set time delayed per turn - min"
);
const setTimeDelayedPerTurnSec = createAction<number>(
  "[Timer] Set time delayed per turn - sec"
);

const initialState: ITimer = {
  timeBank: {
    min: 20,
    sec: 0,
  },
  timeAddedPerRound: {
    min: 15,
    sec: 0,
  },
  timeDelayedPerTurn: {
    min: 0,
    sec: 4,
  },
};

const timerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(resetTimer, () => initialState)
    .addCase(setTimeBankMin, (state, action) => {
      return {
        ...state,
        timeBank: {
          ...state.timeBank,
          min: action.payload,
        },
      };
    })
    .addCase(setTimeBankSec, (state, action) => {
      return {
        ...state,
        timeBank: {
          ...state.timeBank,
          sec: action.payload,
        },
      };
    })
    .addCase(setTimeAddedPerRoundMin, (state, action) => {
      return {
        ...state,
        timeAddedPerRound: {
          ...state.timeAddedPerRound,
          min: action.payload,
        },
      };
    })
    .addCase(setTimeAddedPerRoundSec, (state, action) => {
      return {
        ...state,
        timeAddedPerRound: {
          ...state.timeAddedPerRound,
          sec: action.payload,
        },
      };
    })
    .addCase(setTimeDelayedPerTurnMin, (state, action) => {
      return {
        ...state,
        timeDelayedPerTurn: {
          ...state.timeDelayedPerTurn,
          min: action.payload,
        },
      };
    })
    .addCase(setTimeDelayedPerTurnSec, (state, action) => {
      return {
        ...state,
        timeDelayedPerTurn: {
          ...state.timeDelayedPerTurn,
          sec: action.payload,
        },
      };
    });
});

export {
  resetTimer,
  setTimeBankMin,
  setTimeBankSec,
  setTimeAddedPerRoundMin,
  setTimeAddedPerRoundSec,
  setTimeDelayedPerTurnMin,
  setTimeDelayedPerTurnSec,
};

export default timerReducer;
