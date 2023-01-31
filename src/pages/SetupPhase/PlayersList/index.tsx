import { useSelector, useDispatch } from "react-redux";
import { DraggableArea } from "react-draggable-tags";
import { PlusOutlined } from "@ant-design/icons";
import { RootState } from "../../../redux";
import { setPlayers, setSpeaker } from "../../../redux/players";
import speaker from "../../../assets/other/speaker.webp";
import styles from "./index.module.css";
import useDeletePlayer from "../hooks/useDeletePlayer";

const PlayersList = () => {
  const { players } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const deletePlayer = useDeletePlayer();

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
