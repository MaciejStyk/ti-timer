import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux";
import {
  beginSecondAgenda,
  resetAppliedEffects,
  switchVotingStage,
} from "../../../../redux/agendaPhase";
import { reorderPlayers } from "../../../../redux/players";
import useSpeaker from "../useSpeaker";

const useStartSecondAgenda = () => {
  const { players, tableOrder, agendaPhase } = useSelector(
    (state: RootState) => state
  );
  const dispatch = useDispatch();
  const { speakerIndex } = useSpeaker();

  const startSecondAgenda = () => {
    if (agendaPhase.appliedEffects.hackElection) {
      dispatch(
        reorderPlayers({
          startingPlayer:
            tableOrder[
              speakerIndex < players.length - 1 ? speakerIndex + 1 : 0
            ],
          order: tableOrder,
        })
      );
    }
    dispatch(resetAppliedEffects());
    dispatch(beginSecondAgenda());
    dispatch(switchVotingStage());
  };

  return startSecondAgenda;
};

export default useStartSecondAgenda;
