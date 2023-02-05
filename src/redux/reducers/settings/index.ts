import { combineReducers } from "redux";
import timerReducer from "./timer";
import colorsReducer from "./colors";
import racesReducer from "./races";
import tableOrderReducer from "./tableOrder";

const settingsReducer = combineReducers({
  timer: timerReducer,
  colors: colorsReducer,
  races: racesReducer,
  tableOrder: tableOrderReducer,
});

export default settingsReducer;
