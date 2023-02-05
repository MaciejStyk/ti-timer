import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux";
import { resetChoosePlayerAction } from "../../../../redux/reducers/choosePlayerAction";
import { setNaaluTokenHolder } from "../../../../redux/reducers/players";
import {
  setNaaluTokenBeingChanged,
  setNaaluTokenChangeable,
} from "../../../../redux/reducers/settings/races";
import { IPhaseProps } from "../../../../types";

const useNaaluTokenChange = (props: IPhaseProps) => {
  const { handle } = props;
  const { choosePlayerAction } = useSelector((state: RootState) => state);
  const { chosenPlayer } = choosePlayerAction;
  const dispatch = useDispatch();

  const handleNaaluTokenChange = () => {
    dispatch(setNaaluTokenHolder(chosenPlayer!.id));
    dispatch(setNaaluTokenBeingChanged(false));
    dispatch(setNaaluTokenChangeable(false));
    dispatch(resetChoosePlayerAction());
    handle.endPhase();
  };

  return handleNaaluTokenChange;
};

export default useNaaluTokenChange;
