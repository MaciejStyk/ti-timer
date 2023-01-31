import { FunctionComponent } from "react";
import styles from "./index.module.css";

interface IProps {
  handleClick: () => void;
}

const SpeakerButton: FunctionComponent<IProps> = ({ handleClick }) => {
  return (
    <button className={styles.button} onClick={handleClick}>
      Change speaker
    </button>
  );
};

export default SpeakerButton;
