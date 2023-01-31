import { useSelector } from "react-redux";
import { RootState } from "../../../../redux";

const useCheck = () => {
  const { players, races } = useSelector((state: RootState) => state);

  const playersNumber = players.length >= 3;
  const argent = races.argent.inGame === (races.argent.playedBy ? true : false);
  const gameStart = playersNumber && argent;

  return { playersNumber, argent, gameStart };
};

export default useCheck;
