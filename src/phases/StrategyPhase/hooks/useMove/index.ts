import useMoveToPlayersDeck from "./toPlayersDeck";
import useMoveToAvailableDeck from "./toAvailableDeck";
import useMoveBetweenPlayersDeck from "./betweenPlayersDeck";

const useMove = (swappedCardID?: number | undefined) => {
  const toPlayersDeck = useMoveToPlayersDeck();
  const toAvailableDeck = useMoveToAvailableDeck();
  const betweenPlayersDeck = useMoveBetweenPlayersDeck(swappedCardID)

  return { toPlayersDeck, toAvailableDeck, betweenPlayersDeck };
};

export default useMove;
