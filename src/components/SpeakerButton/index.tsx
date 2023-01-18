import { useDispatch,  } from "react-redux";
import { setChoosePlayerAction } from "../../redux/choosePlayerAction";
import styles from "./index.module.css";

const SpeakerButton = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      setChoosePlayerAction({
        playable: true,
        isBeingPlayed: true,
      })
    );
  };

  return (
    <button className={styles.button} onClick={handleClick}>
      Change speaker
    </button>
  );
};

export default SpeakerButton;
