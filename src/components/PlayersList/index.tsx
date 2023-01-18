import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux";
import {
  IPlayer,
  removePlayer,
  setPlayers,
  setSpeaker,
} from "../../redux/players";
import { DraggableArea } from "react-draggable-tags";
import speaker from "../../assets/other/speaker.webp";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./index.module.css";
import { setArgentPlayer } from "../../redux/races";
import { addColor } from "../../redux/colors";

const PlayersList = () => {
  const { players, races } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const deletePlayer = (player: IPlayer) => {
    dispatch(removePlayer(player.id));
    dispatch(addColor(player.theme.backgroundColor));
    if (races.argent.playedBy?.id === player.id) {
      dispatch(setArgentPlayer(null));
    }
  };

  // ======== RENDER COMPONENT =================================================

  return (
    <div className={styles.draggableArea}>
      <DraggableArea
        isList
        tags={players}
        render={({ tag, index }) => (
          <div className={styles.listElement} style={tag.theme} key={tag.id}>
            {index + 1}. {tag.name}
            {index === 0 && (
              <img
                className={styles.speakerImg}
                src={speaker}
                alt="Speaker token"
                draggable={false}
              />
            )}
            <button
              onClick={() => deletePlayer(tag)}
              className={styles.removePlayerButton}
            >
              <PlusOutlined rotate={45} />
            </button>
          </div>
        )}
        onChange={(players) => {
          dispatch(setPlayers(players));
          dispatch(setSpeaker(players[0].id));
        }}
      />
    </div>
  );
};

export default PlayersList;
