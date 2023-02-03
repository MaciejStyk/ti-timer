import { combineReducers } from "redux";
import viewReducer from "./view";
import gameRoundReducer from "./gameRound";
import playerIndexReducer from "./playerIndex";
import roundOrderReducer from "./roundOrder";

const currentReducer = combineReducers({
  view: viewReducer,
  gameRound: gameRoundReducer,
  playerIndex: playerIndexReducer,
  roundOrder: roundOrderReducer,
});

export default currentReducer;
