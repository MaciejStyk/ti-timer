import { useDispatch } from "react-redux";
import {
  IAgendaPhase,
  stopVoting,
  switchVotingStage,
} from "../../redux/agendaPhase";
import { IPlayer } from "../../redux/players";

interface IProps {
  players: IPlayer[];
  playerIndex: number;
  agendaPhase: IAgendaPhase;
}

const useFinishVoting = (props: IProps) => {
  const { players, playerIndex, agendaPhase } = props;
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
