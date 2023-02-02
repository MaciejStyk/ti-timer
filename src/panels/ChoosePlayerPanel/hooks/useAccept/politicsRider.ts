import { useDispatch, useSelector } from "react-redux";
import store, { RootState } from "../../../../redux";
import { applyPoliticsRider } from "../../../../redux/agendaPhase";
import { resetChoosePlayerAction } from "../../../../redux/choosePlayerAction";
import { reorderPlayers, setSpeaker } from "../../../../redux/players";

const usePoliticsRider = () => {
  const { players, tableOrder, choosePlayerAction } = useSelector(
    (state: RootState) => state
  );
  const { chosenPlayer } = choosePlayerAction;
  const dispatch = useDispatch();

  const handlePoliticsRider = () => {
    dispatch(setSpeaker(chosenPlayer!.id));
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
    dispatch(applyPoliticsRider());
    dispatch(resetChoosePlayerAction());
  };

  return handlePoliticsRider;
};

export default usePoliticsRider;
