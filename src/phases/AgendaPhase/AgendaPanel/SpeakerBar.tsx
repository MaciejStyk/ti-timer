import { FunctionComponent } from "react";
import useSpeaker from "../hooks/useSpeaker";
import themes from "../../../global/themes";
import cn from "classnames";
import styles from "./index.module.css";

const SpeakerBar: FunctionComponent = () => {
  const { speaker } = useSpeaker();

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
