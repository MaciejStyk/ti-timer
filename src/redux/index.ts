import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import settingsReducer from "./reducers/settings";
import currentReducer from "./reducers/current";
import playersReducer from "./reducers/players";
import choosePlayerAction from "./reducers/choosePlayerAction";
import strategyActionReducer from "./reducers/strategyAction";
import strategyPhaseReducer from "./reducers/strategyPhase";
import agendaPhaseReducer from "./reducers/agendaPhase";
import tableOrderReducer from "./reducers/settings/tableOrder";

const rootReducer = combineReducers({
  settings: settingsReducer,
  current: currentReducer,
  players: playersReducer,
  tableOrder: tableOrderReducer,
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
