import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { stopVoting, switchVotingStage } from "../../redux/agendaPhase";

const useFinishVoting = () => {
  const { players, playerIndex, agendaPhase } = useSelector(
    (state: RootState) => state
  );
  const dispatch = useDispatch();

  const finishVoting = () => {
    if (
      agendaPhase.isBeingVoted &&
      (playerIndex === players.length - 1 ||
        (playerIndex === players.length - 2 && players[playerIndex + 1].passed))
    ) {
      dispatch(stopVoting());
      dispatch(switchVotingStage());
    }
  };

  return finishVoting;
};

export default useFinishVoting;
