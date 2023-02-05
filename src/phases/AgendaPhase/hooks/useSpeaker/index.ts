import { useSelector } from "react-redux";
import store, { RootState } from "../../../../redux";

const useSpeaker = () => {
  const { settings, players } = useSelector((state: RootState) => state);

  const speaker =
    store.getState().players.find((player) => player.speaker) || players[0];

  const speakerIndex = settings.tableOrder.findIndex(
    (player) => player.id === speaker.id
  );

  return { speaker, speakerIndex };
};

export default useSpeaker;
