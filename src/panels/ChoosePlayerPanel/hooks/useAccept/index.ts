import { useSelector } from "react-redux";
import { RootState } from "../../../../redux";
import { IPhaseProps } from "../../../../types";
import triggers from "../../../../global/triggers";
import usePolitics from "./politics";
import usePoliticsRider from "./politicsRider";
import useNaaluTokenChange from "./naaluTokenChange";
import usePublicExecution from "./publicExecution";

const useAccept = (props: IPhaseProps) => {
  const { choosePlayerAction } = useSelector((state: RootState) => state);
  const { trigger, chosenPlayer } = choosePlayerAction;

  const handlePolitics = usePolitics();
  const handlePoliticsRider = usePoliticsRider();
  const handleNaaluTokenChange = useNaaluTokenChange(props);
  const handlePublicExecution = usePublicExecution();

  const handleAccept = () => {
    if (chosenPlayer) {
      switch (trigger) {
        case triggers.politics:
          handlePolitics();
          break;

        case triggers.politicsRider:
          handlePoliticsRider();
          break;

        case triggers.naaluTokenChange:
          handleNaaluTokenChange();
          break;

        case triggers.publicExecution:
          handlePublicExecution();
          break;
      }
    }
  };

  return handleAccept;
};

export default useAccept;
