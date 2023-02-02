import { useDispatch } from "react-redux";
import { IPlayer, setPlayers, setSpeaker } from "../../../../redux/reducers/players";

const useChangePlayers = () => {
  const dispatch = useDispatch();

  const changePlayers = (players: IPlayer[]) => {
    dispatch(setPlayers(players));
    dispatch(setSpeaker(players[0].id));
  };

  return changePlayers;
};

export default useChangePlayers;
