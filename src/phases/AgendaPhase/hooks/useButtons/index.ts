import { useDispatch } from "react-redux";
import triggers from "../../../../global/triggers";
import { switchHackElection } from "../../../../redux/reducers/agendaPhase";
import { setChoosePlayerAction } from "../../../../redux/reducers/choosePlayerAction";

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

  return {
    handleHackElection,
    handlePoliticsRider,
    handlePublicExecution,
  };
};

export default useButtons;
