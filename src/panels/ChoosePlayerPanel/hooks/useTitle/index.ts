import { useSelector } from "react-redux";
import { RootState } from "../../../../redux";
import triggers from "../../../../global/triggers";

const useTitle = () => {
  const { choosePlayerAction } = useSelector((state: RootState) => state);

  const getTitle = () => {
    switch (choosePlayerAction.trigger) {
      case triggers.politics:
      case triggers.politicsRider:
        return "Choose a new speaker";
      case triggers.naaluTokenChange:
        return "Choose a player with the naalu token";
      case triggers.publicExecution:
        return "Choose an elected player";
    }
  };

  return getTitle;
};

export default useTitle;
