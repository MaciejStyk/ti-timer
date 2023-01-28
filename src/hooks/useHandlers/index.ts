import { ITime } from "../../types";
import useEndPhase from "../useEndPhase";
import useEndTurn from "../useEndTurn";
import usePause from "../usePause";
import usePass from "../usePass";

const useHandlers = (time: ITime) => {
  const pause = usePause(time);
  const endPhase = useEndPhase();
  const { endTurn, endTurnDisabled } = useEndTurn({ time, endPhase });
  const { pass, passDisabled } = usePass({ time, endTurn });

  return { pause, endTurn, endTurnDisabled, pass, passDisabled, endPhase };
};

export default useHandlers;
