import { createAction, createReducer } from "@reduxjs/toolkit";
import themes from "../global/themes";

const resetColors = createAction("[Colors] Reset");
const addColor = createAction<string>("[Colors] Add");
const removeColor = createAction<string>("[Colors] Remove");

const initialState: string[] = themes.map((color) => color.backgroundColor);

const colorsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(resetColors, () => initialState)
    .addCase(addColor, (state, action) => {
      return [...state, action.payload];
    })
    .addCase(removeColor, (state, action) => {
      return [...state].filter((color) => color !== action.payload);
    });
});

export { resetColors, addColor, removeColor };

export default colorsReducer;
