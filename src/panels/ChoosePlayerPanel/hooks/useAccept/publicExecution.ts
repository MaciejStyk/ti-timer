import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux";
import { applyPublicExecution } from "../../../../redux/reducers/agendaPhase";
import { resetChoosePlayerAction } from "../../../../redux/reducers/choosePlayerAction";
import {
  passPlayer,
  reorderPlayers,
  setSpeaker,
  unpassPlayers,
} from "../../../../redux/reducers/players";

const usePublicExecution = () => {
  const { settings, players, choosePlayerAction } = useSelector(
    (state: RootState) => state
  );
  const { chosenPlayer } = choosePlayerAction;
  const dispatch = useDispatch();

  const handlePublicExecution = () => {
    dispatch(unpassPlayers());
    dispatch(passPlayer(chosenPlayer!.id));
    if (chosenPlayer!.speaker) {
      const speakerIndex = settings.tableOrder.findIndex(
        (player) => player.id === chosenPlayer!.id
      );
      const newSpeakerIndex =
        speakerIndex < players.length - 1 ? speakerIndex + 1 : 0;
      let newSpeaker = settings.tableOrder[newSpeakerIndex];
      dispatch(setSpeaker(newSpeaker.id));
      dispatch(
        reorderPlayers({
          startingPlayer:
            settings.tableOrder[
              newSpeakerIndex < players.length - 1 ? newSpeakerIndex + 1 : 0
            ],
          order: settings.tableOrder,
        })
      );
    }
    dispatch(applyPublicExecution());
    dispatch(resetChoosePlayerAction());
  };

  return handlePublicExecution;
};

export default usePublicExecution;
