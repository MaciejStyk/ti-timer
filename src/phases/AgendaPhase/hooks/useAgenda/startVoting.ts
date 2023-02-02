import { useDispatch, useSelector } from "react-redux";
import store, { RootState } from "../../../../redux";
import { beginVoting } from "../../../../redux/agendaPhase";
import { setPlayerIndex } from "../../../../redux/playerIndex";
import {
  reorderPlayers,
  reorderPlayersWithArgentAsFirst,
} from "../../../../redux/players";
import useSpeaker from "../useSpeaker";

const useStartVoting = () => {
  const { players, races, tableOrder, agendaPhase } = useSelector(
    (state: RootState) => state
  );
  const dispatch = useDispatch();
  const { speakerIndex } = useSpeaker();

  const startVoting = () => {
    if (agendaPhase.appliedEffects.hackElection) {
      dispatch(
        reorderPlayers({
          startingPlayer:
            tableOrder[
              speakerIndex === 0 ? players.length - 1 : speakerIndex - 1
            ],
          order: tableOrder,
          clockwise: false,
        })
      );
    }
    if (races.argent.inGame && races.argent.playedBy) {
      dispatch(reorderPlayersWithArgentAsFirst(races.argent.playedBy));
    }
    if (store.getState().players[0].passed) {
      dispatch(setPlayerIndex(1));
    }
    dispatch(beginVoting());
  };

  return startVoting;
};

export default useStartVoting;
