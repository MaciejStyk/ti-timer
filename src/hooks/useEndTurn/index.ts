import { ITime } from "../../types";
import useEndTurnDisabled from "./endTurnDisabled";
import useFinishStrategyAction from "./finishStrategyAction";
import useFinishVoting from "./finishVoting";
import useNextPlayer from "./nextPlayer";
import useUpdateTimebank from "./updateTimebank";

interface IProps {
  time: ITime;
  endPhase: () => void;
}

const useEndTurn = (props: IProps) => {
  const { time, endPhase } = props;

  const endTurnDisabled = useEndTurnDisabled(time);
  const updateTimeBank = useUpdateTimebank(time);
  const finishStrategyAction = useFinishStrategyAction();
  const finishVoting = useFinishVoting();
  const switchToNextPlayer = useNextPlayer();

  const endTurn = () => {
    updateTimeBank();
    finishStrategyAction();
    finishVoting();
    switchToNextPlayer();
    endPhase();
  };

  return { endTurn, endTurnDisabled };
};

export default useEndTurn;
