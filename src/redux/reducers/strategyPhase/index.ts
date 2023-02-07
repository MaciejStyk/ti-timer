import { createAction, createReducer } from "@reduxjs/toolkit";
import strategyCards, { IStrategyCard } from "../../../global/strategyCards";

export interface IStrategyPhase {
  availableStrategyCards: IStrategyCard[];
  round: number;
  numberOfRounds: number;
  swapCards: {
    playable: boolean;
    isBeingPlayed: boolean;
    beforeSwap: boolean;
  };
}

const resetStrategyPhase = createAction("[Strategy Phase] Reset");
const addStrategyCardToAvailableDeck = createAction<IStrategyCard>(
  "[Strategy Phase] Add card to available deck"
);
const removeStrategyCardFromAvailableDeck = createAction<IStrategyCard>(
  "[Strategy Phase] Remove card from available deck"
);
const resetAvailableStrategyCards = createAction(
  "[Strategy Phase] Reset available cards"
);
const setStrategyPhaseRound = createAction<number>(
  "[Strategy Phase] Set round"
);
const setStrategyPhaseNumberOfRounds = createAction<number>(
  "[Strategy Phase] Set number of rounds"
);
const setSwapCardsPlayable = createAction<boolean>(
  "[Strategy Phase] [Swap Cards] Set playable"
);
const setSwapCardsBeingPlayed = createAction<boolean>(
  "[Strategy Phase] [Swap Cards] Set being played"
);
const switchSwapCardsStage = createAction(
  "[Strategy Phase] [Swap Cards] Switch stage"
);

const initialState: IStrategyPhase = {
  availableStrategyCards: strategyCards,
  round: 1,
  numberOfRounds: 1,
  swapCards: {
    playable: true,
    isBeingPlayed: false,
    beforeSwap: true,
  },
};

const strategyPhaseReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(resetStrategyPhase, () => initialState)
    .addCase(addStrategyCardToAvailableDeck, (state, action) => {
      const strategyCard = action.payload;
      state.availableStrategyCards = [
        ...state.availableStrategyCards,
        strategyCard,
      ].sort((a, b) => a.id - b.id);
    })
    .addCase(removeStrategyCardFromAvailableDeck, (state, action) => {
      const strategyCard = action.payload;
      state.availableStrategyCards = [...state.availableStrategyCards].filter(
        (card) => card.id !== strategyCard.id
      );
    })
    .addCase(resetAvailableStrategyCards, (state) => {
      state.availableStrategyCards = strategyCards;
    })
    .addCase(setStrategyPhaseRound, (state, action) => {
      state.round = action.payload;
    })
    .addCase(setStrategyPhaseNumberOfRounds, (state, action) => {
      state.numberOfRounds = action.payload;
    })
    .addCase(setSwapCardsPlayable, (state, action) => {
      state.swapCards.playable = action.payload;
    })
    .addCase(setSwapCardsBeingPlayed, (state, action) => {
      state.swapCards.isBeingPlayed = action.payload;
    })
    .addCase(switchSwapCardsStage, (state) => {
      state.swapCards.beforeSwap = !state.swapCards.beforeSwap;
    });
});

export {
  resetStrategyPhase,
  addStrategyCardToAvailableDeck,
  removeStrategyCardFromAvailableDeck,
  resetAvailableStrategyCards,
  setStrategyPhaseRound,
  setStrategyPhaseNumberOfRounds,
  setSwapCardsPlayable,
  setSwapCardsBeingPlayed,
  switchSwapCardsStage,
};

export default strategyPhaseReducer;
