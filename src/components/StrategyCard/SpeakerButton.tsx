import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChoosePlayerAction } from "../../redux/reducers/choosePlayerAction";
import { RootState } from "../../redux";
import triggers from "../../global/triggers";
import styles from "./index.module.css";

const SpeakerButton: FunctionComponent = () => {
  const { choosePlayerAction } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      setChoosePlayerAction({
        playable: true,
        isBeingPlayed: true,
        trigger: triggers.politics,
        chosenPlayer: null,
      })
    );
  };

  return (
    <>
      {choosePlayerAction.playable && !choosePlayerAction.isBeingPlayed && (
        <button className={styles.button} onClick={handleClick}>
          Change speaker
        </button>
      )}
    </>
  );
};

export default SpeakerButton;
