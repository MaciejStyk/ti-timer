import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux";
import {
  resetChoosePlayerAction,
  setChoosePlayerAction,
} from "../../../../redux/choosePlayerAction";
import triggers from "../../../../global/triggers";

const useCancel = () => {
  const { choosePlayerAction } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const handleCancel = () => {
    switch (choosePlayerAction.trigger) {
      case triggers.politics:
        dispatch(
          setChoosePlayerAction({
            playable: true,
            isBeingPlayed: false,
            trigger: "",
            chosenPlayer: null,
          })
        );
        break;

      case triggers.politicsRider:
      case triggers.publicExecution:
        dispatch(resetChoosePlayerAction());
        break;
    }
  };

  return handleCancel;
};

export default useCancel;
