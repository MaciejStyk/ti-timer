import { useDispatch } from "react-redux";
import { IPlayer, updatePlayersTimebank } from "../../redux/players";
import { ITime } from "../../types";

interface IProps {
  time: ITime;
  currentPlayer: IPlayer | null;
}

const useUpdateTimebank = (props: IProps) => {
  const { time, currentPlayer } = props;
  const dispatch = useDispatch();

  const updateCurrentPlayerTimebank = () => {
    if (currentPlayer) {
      dispatch(
        updatePlayersTimebank({
          id: currentPlayer.id,
          timeBank: {
            min:
              time.bank.value > 0
                ? Math.floor(time.bank.value / 60)
                : Math.ceil(time.bank.value / 60),
            sec:
              time.bank.value > 0
                ? Math.floor(time.bank.value % 60)
                : Math.ceil(time.bank.value % 60),
          },
        })
      );
    }
  };

  return updateCurrentPlayerTimebank;
};

export default useUpdateTimebank;
