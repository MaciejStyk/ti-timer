import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import {
  stopVoting,
  switchVotingStage,
} from "../../redux/reducers/agendaPhase";

const useFinishVoting = () => {
  const { current, players, agendaPhase } = useSelector(
    (state: RootState) => state
  );
  const dispatch = useDispatch();

  const finishVoting = () => {
    if (
      agendaPhase.isBeingVoted &&
      (current.playerIndex === players.length - 1 ||
        (current.playerIndex === players.length - 2 &&
          players[current.playerIndex + 1].passed))
    ) {
      dispatch(stopVoting());
      dispatch(switchVotingStage());
    }
  };

  return finishVoting;
};

export default useFinishVoting;
