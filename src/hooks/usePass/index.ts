import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { passPlayer } from "../../redux/reducers/players";
import { ITime } from "../../types";
import usePassDisabled from "./passDisabled";

interface IProps {
  time: ITime;
  endTurn: () => void;
}

const usePass = (props: IProps) => {
  const { time, endTurn } = props;
  const { current, players } = useSelector((state: RootState) => state);
  const currentPlayer =
    players.length !== 0 ? players[current.playerIndex] : null;
  const dispatch = useDispatch();

  const passDisabled = usePassDisabled(time);

  const pass = () => {
    if (currentPlayer) {
      dispatch(passPlayer(currentPlayer.id));
    }
    endTurn();
  };

  return { pass, passDisabled };
};

export default usePass;
