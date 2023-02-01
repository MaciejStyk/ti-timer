import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../redux";
import themes from "../../../global/themes";
import cn from "classnames";
import styles from "./index.module.css";

const SpeakerBar: FunctionComponent = () => {
  const { players } = useSelector((state: RootState) => state);

  const speaker =
    players.find((player) => player.speaker) ||
    store.getState().players.find((player) => player.speaker) ||
    players[0];

  const speakerBarClasses = cn({
    [styles.bar]: true,
    [styles.blackSpeakerBar]:
      speaker.theme.backgroundColor === themes[6].backgroundColor,
  });

  return (
    <div className={styles.list}>
      <h2 className={styles.title}>Speaker:</h2>
      <div style={speaker.theme} className={speakerBarClasses}>
        <div className={styles.barContent}>{speaker.name}</div>
      </div>
    </div>
  );
};

export default SpeakerBar;
