import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux";
import {
  beginSecondAgenda,
  resetAppliedEffects,
  switchVotingStage,
} from "../../../../redux/reducers/agendaPhase";
import { reorderPlayers } from "../../../../redux/reducers/players";
import useSpeaker from "../useSpeaker";

const useStartSecondAgenda = () => {
  const { settings, players, agendaPhase } = useSelector(
    (state: RootState) => state
  );
  const dispatch = useDispatch();
  const { speakerIndex } = useSpeaker();

  const startSecondAgenda = () => {
    if (agendaPhase.appliedEffects.hackElection) {
      dispatch(
        reorderPlayers({
          startingPlayer:
            settings.tableOrder[
              speakerIndex < players.length - 1 ? speakerIndex + 1 : 0
            ],
          order: settings.tableOrder,
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
