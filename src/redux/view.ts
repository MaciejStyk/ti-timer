import { createAction, createReducer } from "@reduxjs/toolkit";
import views from "../global/views";

const changeView = createAction<string>("[View] Change");

const initialState: string = views.setupPhase;

const viewReducer = createReducer(initialState, (builder) => {
  builder.addCase(changeView, (state, action) => {
    return action.payload;
  });
});

export { changeView };

export default viewReducer;
