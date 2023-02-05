import { useSelector } from "react-redux";
import { RootState } from "../../../../redux";

const useCheck = () => {
  const { settings, players } = useSelector((state: RootState) => state);

  const playersNumber = players.length >= 3;
  const argent =
    settings.races.argent.inGame ===
    (settings.races.argent.playedBy ? true : false);
  const gameStart = playersNumber && argent;

  return { playersNumber, argent, gameStart };
};

export default useCheck;
