import { RootState } from "../../redux";
import { useSelector } from "react-redux";

const useCurrentPlayer = () => {
  const { current, players, strategyPhase } = useSelector(
    (state: RootState) => state
  );

  const currentPlayer =
    players.length !== 0 ? players[current.playerIndex] : undefined;

  const currentPlayerCanPick = currentPlayer
    ? currentPlayer.strategyCards.length <
      Math.min(strategyPhase.round, strategyPhase.numberOfRounds)
    : false;

  return { currentPlayer, currentPlayerCanPick };
};

export default useCurrentPlayer;
