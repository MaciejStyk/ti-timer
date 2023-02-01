import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux";
import { setArgentPlayer } from "../../../../redux/races";

const useChangeColor = () => {
  const { players } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const changeColor = (color: string) => {
    const argentPlayer = players.find(
      (player) => player.theme.backgroundColor === color
    );
    dispatch(setArgentPlayer(argentPlayer!));
  };

  return changeColor;
};

export default useChangeColor;
