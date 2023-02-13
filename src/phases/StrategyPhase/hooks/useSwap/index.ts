import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux";
import { switchSwapCardsStage } from "../../../../redux/reducers/strategyPhase";
import { setChoosePlayerAction } from "../../../../redux/reducers/choosePlayerAction";
import { setNaaluTokenBeingChanged } from "../../../../redux/reducers/settings/races";
import {
  setSwapCardsBeingPlayed,
  setSwapCardsPlayable,
} from "../../../../redux/reducers/strategyPhase";
import { IPhaseProps } from "../../../../types";
import triggers from "../../../../global/triggers";

const useSwap = (props: IPhaseProps) => {
  const { handle } = props;
  const { settings, strategyPhase } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const handleCancel = () => {
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
  };

  const handleAccept = () => {
    dispatch(switchSwapCardsStage());
    if (!strategyPhase.swapCards.beforeSwap) {
      handleCancel();
    }
  };

  return { handleCancel, handleAccept };
};

export default useSwap;
