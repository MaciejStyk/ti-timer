import { useDispatch } from "react-redux";
import { updatePlayersTimebank } from "../../redux/reducers/players";
import { ITime } from "../../types";
import useCurrentPlayer from "../useCurrentPlayer";

const useUpdateTimebank = (time: ITime) => {
  const { currentPlayer } = useCurrentPlayer();
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
