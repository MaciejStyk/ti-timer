import { createAction, createReducer } from "@reduxjs/toolkit";
import { IStrategyCard } from "../../../global/strategyCards";

export interface IPlayer {
  id: string;
  name: string;
  theme: {
    color: string;
    backgroundColor: string;
  };
  strategyCards: IStrategyCard[];
  timeBank: {
    min: number;
    sec: number;
  };
  speaker: boolean;
  passed: boolean;
  hasNaaluToken?: boolean;
}

const setPlayers = createAction<IPlayer[]>("[Players] Set");
const addPlayer = createAction<IPlayer>("[Players] Add player");
const removePlayer = createAction<string>("[Players] Remove player");
const setSpeaker = createAction<string>("[Players] Set speaker");
const setNaaluTokenHolder = createAction<string>(
  "[Players] Set Naalu Token Holder"
);
const addStrategyCardToPlayerDeck = createAction<{
  id: string;
  strategyCard: IStrategyCard;
}>("[Players] Add card to player's deck");
const addStrategyCardToPlayerDeckFront = createAction<{
  id: string;
  strategyCard: IStrategyCard;
}>("[Players] Add card to player's deck frontside");
const removeStrategyCardFromPlayerDeck = createAction<{
  id: string;
  strategyCard: IStrategyCard;
}>("[Players] Remove card from player's deck");
const exhaustStrategyCardAtPlayerDeck = createAction<{
  id: string;
  strategyCard: IStrategyCard;
}>("[Players] Exhaust card at player's deck");
const removeAllStrategyCards = createAction(
  "[Players] Remove cards from all players"
);
const sortPlayersStrategyCards = createAction(
  "[Players] Sort all players' cards"
);
const sortPlayersByInitiative = createAction<{ naaluInGame: boolean }>(
  "[Players] Sort players by initiative"
);
const setPlayersTimeBank = createAction<IPlayer["timeBank"]>(
  "[Players] Set all players' timebank"
);
const updatePlayersTimebank = createAction<{
  id: string;
  timeBank: IPlayer["timeBank"];
}>("[Players] Update player's timebank");
const addTimeToAllPlayersAfterRound = createAction<IPlayer["timeBank"]>(
  "[Players] Add time to all players' timebanks after round"
);
const reorderPlayers = createAction<{
  startingPlayer: IPlayer;
  order: IPlayer[];
  clockwise?: boolean;
}>("[Players] Reorder");
const reorderPlayersWithArgentAsFirst = createAction<IPlayer>(
  "[Players] Reoder with Argent player as first"
);
const passPlayer = createAction<string>("[Players] Pass player");
const unpassPlayers = createAction("[Players] Unpass all players");

const initialState: IPlayer[] = [];

const playersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setPlayers, (state, action) => {
      return action.payload;
    })
    .addCase(addPlayer, (state, action) => {
      return [...state, action.payload];
    })
    .addCase(removePlayer, (state, action) => {
      const id = action.payload;
      return state.filter((player) => player.id !== id);
    })
    .addCase(setSpeaker, (state, action) => {
      const id = action.payload;
      return state.map((player) =>
        player.id === id
          ? { ...player, speaker: true }
          : { ...player, speaker: false }
      );
    })
    .addCase(setNaaluTokenHolder, (state, action) => {
      const id = action.payload;
      return state.map((player) =>
        player.id === id
          ? { ...player, hasNaaluToken: true }
          : { ...player, hasNaaluToken: false }
      );
    })
    .addCase(addStrategyCardToPlayerDeck, (state, action) => {
      const { id, strategyCard } = action.payload;
      const index = state.findIndex((player) => player.id === id);
      state[index].strategyCards = [
        ...state[index].strategyCards,
        strategyCard,
      ];
    })
    .addCase(addStrategyCardToPlayerDeckFront, (state, action) => {
      const { id, strategyCard } = action.payload;
      const index = state.findIndex((player) => player.id === id);
      state[index].strategyCards = [
        strategyCard,
        ...state[index].strategyCards,
      ];
    })
    .addCase(removeStrategyCardFromPlayerDeck, (state, action) => {
      const { id, strategyCard } = action.payload;
      const index = state.findIndex((player) => player.id === id);
      state[index].strategyCards = state[index].strategyCards.filter(
        (card) => card.id !== strategyCard.id
      );
    })
    .addCase(exhaustStrategyCardAtPlayerDeck, (state, action) => {
      const { id, strategyCard } = action.payload;
      const index = state.findIndex((player) => player.id === id);
      state[index].strategyCards = state[index].strategyCards.map((card) => {
        if (card.id === strategyCard.id) {
          return { ...card, exhausted: true };
        } else {
          return card;
        }
      });
    })
    .addCase(removeAllStrategyCards, (state) => {
      return state.map((player) => {
        return {
          ...player,
          strategyCards: [],
        };
      });
    })
    .addCase(sortPlayersStrategyCards, (state) => {
      return state.map((player) => {
        return {
          ...player,
          strategyCards: [...player.strategyCards].sort((a, b) => a.id - b.id),
        };
      });
    })
    .addCase(sortPlayersByInitiative, (state, action) => {
      const { naaluInGame } = action.payload;
      let newPlayersArray: IPlayer[] = [...state].sort(
        (a, b) => a.strategyCards[0].id - b.strategyCards[0].id
      );
      if (naaluInGame) {
        const naaluTokenHolder =
          newPlayersArray.find((player) => player.hasNaaluToken) ||
          newPlayersArray[0];
        const naaluTokenHolderIndex =
          newPlayersArray.findIndex((player) => player.hasNaaluToken) || 0;
        newPlayersArray.splice(naaluTokenHolderIndex, 1);
        newPlayersArray = [naaluTokenHolder, ...newPlayersArray];
      }
      return newPlayersArray;
    })
    .addCase(reorderPlayers, (state, action) => {
      const { startingPlayer, order, clockwise = true } = action.payload;
      let tableOrder = [...order];
      if (!clockwise) {
        tableOrder.reverse();
      }
      const orderIndex = tableOrder.findIndex(
        (player) => player.id === startingPlayer.id
      );
      const rearrangedOrder: IPlayer[] = [
        ...tableOrder.slice(orderIndex),
        ...tableOrder.slice(0, orderIndex),
      ];
      return rearrangedOrder.map(
        (oldPlayer) => state.find((player) => player.id === oldPlayer.id)!
      );
    })
    .addCase(reorderPlayersWithArgentAsFirst, (state, action) => {
      const argentID = action.payload.id;
      let newPlayersArray: IPlayer[] = [...state];
      const argentPlayer =
        newPlayersArray.find((player) => player.id === argentID) ||
        newPlayersArray[0];
      const argentPlayerIndex =
        newPlayersArray.findIndex((player) => player.id === argentPlayer.id) ||
        0;
      newPlayersArray.splice(argentPlayerIndex, 1);
      newPlayersArray = [argentPlayer, ...newPlayersArray];
      return newPlayersArray;
    })
    .addCase(setPlayersTimeBank, (state, action) => {
      return state.map((player) => {
        return {
          ...player,
          timeBank: action.payload,
        };
      });
    })
    .addCase(updatePlayersTimebank, (state, action) => {
      const { id, timeBank } = action.payload;
      const index = state.findIndex((player) => player.id === id);
      state[index].timeBank = timeBank;
    })
    .addCase(addTimeToAllPlayersAfterRound, (state, action) => {
      const { min, sec } = action.payload;
      return state.map((player) => {
        return {
          ...player,
          timeBank: {
            min: player.timeBank.min + min,
            sec: player.timeBank.sec + sec,
          },
        };
      });
    })
    .addCase(passPlayer, (state, action) => {
      const id = action.payload;
      const index = state.findIndex((player) => player.id === id);
      state[index].passed = true;
    })
    .addCase(unpassPlayers, (state) => {
      return state.map((player) => {
        return {
          ...player,
          passed: false,
        };
      });
    });
});

export {
  setPlayers,
  addPlayer,
  removePlayer,
  setSpeaker,
  setNaaluTokenHolder,
  addStrategyCardToPlayerDeck,
  addStrategyCardToPlayerDeckFront,
  removeStrategyCardFromPlayerDeck,
  exhaustStrategyCardAtPlayerDeck,
  removeAllStrategyCards,
  sortPlayersStrategyCards,
  sortPlayersByInitiative,
  reorderPlayers,
  reorderPlayersWithArgentAsFirst,
  setPlayersTimeBank,
  updatePlayersTimebank,
  addTimeToAllPlayersAfterRound,
  passPlayer,
  unpassPlayers,
};
export default playersReducer;
