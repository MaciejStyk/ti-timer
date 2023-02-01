import { useDispatch, useSelector } from "react-redux";
import views from "../../global/views";
import store, { RootState } from "../../redux";
import { incrementGameRound } from "../../redux/gameRound";
import { setPlayerIndex } from "../../redux/playerIndex";
import {
  addTimeToAllPlayersAfterRound,
  reorderPlayers,
  unpassPlayers,
} from "../../redux/players";
import { setNaaluTokenChangeable } from "../../redux/races";
import { setSwapCardsPlayable } from "../../redux/strategyPhase";
import { changeView } from "../../redux/view";

const useEndAgendaPhase = () => {
  const { players, timer, races, tableOrder, agendaPhase } = useSelector(
    (state: RootState) => state
  );
  const dispatch = useDispatch();

  const endAgendaPhase = () => {
    if (
      agendaPhase.locked ||
      (!agendaPhase.beforeVoting && agendaPhase.round === 2)
    ) {
      dispatch(incrementGameRound());
      dispatch(setPlayerIndex(0));
      if (races.naalu.inGame) {
        dispatch(setNaaluTokenChangeable(true));
      }
      if (
        races.winnuOrHacan.inGame ||
        agendaPhase.appliedEffects.imperialArbiter
      ) {
        dispatch(setSwapCardsPlayable(true));
      }
      dispatch(
        reorderPlayers({
          startingPlayer:
            store.getState().players.find((player) => player.speaker) ||
            players[0],
          order: tableOrder,
        })
      );
      dispatch(unpassPlayers());
      dispatch(addTimeToAllPlayersAfterRound(timer.timeAddedPerRound));
      dispatch(changeView(views.strategyPhase));
    }
  };

  return endAgendaPhase;
};

export default useEndAgendaPhase;
