import { useDispatch } from "react-redux";
import { passPlayer } from "../../redux/reducers/players";
import { ITime } from "../../types";
import useCurrentPlayer from "../useCurrentPlayer";
import usePassDisabled from "./passDisabled";

interface IProps {
  time: ITime;
  endTurn: () => void;
}

const usePass = (props: IProps) => {
  const { time, endTurn } = props;
  const { currentPlayer } = useCurrentPlayer();
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
