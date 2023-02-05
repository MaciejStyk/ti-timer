import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux";
import { setChoosePlayerAction } from "../../../../redux/reducers/choosePlayerAction";
import { setNaaluTokenBeingChanged } from "../../../../redux/reducers/settings/races";
import {
  setSwapCardsBeingPlayed,
  setSwapCardsPlayable,
  switchSwapCardsStage,
} from "../../../../redux/reducers/strategyPhase";
import { IPhaseProps } from "../../../../types";
import triggers from "../../../../global/triggers";

const useSwapAccept = (props: IPhaseProps) => {
  const { handle } = props;
  const { settings, strategyPhase } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const handleSwapAccept = () => {
    dispatch(switchSwapCardsStage());
    if (!strategyPhase.swapCards.beforeSwap) {
      dispatch(setSwapCardsBeingPlayed(false));
      dispatch(setSwapCardsPlayable(false));
      if (settings.races.naalu.inGame) {
        dispatch(setNaaluTokenBeingChanged(true));
        dispatch(
          setChoosePlayerAction({
            playable: true,
            isBeingPlayed: true,
            trigger: triggers.naaluTokenChange,
            chosenPlayer: null,
          })
        );
      } else {
        handle.endPhase();
      }
    }
  };

  return handleSwapAccept;
};

export default useSwapAccept;
