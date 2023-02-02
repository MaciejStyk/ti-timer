import { useSelector } from "react-redux";
import { RootState } from "../../../../redux";
import triggers from "../../../../global/triggers";

const usePlayers = () => {
  const { players, choosePlayerAction } = useSelector(
    (state: RootState) => state
  );
  const { trigger } = choosePlayerAction;

  const playersToChooseFrom =
    trigger === triggers.politics
      ? players.filter((player) => !player.speaker)
      : players;

  return playersToChooseFrom;
};

export default usePlayers;
