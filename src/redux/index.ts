import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import playersReducer from "./players";
import strategyPhaseReducer from "./strategyPhase";
import timerReducer from "./timer";
import viewReducer from "./view";
import tableOrderReducer from "./tableOrder";
import roundOrderReducer from "./roundOrder";
import playerIndexReducer from "./playerIndex";
import gameRoundReducer from "./gameRound";
import racesReducer from "./races";
import strategyActionReducer from "./strategyAction";
import agendaPhaseReducer from "./agendaPhase";
import choosePlayerAction from "./choosePlayerAction";
import colorsReducer from "./colors";

const rootReducer = combineReducers({
  view: viewReducer,
  gameRound: gameRoundReducer,
  timer: timerReducer,
  players: playersReducer,
  playerIndex: playerIndexReducer,
  tableOrder: tableOrderReducer,
  roundOrder: roundOrderReducer,
  races: racesReducer,
  strategyAction: strategyActionReducer,
  strategyPhase: strategyPhaseReducer,
  agendaPhase: agendaPhaseReducer,
  choosePlayerAction: choosePlayerAction,
  colors: colorsReducer,
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
export type AppDispatch = typeof store.dispatch;

export default store;
