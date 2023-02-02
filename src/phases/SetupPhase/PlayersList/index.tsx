import { useSelector } from "react-redux";
import { DraggableArea } from "react-draggable-tags";
import { PlusOutlined } from "@ant-design/icons";
import { RootState } from "../../../redux";
import useDeletePlayer from "../hooks/useDeletePlayer";
import speaker from "../../../assets/other/speaker.webp";
import useChangePlayers from "../hooks/useChangePlayers";
import styles from "./index.module.css";

const PlayersList = () => {
  const { players } = useSelector((state: RootState) => state);
  const deletePlayer = useDeletePlayer();
  const changePlayers = useChangePlayers();

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
        onChange={changePlayers}
      />
    </div>
  );
};

export default PlayersList;
