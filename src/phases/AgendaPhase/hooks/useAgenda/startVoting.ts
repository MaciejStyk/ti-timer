import { useDispatch, useSelector } from "react-redux";
import store, { RootState } from "../../../../redux";
import { beginVoting } from "../../../../redux/reducers/agendaPhase";
import { setPlayerIndex } from "../../../../redux/reducers/current/playerIndex";
import {
  reorderPlayers,
  reorderPlayersWithArgentAsFirst,
} from "../../../../redux/reducers/players";
import useSpeaker from "../useSpeaker";

const useStartVoting = () => {
  const { settings, players, agendaPhase } = useSelector(
    (state: RootState) => state
  );
  const dispatch = useDispatch();
  const { speakerIndex } = useSpeaker();

  const startVoting = () => {
    if (agendaPhase.appliedEffects.hackElection) {
      dispatch(
        reorderPlayers({
          startingPlayer:
            settings.tableOrder[
              speakerIndex === 0 ? players.length - 1 : speakerIndex - 1
            ],
          order: settings.tableOrder,
          clockwise: false,
        })
      );
    }
    if (settings.races.argent.inGame && settings.races.argent.playedBy) {
      dispatch(reorderPlayersWithArgentAsFirst(settings.races.argent.playedBy));
    }
    if (store.getState().players[0].passed) {
      dispatch(setPlayerIndex(1));
    }
    dispatch(beginVoting());
  };

  return startVoting;
};

export default useStartVoting;
