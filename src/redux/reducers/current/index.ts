import { combineReducers } from "redux";
import gameRoundReducer from "./gameRound";
import playerIndexReducer from "./playerIndex";
import viewReducer from "./view";

const currentReducer = combineReducers({
  view: viewReducer,
  gameRound: gameRoundReducer,
  playerIndex: playerIndexReducer,
});

export default currentReducer;
