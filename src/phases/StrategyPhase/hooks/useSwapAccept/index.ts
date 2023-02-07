import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux";
import { switchSwapCardsStage } from "../../../../redux/reducers/strategyPhase";
import { IPhaseProps } from "../../../../types";
import useSwapCancel from "../useSwapCancel";

const useSwapAccept = (props: IPhaseProps) => {
  const { strategyPhase } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const handleSwapCancel = useSwapCancel(props);

  const handleSwapAccept = () => {
    dispatch(switchSwapCardsStage());
    if (!strategyPhase.swapCards.beforeSwap) {
      handleSwapCancel();
    }
  };

  return handleSwapAccept;
};

export default useSwapAccept;
