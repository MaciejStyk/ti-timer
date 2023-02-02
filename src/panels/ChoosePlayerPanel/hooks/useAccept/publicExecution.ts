import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux";
import { applyPublicExecution } from "../../../../redux/agendaPhase";
import { resetChoosePlayerAction } from "../../../../redux/choosePlayerAction";
import {
  passPlayer,
  reorderPlayers,
  setSpeaker,
  unpassPlayers,
} from "../../../../redux/players";

const usePublicExecution = () => {
  const { players, tableOrder, choosePlayerAction } = useSelector(
    (state: RootState) => state
  );
  const { chosenPlayer } = choosePlayerAction;
  const dispatch = useDispatch();

  const handlePublicExecution = () => {
    dispatch(unpassPlayers());
    dispatch(passPlayer(chosenPlayer!.id));
    if (chosenPlayer!.speaker) {
      const speakerIndex = tableOrder.findIndex(
        (player) => player.id === chosenPlayer!.id
      );
      const newSpeakerIndex =
        speakerIndex < players.length - 1 ? speakerIndex + 1 : 0;
      let newSpeaker = tableOrder[newSpeakerIndex];
      dispatch(setSpeaker(newSpeaker.id));
      dispatch(
        reorderPlayers({
          startingPlayer:
            tableOrder[
              newSpeakerIndex < players.length - 1 ? newSpeakerIndex + 1 : 0
            ],
          order: tableOrder,
        })
      );
    }
    dispatch(applyPublicExecution());
    dispatch(resetChoosePlayerAction());
  };

  return handlePublicExecution;
};

export default usePublicExecution;
