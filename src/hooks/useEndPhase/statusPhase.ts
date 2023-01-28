import { useDispatch, useSelector } from "react-redux";
import views from "../../global/views";
import store, { RootState } from "../../redux";
import { removeAllStrategyCards, reorderPlayers } from "../../redux/players";
import { resetAvailableStrategyCards } from "../../redux/strategyPhase";
import { changeView } from "../../redux/view";

const useEndStatusPhase = () => {
  const { players, tableOrder } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const endStatusPhase = () => {
    dispatch(removeAllStrategyCards());
    dispatch(resetAvailableStrategyCards());
    const speaker =
      store.getState().players.find((player) => player.speaker) || players[0];
    const speakerIndex = tableOrder.findIndex(
      (player) => player.id === speaker.id
    );
    dispatch(
      reorderPlayers({
        startingPlayer:
          tableOrder[speakerIndex < players.length - 1 ? speakerIndex + 1 : 0],
        order: tableOrder,
      })
    );
    dispatch(changeView(views.agendaPhase));
  };

  return endStatusPhase;
};

export default useEndStatusPhase;
