import { useDispatch } from "react-redux";
import views from "../../global/views";
import store from "../../redux";
import { IAgendaPhase } from "../../redux/agendaPhase";
import { incrementGameRound } from "../../redux/gameRound";
import { setPlayerIndex } from "../../redux/playerIndex";
import {
  addTimeToAllPlayersAfterRound,
  IPlayer,
  reorderPlayers,
  unpassPlayers,
} from "../../redux/players";
import { IRaces, setNaaluTokenChangeable } from "../../redux/races";
import { setSwapCardsPlayable } from "../../redux/strategyPhase";
import { ITimer } from "../../redux/timer";
import { changeView } from "../../redux/view";

interface IProps {
  players: IPlayer[];
  timer: ITimer;
  races: IRaces;
  tableOrder: IPlayer[];
  agendaPhase: IAgendaPhase;
}

const useEndAgendaPhase = (props: IProps) => {
  const { players, timer, races, tableOrder, agendaPhase } = props;
  const dispatch = useDispatch();

  const endAgendaPhase = () => {
    if (
      !agendaPhase.unlocked ||
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
