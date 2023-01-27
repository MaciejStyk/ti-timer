import { useDispatch } from "react-redux";
import views from "../../global/views";
import store from "../../redux";
import { unpassPlayers } from "../../redux/players";
import { changeView } from "../../redux/view";

const useEndActionPhase = () => {
  const dispatch = useDispatch();

  const endActionPhase = () => {
    const { players } = store.getState();
    if (players.every((player) => player.passed)) {
      dispatch(unpassPlayers());
      dispatch(changeView(views.statusPhase));
    }
  };

  return endActionPhase;
};

export default useEndActionPhase;
