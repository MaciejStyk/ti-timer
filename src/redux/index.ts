import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import playersReducer from "./reducers/players";
import tableOrderReducer from "./reducers/tableOrder";
import roundOrderReducer from "./reducers/roundOrder";
import racesReducer from "./reducers/races";
import timerReducer from "./reducers/timer";
import colorsReducer from "./reducers/colors";
import choosePlayerAction from "./reducers/choosePlayerAction";
import strategyActionReducer from "./reducers/strategyAction";
import strategyPhaseReducer from "./reducers/strategyPhase";
import agendaPhaseReducer from "./reducers/agendaPhase";
import currentReducer from "./reducers/current";

const rootReducer = combineReducers({
  current: currentReducer,
  players: playersReducer,
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
