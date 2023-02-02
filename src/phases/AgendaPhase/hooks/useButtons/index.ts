import { useDispatch } from "react-redux";
import triggers from "../../../../global/triggers";
import {
  switchHackElection,
  switchImperialArbiter,
} from "../../../../redux/agendaPhase";
import { setChoosePlayerAction } from "../../../../redux/choosePlayerAction";

const useButtons = () => {
  const dispatch = useDispatch();

  const handleHackElection = () => {
    dispatch(switchHackElection());
  };

  const handlePoliticsRider = () => {
    dispatch(
      setChoosePlayerAction({
        playable: true,
        isBeingPlayed: true,
        trigger: triggers.politicsRider,
        chosenPlayer: null,
      })
    );
  };

  const handlePublicExecution = () => {
    dispatch(
      setChoosePlayerAction({
        playable: true,
        isBeingPlayed: true,
        trigger: triggers.publicExecution,
        chosenPlayer: null,
      })
    );
  };

  const handleImperialArbiter = () => {
    dispatch(switchImperialArbiter());
  };

  return {
    handleHackElection,
    handlePoliticsRider,
    handlePublicExecution,
    handleImperialArbiter,
  };
};

export default useButtons;
