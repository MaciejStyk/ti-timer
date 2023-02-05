import { useDispatch, useSelector } from "react-redux";
import store, { RootState } from "../../../../redux";
import { applyPoliticsRider } from "../../../../redux/reducers/agendaPhase";
import { resetChoosePlayerAction } from "../../../../redux/reducers/choosePlayerAction";
import { reorderPlayers, setSpeaker } from "../../../../redux/reducers/players";

const usePoliticsRider = () => {
  const { settings, players, choosePlayerAction } = useSelector(
    (state: RootState) => state
  );
  const { chosenPlayer } = choosePlayerAction;
  const dispatch = useDispatch();

  const handlePoliticsRider = () => {
    dispatch(setSpeaker(chosenPlayer!.id));
    const speaker =
      store.getState().players.find((player) => player.speaker) || players[0];
    const speakerIndex = settings.tableOrder.findIndex(
      (player) => player.id === speaker.id
    );
    dispatch(
      reorderPlayers({
        startingPlayer:
          settings.tableOrder[
            speakerIndex < players.length - 1 ? speakerIndex + 1 : 0
          ],
        order: settings.tableOrder,
      })
    );
    dispatch(applyPoliticsRider());
    dispatch(resetChoosePlayerAction());
  };

  return handlePoliticsRider;
};

export default usePoliticsRider;
