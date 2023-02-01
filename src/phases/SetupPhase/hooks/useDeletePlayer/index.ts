import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux";
import { addColor } from "../../../../redux/colors";
import { IPlayer, removePlayer } from "../../../../redux/players";
import { setArgentPlayer } from "../../../../redux/races";

const useDeletePlayer = () => {
  const { races } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const deletePlayer = (player: IPlayer) => {
    dispatch(removePlayer(player.id));
    dispatch(addColor(player.theme.backgroundColor));
    if (races.argent.playedBy?.id === player.id) {
      dispatch(setArgentPlayer(null));
    }
  };

  return deletePlayer;
};

export default useDeletePlayer;
