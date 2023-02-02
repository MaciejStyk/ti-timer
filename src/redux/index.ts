import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import viewReducer from "./view";
import gameRoundReducer from "./gameRound";
import playersReducer from "./players";
import playerIndexReducer from "./playerIndex";
import tableOrderReducer from "./tableOrder";
import roundOrderReducer from "./roundOrder";
import racesReducer from "./races";
import timerReducer from "./timer";
import colorsReducer from "./colors";
import choosePlayerAction from "./choosePlayerAction";
import strategyActionReducer from "./strategyAction";
import strategyPhaseReducer from "./strategyPhase";
import agendaPhaseReducer from "./agendaPhase";

const currentReducer = combineReducers({
  view: viewReducer,
  gameRound: gameRoundReducer,
});

const rootReducer = combineReducers({
  current: currentReducer,
  players: playersReducer,
  playerIndex: playerIndexReducer,
  tableOrder: tableOrderReducer,
  roundOrder: roundOrderReducer,
  races: racesReducer,
  timer: timerReducer,
  colors: colorsReducer,
  choosePlayerAction: choosePlayerAction,
  strategyAction: strategyActionReducer,
  strategyPhase: strategyPhaseReducer,
  agendaPhase: agendaPhaseReducer,
});

const persistedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState")!)
  : {};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
});

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
