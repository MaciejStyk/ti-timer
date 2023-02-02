import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux";
import { resetChoosePlayerAction } from "../../../../redux/choosePlayerAction";
import { setSpeaker } from "../../../../redux/players";

const usePolitics = () => {
  const { choosePlayerAction } = useSelector((state: RootState) => state);
  const { chosenPlayer } = choosePlayerAction;
  const dispatch = useDispatch();

  const handlePolitics = () => {
    dispatch(setSpeaker(chosenPlayer!.id));
    dispatch(resetChoosePlayerAction());
  };

  return handlePolitics;
};

export default usePolitics;
