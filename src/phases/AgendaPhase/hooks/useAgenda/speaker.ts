import { useSelector } from "react-redux";
import store, { RootState } from "../../../../redux";

const useSpeaker = () => {
  const { players, tableOrder } = useSelector((state: RootState) => state);
  const speaker = () => {
    const speaker =
      store.getState().players.find((player) => player.speaker) || players[0];
    const speakerIndex = tableOrder.findIndex(
      (player) => player.id === speaker.id
    );
    return {speaker, speakerIndex};
  };

  return speaker;
};

export default useSpeaker;
