import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux";
import { addColor } from "../../../../redux/reducers/settings/colors";
import { IPlayer, removePlayer } from "../../../../redux/reducers/players";
import { setArgentPlayer } from "../../../../redux/reducers/settings/races";

const useDeletePlayer = () => {
  const { settings } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const deletePlayer = (player: IPlayer) => {
    dispatch(removePlayer(player.id));
    dispatch(addColor(player.theme.backgroundColor));
    if (settings.races.argent.playedBy?.id === player.id) {
      dispatch(setArgentPlayer(null));
    }
  };

  return deletePlayer;
};

export default useDeletePlayer;
