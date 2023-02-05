import { combineReducers } from "redux";
import timerReducer from "./timer";
import colorsReducer from "./colors";
import racesReducer from "./races";

const settingsReducer = combineReducers({
  timer: timerReducer,
  colors: colorsReducer,
  races: racesReducer,
});

export default settingsReducer;
