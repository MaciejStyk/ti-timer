import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { updatePlayersTimebank } from "../../redux/reducers/players";
import { ITime } from "../../types";

const useUpdateTimebank = (time: ITime) => {
  const { current, players } = useSelector((state: RootState) => state);
  const currentPlayer = players.length !== 0 ? players[current.playerIndex] : null;
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
